package main

import (
	"fmt"
	"context"
	"log"
	"errors"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"net/http"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Login struct {
	Name string `form:"name" json:"name" binding:"required"`
	Pswd string `form:"pswd" json:"pswd" binding:"required"`
}

type UserInfo struct {
	Name string `form:"name" json:"name" binding:"required"`
	Pswd string `form:"pswd" json:"pswd" binding:"required"`
	Data string `form:"data" json:"data" binding:"required"`
}

func main() {
	// Set up DB
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	client, err := mongo.Connect(context.TODO(), clientOptions)
//	defer client.Close()
	
	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	// Set up router
	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true

	router.Use(cors.New(config))
	
	router.POST("/signin", func(c *gin.Context) {
		handleSignIn(c, client)
	})
	router.POST("/signup", func(c *gin.Context) {
		handleSignUp(c, client)
	})
	router.POST("/syncup", func(c *gin.Context) {
		handleSyncUp(c, client)
	})
	router.POST("/syncdown", func(c *gin.Context) {
		handleSyncDown(c, client)
	})

	go router.RunTLS(":60001", "./certs/server.crt", "./certs/server.key")
	router.Run(":60000")
}

/* ******* Handlers ******** */
func handleSignIn(c *gin.Context, client *mongo.Client) {
	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := signIn(json.Name, json.Pswd, client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No such user"})
	} else {
		fmt.Printf("User <%s> signs in, password = \"%s\".\n", json.Name, json.Pswd)
		c.String(http.StatusOK, "%s signed in successfully", json.Name)
	}
}

func handleSignUp(c *gin.Context, client *mongo.Client) {
	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := signUp(json.Name, json.Pswd, client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		fmt.Printf("User <%s> signs up, password = \"%s\".\n", json.Name, json.Pswd)
		c.String(http.StatusOK, "%s signed up successfully", json.Name)
	}
}

func handleSyncUp(c *gin.Context, client *mongo.Client) {
	var json UserInfo
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := saveData(json.Name, json.Pswd, &json.Data, client);
	err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		fmt.Printf("User <%s> uploads data \"%s\".\n", json.Name, json.Data)
		c.String(http.StatusOK, "%s uploaded successfully", json.Name)
	}
}

func handleSyncDown(c *gin.Context, client *mongo.Client) {
	var json Login
	if err := c.ShouldBindJSON(&json); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if data, err := getData(json.Name, json.Pswd, client); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	} else {
		fmt.Printf("User <%s> downloads data \"%s\".\n", json.Name, data)
		c.String(http.StatusOK, data)
	}
}

/* ***** Read DB ******* */
func signUp(name string, pswd string, client *mongo.Client) error {
	// insert an user into db
	collection := client.Database("test").Collection("users")
	var usr UserInfo
	err := collection.FindOne(
		context.Background(),
		bson.M{"name": name},
	).Decode(&usr)
	if err == nil {
		return errors.New("User already exists !")
	}
	_, err = collection.InsertOne(
		context.TODO(),
		bson.M{"name": name, "pswd": pswd},
	)
	return err
}

func signIn(name string, pswd string, client *mongo.Client) error {
	// filter with name and pswd
	// return id if no error
	collection := client.Database("test").Collection("users")
	res := UserInfo{}
	filter := bson.M{
		"name": name,
		"pswd": pswd,
	}
	err := collection.FindOne(context.Background(), filter).Decode(&res)
	return err
}

func saveData(name string, pswd string, data *string, client *mongo.Client) error {
	collection := client.Database("test").Collection("users")
	filter := bson.M{
		"name": name,
		"pswd": pswd,
	}
	update := bson.M{"$set": bson.M{"data": *data}}
	res, err := collection.UpdateOne(context.TODO(), filter, update)
	fmt.Printf("Matched %v documents and updated %v documents.\n", res.MatchedCount, res.ModifiedCount)
	return err
}

func getData(name string, pswd string, client *mongo.Client) (string, error) {
	collection := client.Database("test").Collection("users")
	filter := bson.M{
		"name": name,
		"pswd": pswd,
	}
	res := UserInfo{}
	err := collection.FindOne(context.Background(), filter).Decode(&res)
	if err != nil {
		return "", err
	} else {
		return res.Data, nil
	}
}


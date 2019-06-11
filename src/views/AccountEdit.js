import React from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, PermissionsAndroid } from 'react-native';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';
import { HeaderBackButton } from 'react-navigation';
import { TextInput, Button } from 'react-native-paper';
import styles from './style';
import { ScrollView } from 'react-native-gesture-handler';

import { init, Geolocation } from 'react-native-amap-geolocation';

// 对于 Android 需要自行根据需要申请权限
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);

// 使用自己申请的高德 App Key 进行初始化
/*
init({
  android: "d1472587fae499ae25c6ab8c8ba34ec8"
});
*/


const MyDatePicker = ({date, onChangeDate}) => (
  <DatePicker
    mode="date"
    placehold="select date"
    format="YYYY-MM-DD"
    date={date ? date : new Date()}
    minDate="1900-01-01"
    maxDate="2099-12-31"
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(date) => onChangeDate(date)}
  />
);

const MyTimePicker = ({time, onChangeTime}) => (
  <DatePicker
    mode="time"
    placehold="select time"
    format="LT"
    is24Hour={true}
    date={time ? time : new Date()}
    confirmBtnText="Confirm"
    cancelBtnTest="Cancel"
    onDateChange={(time) => onChangeTime(time)}
  />
);

const Images = ({imgPaths, onDeleteImage}) => {
  console.log(imgPaths);
  const images = imgPaths.map((imgPath, index) => (
    imgPath ?
      (
        <View key={index + ''}>
          <Text>hahah</Text>
          <Image source={{ uri: imgPath }} style={{ width: 100, height: 100 }} />
        </View>
      ) : (
        <View key={index + ''} />
      )
  ));
  return (
    <View>
      {images}
    </View>
  );
}

class AccountEdit extends React.Component {
  static navigationOptions({navigation}) {
    return {
      title: 'Edit Account',
      headerLeft: (
        <HeaderBackButton onPress={navigation.getParam('onClickBack')} />
      ),
    };
  }

  componentDidMount() {
    const { navigation, onClickBack } = this.props;
    navigation.setParams({
      onClickBack: () => onClickBack(navigation.goBack)
    });
  }

  onAddImage() {
    const options = {
      title: 'Select Image',
      customButtons: [{ name: 'photo', title: 'Choose Image' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };

    const { onAddImage } = this.props;
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        onAddImage(source.uri);
      }
    });
  }

  onGetPosition() {
    const { onChangePosition } = this.props;
    Geolocation.getCurrentPosition(
      (position) => onChangePosition(position),
      (error) => console.log(error),
    );
    // pw: dy-niabby
  }

  getLocationStr() {
    const {accountData} = this.props;
    const {position} = accountData;
    if (position) {
      const { locationDetail } = position.location;
      return locationDetail;
    }
    return '';
  }

  render() {
    const { accountData, onChangeDate, onChangeTime, onChangeAmount,
       onChangeItem, onChangeDesc } = this.props;

    return (
      <ScrollView>
        <Text style={styles.text}>
          Account Edit
        </Text>

        <View>
          <Text>Date</Text>
          <MyDatePicker date={accountData.date} onChangeDate={onChangeDate} />
        </View>

        <View>
          <Text>Time</Text>
          <MyTimePicker time={accountData.time} onChangeTime={onChangeTime} />
        </View>

        <View>
          <Text>Amount</Text>
          <TextInput keyboardType="number-pad"
            title="amount" defaultValue={accountData.amount} onChangeText={onChangeAmount} />
        </View>

        <View>
          <Text>Item</Text>
          <TextInput title="item" defaultValue={accountData.item} onChangeText={onChangeItem} />
        </View>

        <View>
          <Text>Desc</Text>
          <TextInput title="desc" defaultValue={accountData.desc} onChangeText={onChangeDesc} />
        </View>

        <View>
          <Text>Images</Text>
          <Button icon='photo-library' onPress={() => this.onAddImage()}>
            Add Image
          </Button>
          <Images imgPaths={accountData.imgPaths}/>
        </View>

        <View>
          <Text>Location</Text>
          <Button icon='add-location' onPress={() => this.onGetPosition()}></Button>
          <Text>{this.getLocationStr()}</Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ accountInfo }) => ({
  index: accountInfo.index,
  accountData: accountInfo.accountData,
});

const mapDispatchToProps = (dispatch) => ({
  onClickBack: (callBack) => {
    dispatch({type: 'account_save'});
    dispatch({type: 'account_back', callBack});
    console.log('BACK');
  },
  onChangeDate: (date) => dispatch({type: 'account_edit_date', date}),
  onChangeTime: (time) => dispatch({type: 'account_edit_time', time}),
  onChangeAmount: (amount) => dispatch({type: 'account_edit_amount', amount}),
  onChangeItem: (item) => dispatch({type: 'account_edit_item', item}),
  onChangeDesc: (desc) => dispatch({type: 'account_edit_desc', desc}),
  onAddImage: (imgPath) => dispatch({type: 'account_add_img', imgPath}),
  onDelImage: (index, imgPath) => dispatch({type: 'account_del_img', imgPath, index}),
  onChangePosition: (position) => dispatch({type: 'account_edit_pos', position}),
});

const AccountEditView = connect(mapStateToProps, mapDispatchToProps)(AccountEdit);

export default AccountEditView;
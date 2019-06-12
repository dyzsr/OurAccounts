import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import { FlatList } from 'react-native';
import {
	Container, Header, Content, Button, Text, Title,
	ListItem, SwipeRow, Icon, Item, Left, Body, Right,
} from 'native-base';
import styles from './style';

var moment = require('moment');

const MonthsItem = ({ account }) => {
	return (
		<View>
			<SwipeRow
                disableRightSwipe={ true }
                disableLeftSwipe={ true }
                leftOpenValue = { 75 }
                rightOpenValue = { -75 }
                body = {
                    <Button full light
                        style = {{ width: '100%' }}
                    >
                        <Text>
                            {account.isIncome ? '收入' : '支出'}
                        </Text>

                        <Text>
                            消费类别: {account.item ? account.item : '未设置'}
                        </Text>

                        <Text>
                            消费时间: {moment(account.date).format('YYYY-MM-DD')}
                        </Text>
                    </Button>
                }
            />
		</View>
	);
}

const MonthsList = ({ accounts }) => {
	return (
		<FlatList
			data = { accounts }
			renderItem = {({ item }) => (
				<MonthsItem
					account = { item }
				/>
            )}
		/>
	);
}

class MonthsDetail extends React.Component {
    static navigationOptions({navigation}) {
        return {
            title: 'Month Detail',
			header: (
				<Header>
                    <Left>
                        <Button transparent
                            onPress = { navigation.getParam('onClickBack') }
                        >
                        <Icon name = "arrow-back"/>
                        </Button>
                    </Left>
					<Body>
						<Title> 收支详情 </Title>
					</Body>
					<Right />
				</Header>
			)
        };
    }

    componentDidMount() {
        const { navigation, onClickBack } = this.props;
        navigation.setParams({
            onClickBack: () => onClickBack(navigation.goBack)
        });
    }

    render() {
        const { accounts, year, month, day } = this.props;
        // console.warn("year is " + year);
        // console.warn("month is " + month);
        // console.warn("day is " + day);
        // console.warn(Filter(accounts, length, year, month, day))
        // console.warn(accounts);
        var res = [];
        for (var i = 0; i < accounts.length; ++ i) {
            if ((month < 10 && year + "-0" + month + "-" + day == accounts[i].date) ||
            (month >= 10 && year + "-" + month + "-" + day == accounts[i].date )) {
                res.push(accounts[i]);
            }

            // console.warn(year + "-0" + month + "-" + day);
            // console.warn(accounts[i].date);
        }
        res.sort(function(a, b){return a.time - b.time});
        // console.warn(res);
        return (
            <View>
                <MonthsList
                    accounts = { res }
                />
            </View>
        );
    }
}

const mapStateToProps = ({ accountInfo, monthInfo }) => ({
    accountData: accountInfo.accountData,
    accounts: accountInfo.accounts,
    year: monthInfo.year,
    month: monthInfo.month,
    day: monthInfo.day,
});

const mapDispatchToProps = (dispatch) => ({
    onClickBack: (callBack) => {
        dispatch({type: 'month_back', callBack});
        console.log('BACK');
    },
});

const MonthsDetailView = connect(mapStateToProps, mapDispatchToProps)(MonthsDetail);

export default MonthsDetailView;
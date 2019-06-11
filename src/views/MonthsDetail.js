import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import styles from './style';
import { FlatList } from 'react-native-gesture-handler';

const MonthsItem = ({ account }) => {
	return (
		<View>
			<Text style = { styles.text }>
                Account key = { account.key } time = { account.time }
            </Text>

            <Text style = { styles.text }>
                { account.amount }
            </Text>
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
            title: '消费明细',
            headerLeft: (
                <HeaderBackButton
                    onPress = { navigation.getParam('onClickBack') }
                />
            ),
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
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
        const { accounts, length, year, month, day } = this.props;
        // console.warn("year is " + year);
        // console.warn("month is " + month);
        // console.warn("day is " + day);
        console.warn(Filter(accounts, length, year, month, day))
        return (
            /*
            <View>
                <MonthsList
                    accounts = { Filter(accounts, year, month, day) }
                />
            </View>
            */

            <View></View>
        );
    }
}

function Filter({accounts, year, month, day}) {
    var res = [];
    for (var i = 0; accounts[i]; ++ i) {
        if (year == accounts[i].year &&
            month == accounts[i].month &&
            day == accounts[i].day) {
            res.push(accounts[i]);
        }
    }
    res.sort(function(a, b){return a.time - b.time});
    return res;
}

const mapStateToProps = ({ accountInfo }) => ({
    accountData: accountInfo.accountData,
    accounts: accountInfo.accounts,
    year: accountInfo.year,
    month: accountInfo.month,
    day: accountInfo.day,
});

const mapDispatchToProps = (dispatch) => ({
    onClickBack: (callBack) => {
        dispatch({type: 'month_back', callBack});
        console.log('BACK');
    },
});

const MonthsDetailView = connect(mapStateToProps, mapDispatchToProps)(MonthsDetail);

export default MonthsDetailView;
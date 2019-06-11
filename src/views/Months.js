import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';

import MinimalismCalendar from 'react-native-ocalendar';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class Months extends Component {
    render() {
        return (
            <Calendar
                onDayPress = {(day) => {
                    console.log('selected day', day)
                }}
                monthFormat = { 'yyyy年M月' }
                onMonthChange = {(month) => {
                    console.log('month changed', month)
                }}
            />
        );
    }
}

const mapStateToProps = ({accountInfo}) => ({accounts: accountInfo.accounts});

const mapDispatchToProps = (dispatch) => ({
    onClickAdd: () => dispatch({type: 'account_add'}),
});

const AccountsView_ = connect(mapStateToProps, mapDispatchToProps)(Accounts);
const AccountsView = createStackNavigator({
    accountList: {screen: AccountsView_},
    accountEdit: {screen: AccountEditView},
}, {
    initialRouteKey: 'accountList',
});

export default MonthsView;
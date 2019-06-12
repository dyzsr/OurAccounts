import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-paper';
import {
	Container, Header, Content, Button, Text, Title,
	ListItem, SwipeRow, Item, Left, Body, Right,
} from 'native-base';
import MonthsDetailView from './MonthsDetail';

class Months extends Component {
    // 标题头
    static navigationOptions({navigation}) {
		return {
			title: 'Months',
			header: (
				<Header>
					<Left />
					<Body>
						<Title>月份</Title>
					</Body>
					<Right />
				</Header>
			)
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		navigation.setParams({
			onClick: () => onClick(),
		});
	}

    render() {
        const { accounts, navigation, year, month, day, income, expense,
            onClick, onChange, onIncome, onExpense } = this.props;

        onIncome(accounts);
        onExpense(accounts);

        // console.warn(year + ' ' + month + ' ' + day);

        return (
            <View style = {{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Calendar
                    onDayPress={(day) =>
                        // 点击日期切换至消费详细
                        onClick(day, () => {
                            // console.warn(day);
                            navigation.navigate('monthsDetail');
                        })
                    }
                    monthFormat = { 'yyyy年M月' }
                    onMonthChange = {(month) => {
                        onChange(month);
                        onIncome(accounts);
                        onExpense(accounts);
                    }}
                />
                <View style = {{
                    height: 100,
                }} />
                <View style = {{
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontSize: 30,
                            color: "green",
                            bottom: "25%",
                            position: "absolute",
                            left: "25%",
                        }}>
                            月收入{'\n'}
                            { income }
                        </Text>
                    </View>
                    <View style = {{
                        flex: 0.005,
                        backgroundColor: "grey",
                        height: "90%",
                        alignItems: 'center',
                    }} />
                    <View style = {{
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontSize: 30,
                            color: "red",
                            bottom: "25%",
                            position: "absolute",
                            left: "25%",
                        }}>
                            月支出{'\n'}
                            { expense }
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ accountInfo, monthInfo }) => ({
    accounts: accountInfo.accounts,
    year: monthInfo.year,
    month: monthInfo.month,
    day: monthInfo.day,
    income: monthInfo.income,
    expense: monthInfo.expense,
});

const mapDispatchToProps = (dispatch) => ({
    onClick: (day, callBack) => {
		dispatch({ type: 'year_select', year: day.year });
		dispatch({ type: 'month_select', month: day.month });
		dispatch({ type: 'day_select', day: day.day });
		dispatch({ type: 'month_watch', callBack: callBack })
		console.log('WATCH');
    },
    onChange: (month) => {
        dispatch({ type: 'month_change', month: month.month });
    },
    onIncome: (accounts) => {
        dispatch({ type: 'month_income', accounts: accounts });
    },
    onExpense: (accounts) => {
        dispatch({ type: 'month_expense', accounts: accounts });
    },
});

const MonthsView_ = connect(mapStateToProps, mapDispatchToProps)(Months);

// 双页面切换
let MonthsView = createStackNavigator({
	monthsCalendar: {
		screen: MonthsView_,
	},
	monthsDetail: {
		screen: MonthsDetailView,
	},
}, {
		initialRouteKey: 'monthsCalendar',
	}
);

export default MonthsView;
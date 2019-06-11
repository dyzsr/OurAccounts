import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import { Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { withTheme } from 'react-native-paper';
import MonthsDetailView from './MonthsDetail';

class Months extends Component {
    // 标题头
    static navigationOptions() {
		return {
            title: '消费情况',
            headerLeft: (
                <Icon.Button
                    name = "react"
                    backgroundColor = "black"
                />
            ),
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		navigation.setParams({
			onClick: () => onClick(),
		});
	}

    render() {
        const { navigation, year, month, day,
            onClick } = this.props;
        // console.warn("year is " + year);
        // console.warn("month is " + month);
        // console.warn("day is " + day);
        return (
            <View>
                <Calendar
                    onDayPress={(day) =>
                        // 点击日期切换至消费详细
                        onClick(day, () => {
                            // console.warn("nmsl year " + day.year);
                            // console.warn("nmsl month " + day.month);
                            // console.warn("nmsl day " + day.day);
                            // console.warn(day);
                            navigation.navigate('monthsDetail');
                        })
                    }
                    monthFormat = { 'yyyy年M月' }
                    onMonthChange = {() => {}}
                />
            </View>
        );
    }
}

const mapStateToProps = ({ monthInfo }) => ({
    year: monthInfo.year,
    month: monthInfo.month,
    day: monthInfo.day,
});

const mapDispatchToProps = (dispatch) => ({
    onClick: (day, callBack) => {
		dispatch({ type: 'year_select', year: day.year });
		dispatch({ type: 'month_select', month: day.month });
		dispatch({ type: 'day_select', day: day.day });
		dispatch({ type: 'month_watch', callBack: callBack })
		console.log('WATCH');
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

MonthsView = withTheme(MonthsView);
export default MonthsView;
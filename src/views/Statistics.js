import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
	Container, Header, Content, Left, Body, Right,
	Text, View, Title, H1, H2, H3,
} from 'native-base';
// import Echarts from 'native-echarts';

import { CalendarList } from 'react-native-calendars';
import DatePicker from 'react-native-datepicker';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';

var moment = require('moment');

const color = [
	'#e6194B',
	'#f58231',
	'#ffe119',
	'#bfef45',
	'#3cb44b',
	'#42d4f4',
	'#4363d8',
	'#911eb4',
	'#f032e6',
	'#a9a9a9',
];

// const categories = [
// 	{ name: '购物', income: 100, expense: 88, },
// 	{ name: '餐饮', income: 76, expense: 99, },
// 	{ name: '服装', income: 234, expense: 111, },
// 	{ name: '生活', income: 988, expense: 222, },
// 	{ name: '教育', income: 45, expense: 333, },
// 	{ name: '娱乐', income: 10, expense: 444, },
// 	{ name: '出行', income: 299, expense: 555, },
// 	{ name: '医疗', income: 413, expense: 666, },
// 	{ name: '投资', income: 22, expense: 777, },
// 	{ name: '其他', income: 108, expense: 1080, },
// ];

class Statistics extends React.Component {
	constructor(props) {
		console.log('STATIS');
		super(props);
		const { month, accounts, onSelectMonth } = props;
		onSelectMonth(month, accounts);
		console.log('OK');
	}

	onSelectMonth(month) {
		console.log('visible month change:', month);
		const { accounts, onSelectMonth } = this.props;
		onSelectMonth(month, accounts);
	}

	render() {
		const { month, categories, yearData } = this.props;
		const ctg_income = categories.map(({name, income}, index) => ({
			name, population: income, color: color[index],
		}));
		const ctg_expense = categories.map(({name, expense}, index) => ({
			name, population: expense, color: color[index],
		}));

		return (
			<Container>
				<Header>
					<Left />
					<Body>
						<Title>统计图表</Title>
					</Body>
					<Right />
				</Header>

				<Content contentContainerStyle={{alignItems: 'stretch'}}>
					<ScrollView>
						<CalendarList
							horizontal={true}
							onVisibleMonthsChange={(month) => this.onSelectMonth(month[0].dateString)}
							monthFormat='yyyy年M月'
							pagingEnabled={true}
						/>

						<H3>月收入统计</H3>
						<PieChart
							data={ctg_income}
							width={450}
							height={300}
							accessor='population'
							backgroundColor='transparent'
							paddingLeft={30}
							chartConfig={{
								color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
							}}
						/>

						<H3>月支出统计</H3>
						<PieChart
							data={ctg_expense}
							width={450}
							height={300}
							accessor='population'
							backgroundColor='transparent'
							paddingLeft={30}
							chartConfig={{
								color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
							}}
						/>
					</ScrollView>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ accountInfo, statisticsInfo }) => ({
	accounts: accountInfo.accounts,
	month: statisticsInfo.month,
	categories: statisticsInfo.categories,
});

const mapDispatchToProps = (dispatch) => ({
	onSelectMonth: (month, accounts) => {
        dispatch({ type: 'statis_count', month: month });
        dispatch({ type: 'statis_month', accounts: accounts });
    }
});

export default StatisticsView = connect(mapStateToProps, mapDispatchToProps)(Statistics);
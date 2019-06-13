import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import {
	Container, Header, Content, Left, Body, Right,
	Text, View, Title,
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

class Statistics extends React.Component {
	constructor(props) {
		console.log('STATIS');
		super(props);
		const { month, accounts, onSelectMonth } = props;
		onSelectMonth(month, accounts);
		console.log('OK');
	}

	onSelectMonth(month) {
		const { accounts, onSelectMonth } = this.props;
		onSelectMonth(month, accounts);
	}

	render() {
		const { month, categories, yearData } = this.props;

		return (
			<Container>
				<Header>
					<Left />
					<Body>
						<Title>统计图表</Title>
					</Body>
					<Right />
				</Header>

				<Content>
					<ScrollView>
						<CalendarList
							horizontal={true}
							onVisibleMonthChange={(month) => onSelectMonth(month.dateString)}
							monthFormat='yyyy年M月'
							pagingEnabled={true}
						/>

						<PieChart
							data={categories}
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
	yearData: statisticsInfo.yearData,
});

const mapDispatchToProps = (dispatch) => ({
	onSelectMonth: (month, accounts) =>
		dispatch({ type: 'statis_count', month, accounts }),
});

export default StatisticsView = connect(mapStateToProps, mapDispatchToProps)(Statistics);
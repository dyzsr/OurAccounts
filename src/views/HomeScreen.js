import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button, Icon,
  Text, H1, H2, H3,
} from 'native-base';

import AccountsView from './Accounts';
import MonthsView from './Months';
import StatisticsView from './Statistics';
import SyncView from './Sync';

const HomeNavigator = createBottomTabNavigator({
  accounts: { screen:  AccountsView },
  months: { screen: MonthsView },
  statistics: { screen: StatisticsView },
  sync: { screen: SyncView },
}, {
    initialRouteName: 'accounts',
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigation.state.index == 0}
              onPress={() => props.navigation.navigate("accounts")}
            >
              <Icon type='FontAwesome5' name='dollar-sign' />
              <Text>账单</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 1}
              onPress={() => props.navigation.navigate("months")}
            >
              <Icon type='FontAwesome5' name='book' />
              <Text>月份</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 2}
              onPress={() => props.navigation.navigate("statistics")}
            >
              <Icon type='FontAwesome5' name='chart-pie' />
              <Text>图表</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 3}
              onPress={() => props.navigation.navigate("sync")}
            >
              <Icon type='FontAwesome5' name='user-circle' />
              <Text>账户</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
);

export default AppContainer = createAppContainer(HomeNavigator);
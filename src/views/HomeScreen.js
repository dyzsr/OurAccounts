import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import {
  Footer,
  FooterTab,
  Button,
  Text,
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
              <Text large>账单</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 1}
              onPress={() => props.navigation.navigate("months")}
            >
              <Text large>月份</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 2}
              onPress={() => props.navigation.navigate("statistics")}
            >
              <Text large>图表</Text>
            </Button>
            <Button
              vertical
              active={props.navigation.state.index == 3}
              onPress={() => props.navigation.navigate("sync")}
            >
              <Text large>账户</Text>
            </Button>
          </FooterTab>
        </Footer>
      )
    }
  }
);

export default AppContainer = createAppContainer(HomeNavigator);
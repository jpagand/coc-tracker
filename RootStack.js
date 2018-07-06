import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TownHallList from './TownHallList';
import TownHall from './TownHall';
import Defenses from './Defenses';

const RootStack = createStackNavigator(
  {
  TownHallList: TownHallList,
  TownHall: TownHall,
  Defenses: Defenses,
  },
  {
    initialRouteName: 'TownHallList',
    navigationOptions :{
      headerStyle: {
        backgroundColor: '#4A44C0',
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontFamily: 'Supercell-magic'
      },
      headerTintColor: '#fff'
    }
  }
);

export default class Root extends React.Component {
  render() {
    return <RootStack />;
  }
}

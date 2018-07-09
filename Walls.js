import React, { Component } from "react";
import { FlatList} from 'react-native';
import { connect } from 'react-redux';
import { upgradeWall, downgradeWall } from './clashEntities/actions';
import _ from 'lodash';
import {
  Container,
} from "native-base";
import BUILDING_TYPES from './clashEntities/buildingTypes';
import AVAILABLE_BUILDINGS from './clashEntities/availableBuildings';
import StyledComponents from './components/StyledComponents'
import { getTh, getWalls } from './clashEntities/stateHelpers';

const {StyledContent, StyledListItem, GreenButton, RedButton, TextStyled} = StyledComponents
import Wall from './components/Wall';

class Walls extends Component {
  static navigationOptions = {
   title: 'Walls',
  };
  componentWillMount() {
    console.time('Walls shown')
  }
  componentDidMount() {
    console.timeEnd('Walls shown')
  }
  render() {
    const { walls, navigation, townHall, upgradeWall, downgradeWall , totalWall, maxWalls} = this.props;
    return (
      <Container>
        <StyledContent>
          <FlatList
            keyExtractor={item => item.id}
            data={walls}
            renderItem={({item}) =>  <Wall wall={item} townHall={townHall} onMinusClick={downgradeWall} onPlusClick={upgradeWall} totalWall={totalWall} maxWalls={maxWalls} /> }
          />
        </StyledContent>
      </Container>
    );
  }
}

const mapStateToProps = ({buildings}, {navigation}) => {
  const thId = navigation.getParam('thId');
  const townHall = getTh(buildings, thId);
  const walls = getWalls(buildings, thId);
  const totalWall = walls.reduce((acc, w) => {
    return acc + w.quantity
  }, 0)
  const maxWalls = AVAILABLE_BUILDINGS[BUILDING_TYPES.WALL][townHall.level-1] || 0
  return {
    townHall,
    walls,
    totalWall,
    maxWalls
  }
};

const mapDispatchToProps = dispatch => ({
    upgradeWall: (id, quantity) => dispatch(upgradeWall(id, quantity)),
    downgradeWall: (id, quantity) => dispatch(downgradeWall(id, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Walls)

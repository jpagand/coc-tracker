import React, { Component } from "react";
import { FlatList} from 'react-native';
import { connect } from 'react-redux';
import { upgradeWall, downgradeWall } from './clashEntities/actions';
import _ from 'lodash';
import {
  Container,
} from "native-base";
import Building from './clashEntities/building';

import BUILDING_TYPES from './clashEntities/buildingTypes';
import AVAILABLE_BUILDINGS from './clashEntities/availableBuildings';
import StyledComponents from './components/StyledComponents'
import { getTh, getWalls } from './clashEntities/stateHelpers';

const {StyledContent, StyledListItem, GreenButton, RedButton, TextStyled} = StyledComponents
import Wall from './components/Wall';
import ResourceRecap from './components/ResourceRecap';

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
    const { walls, navigation, townHall, upgradeWall, downgradeWall , totalWall, maxWalls, costToMax} = this.props;
    return (
      <Container>
        <StyledContent>
          <StyledListItem padding>
            <TextStyled>{totalWall}/{maxWalls} walls</TextStyled>
            <TextStyled>To max:</TextStyled>
              <ResourceRecap costs={costToMax}/>

          </StyledListItem>

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
  let lastWall, secondLastWall;
  const walls = getWalls(buildings, thId).map((wall, i, arr) => {

    const w = Building(wall, townHall)
    const costs = {[w.current.resource]: w.current.cost}
    if (w.current.resource2) {
      costs[w.current.resource2] = w.current.cost
    }
    w.costs = costs;
    if (i === arr.length - 1) {
      lastWall = w;
    } else if (i === arr.length - 2) {
      secondLastWall = w;
    }
    return w
  });

  const [totalWall, expense1, expense2] = walls.reduce((acc, w) => {
    return [acc[0] + w.quantity, acc[1] + (w.quantity * w.current.cumulativeCost), acc[2] + (w.quantity * (w.current.cumulativeCost2 || 0))]
  }, [0,0,0])
  const maxWalls = AVAILABLE_BUILDINGS[BUILDING_TYPES.WALL][townHall.level-1] || 0

  let costToMax = {};
  if (lastWall.current.limit) {
    costToMax[lastWall.current.resource2] = lastWall.current.limit * lastWall.current.cumulativeCost2
    costToMax[lastWall.current.resource] = lastWall.current.limit * lastWall.current.cumulativeCost
    costToMax[secondLastWall.current.resource2] += (maxWalls - lastWall.limit) * secondLastWall.current.cumulativeCost2
    costToMax[secondLastWall.current.resource] += (maxWalls - lastWall.limit) * secondLastWall.current.cumulativeCost

  } else {
    if (lastWall.current.resource2) {
      costToMax[lastWall.current.resource2] = maxWalls * lastWall.current.cumulativeCost2
    }
    costToMax[lastWall.current.resource] = maxWalls * lastWall.current.cumulativeCost
  }
  costToMax[lastWall.current.resource] -= expense1;
  costToMax[lastWall.current.resource2] -= expense2;
  return {
    townHall,
    walls,
    totalWall,
    maxWalls,
    costToMax
  }
};

const mapDispatchToProps = dispatch => ({
    upgradeWall: (id, quantity) => dispatch(upgradeWall(id, quantity)),
    downgradeWall: (id, quantity) => dispatch(downgradeWall(id, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Walls)

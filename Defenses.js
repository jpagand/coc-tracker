import React, { Component, Fragment } from "react";
import {View, FlatList} from 'react-native';
import { connect } from 'react-redux';
import BUILDING_TYPES from './clashEntities/buildingTypes';
import {GOLD, ELIXIR, BLACK} from './clashEntities/resources';
import { upgradeBuilding, downgradeBuilding, maxBuilding } from './clashEntities/actions';
import { getTh, getThBuilderHut, getCategoryThBuildings, getDurationToMax, getCostToMax } from './clashEntities/stateHelpers';
import {convertSeconds} from './clashEntities/times';
import _ from 'lodash';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Right,
  Body,
  Left,
  Text,
  List,
  ListItem,
} from "native-base";
import StyledComponents from './components/StyledComponents'
const {StyledContent, StyledListItem, GreenButton, RedButton, TextStyled} = StyledComponents
import ResourceRecap from './components/ResourceRecap';
import Duration from './components/Duration';
import BuildingComponent from './components/Building';

class TownHall extends Component {
  static navigationOptions = {
   title: 'Town Hall',
  };
  componentWillMount() {
    console.time('Defenses shown')
  }
  componentDidMount() {
    console.timeEnd('Defenses shown')
  }
  render() {
    const { defenses, navigation, townHall, upgradeBuilding, downgradeBuilding, durationToMax, costToMax, maxBuilding } = this.props;
    const isMaxed = durationToMax === 0;
    return (
      <Container>
        <StyledContent>
            {!isMaxed &&
            <StyledListItem>
                {durationToMax > 0 &&
              <Fragment>
                <TextStyled>To max:</TextStyled>
                <ResourceRecap costs={costToMax} duration={durationToMax}/>
              </Fragment>
            }


            </StyledListItem>
            }
            {isMaxed &&
            <StyledListItem orange>
              <View style={{flex:1, justifyContent:'center'}}>
                <TextStyled>Maxed!</TextStyled>
              </View>
            </StyledListItem>}
            <FlatList

              keyExtractor={item => item.id}
              data={defenses}
              renderItem={({item}) =>  <BuildingComponent building={item} townHall={townHall} onMinusClick={downgradeBuilding} onPlusClick={upgradeBuilding} onMaxClick={maxBuilding}/> }
              />
        </StyledContent>
      </Container>
    );
  }
}

const mapStateToProps = ({buildings}, {navigation}) => {
  const catType = navigation.getParam('catType')
  const thId = navigation.getParam('thId');
  const townHall = getTh(buildings, thId);
  const builderNumber = getThBuilderHut(buildings, thId).level
  const defenses = _.sortBy(getCategoryThBuildings(buildings, thId, catType), ['buildingType']);
  const durationToMax = getDurationToMax(defenses, townHall, builderNumber);
  const costToMax = getCostToMax(defenses, townHall);
  return {
    townHall,
    defenses,
    durationToMax,
    costToMax,
  }
};

const mapDispatchToProps = dispatch => ({
    upgradeBuilding: (id) => dispatch(upgradeBuilding(id)),
    downgradeBuilding: (id) => dispatch(downgradeBuilding(id)),
    maxBuilding: (id) => dispatch(maxBuilding(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TownHall)

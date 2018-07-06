import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import Building from './clashEntities/building';
import Townhall from './clashEntities/townHall';
import BUILDING_TYPES from './clashEntities/buildingTypes';
import { getTh, getThBuilderHut, getCategoryThBuildings, getDurationToMax, getCostToMax, summCosts } from './clashEntities/stateHelpers';
import {
  upgradeTownHall,
  downgradeTownHall,
  removeTownHall,
  upgradeBuilding,
  downgradeBuilding,
  maxTownHall
 } from './clashEntities/actions';

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
  Thumbnail,
  Grid,
  Col
} from "native-base";
import StyledComponents from './components/StyledComponents'
const {StyledContent, StyledListItem, GreenButton, RedButton, TextStyled} = StyledComponents
import ResourceRecap from './components/ResourceRecap';



class TownHall extends Component {
  static navigationOptions = {
   title: 'Town Hall',
  };
  componentWillMount() {
    console.time('TownHall shown')
  }
  componentDidMount() {
    console.timeEnd('TownHall shown')
  }
  removeTownHall = () => {
    this.props.navigation.goBack();
    this.props.removeTownHall(this.props.townHall.id);
  }
  render() {
    const {
      navigation,
      upgradeTownHall,
      downgradeTownHall,
      upgradeBuilding,
      downgradeBuilding,
      maxTownHall,
      costToMaxDef,
      durationToMaxDef,
      costToMaxTroop,
      durationToMaxTroop,
      darkTroops,
      durationToMaxDarkTroop,
      costToMaxDarkTroop,
      spells,
      durationToMaxSpell,
      costToMaxSpell,
      darkSpells,
      durationToMaxDarkSpell,
      costToMaxDarkSpell,

      siegeMachines,
      durationToMaxSiegeMachine,
      costToMaxSiegeMachine,

      heroes,
      durationToMaxHeroes,
      costToMaxHeroes,

      otherBuildings,
      durationToMaxOtherBuilding,
      costToMaxOtherBuildings,

      traps,
      durationToMaxTrap,
      costToMaxTrap,
      durationToMaxAll,
      costToMaxAll,
    } = this.props;
    if (!this.props.townHall) {
      return (<Container></Container>)
    }
    const townHall = Townhall(this.props.townHall)
    const builderHut = Building(this.props.builderHut, this.props.townHall)

    return (
      <Container>

        <StyledContent>
          <Fragment>
            <List>
              <StyledListItem>
                <Thumbnail style={{resizeMode: 'contain'}} square source={townHall.picture} />
                  <RedButton
                    onPress={() => downgradeTownHall(townHall.id)}
                    disabled={townHall.level === 1}>
                    <TextStyled>-</TextStyled>
                  </RedButton>
                  <TextStyled>{townHall.level}/12</TextStyled>
                  <GreenButton
                    onPress={() => upgradeTownHall(townHall.id)}
                    disabled={townHall.level === 12}>
                    <TextStyled>+</TextStyled>
                  </GreenButton>
              </StyledListItem>
                <StyledListItem>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={builderHut.picture} />
                    <RedButton
                      onPress={() => downgradeBuilding(builderHut.id)}
                      disabled={builderHut.level === 1}>
                      <TextStyled>-</TextStyled>
                    </RedButton>
                    <TextStyled>{builderHut.level}/{builderHut.getMaxLevel()}</TextStyled>
                    <GreenButton
                      onPress={() => upgradeBuilding(builderHut.id)}
                      disabled={builderHut.isMaxed()}>
                      <TextStyled>+</TextStyled>
                    </GreenButton>
                </StyledListItem>
                <StyledListItem>
                    <ResourceRecap costs={costToMaxAll} duration={durationToMaxAll}/>
                </StyledListItem>

                {otherBuildings.length > 0 &&
                  <StyledListItem orange={durationToMaxOtherBuilding === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.BUILDING})}>
                    <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Gold_Storage13.png')} />

                    <TextStyled>Buildings</TextStyled>
                    {durationToMaxOtherBuilding > 0 && <ResourceRecap col costs={costToMaxOtherBuildings} duration={durationToMaxOtherBuilding}/>}
                    {durationToMaxOtherBuilding === 0 && <TextStyled>Maxed!</TextStyled>}
                  </StyledListItem>
                }


              <StyledListItem orange={durationToMaxDef === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.DEFENSES})}>
                <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Eagle_Artillery3.png')} />
                <TextStyled>Defenses</TextStyled>
                {durationToMaxDef > 0 && <ResourceRecap col costs={costToMaxDef} duration={durationToMaxDef}/>}
                {durationToMaxDef === 0 && <TextStyled>Maxed!</TextStyled>}
              </StyledListItem>

              {traps.length > 0 &&
                <StyledListItem orange={durationToMaxTrap === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.TRAPS})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Giant_Bomb5.png')} />

                  <TextStyled>Traps</TextStyled>
                  {durationToMaxTrap > 0 && <ResourceRecap col costs={costToMaxTrap} duration={durationToMaxTrap}/>}
                  {durationToMaxTrap === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }

              {heroes.length > 0 &&
                <StyledListItem orange={durationToMaxHeroes === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.HEROES})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Archer_Queen41.png')} />
                  <TextStyled>Heroes</TextStyled>
                  {durationToMaxHeroes > 0 && <ResourceRecap col costs={costToMaxHeroes} duration={durationToMaxHeroes}/>}
                  {durationToMaxHeroes === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }
              <StyledListItem orange={durationToMaxTroop === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.TROOPS})}>
                <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Electro_Dragon1.png')} />
                <TextStyled>Troops</TextStyled>
                {durationToMaxTroop > 0 && <ResourceRecap col costs={costToMaxTroop} duration={durationToMaxTroop}/>}
                {durationToMaxTroop === 0 && <TextStyled>Maxed!</TextStyled>}
              </StyledListItem>

              {darkTroops.length > 0 &&
                <StyledListItem orange={durationToMaxDarkTroop === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.DARK_TROOPS})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Golem8.png')} />
                  <TextStyled>Dark Troops</TextStyled>
                  {durationToMaxDarkTroop > 0 && <ResourceRecap col costs={costToMaxDarkTroop} duration={durationToMaxDarkTroop}/>}
                  {durationToMaxDarkTroop === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }
              {spells.length > 0 &&
                <StyledListItem orange={durationToMaxSpell === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.SPELLS})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Rage_Spell.png')} />
                  <TextStyled>Spells</TextStyled>
                  {durationToMaxSpell > 0 && <ResourceRecap col costs={costToMaxSpell} duration={durationToMaxSpell}/>}
                  {durationToMaxSpell === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }
              {darkSpells.length > 0 &&
                <StyledListItem orange={durationToMaxDarkSpell === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.DARK_SPELLS})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Poison_Spell.png')} />
                  <TextStyled>Dark Spells</TextStyled>
                  {durationToMaxDarkSpell > 0 && <ResourceRecap col costs={costToMaxDarkSpell} duration={durationToMaxDarkSpell}/>}
                  {durationToMaxDarkSpell === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }
              {siegeMachines.length > 0 &&
                <StyledListItem orange={durationToMaxSiegeMachine === 0} button onPress={() => navigation.navigate('Defenses', {thId: townHall.id, catType: BUILDING_TYPES.SIEGE_MACHINES})}>
                  <Thumbnail style={{resizeMode: 'contain'}} square source={require('./assets/images/Wall_Wrecker3.png')} />
                  <TextStyled>Siege Machines</TextStyled>
                  {durationToMaxSiegeMachine > 0 && <ResourceRecap col costs={costToMaxSiegeMachine} duration={durationToMaxSiegeMachine}/>}
                  {durationToMaxSiegeMachine === 0 && <TextStyled>Maxed!</TextStyled>}
                </StyledListItem>
              }


            </List>
            <Grid style={{marginBottom:100}}>
              <Col>
                <GreenButton block onPress={() => maxTownHall(townHall.id)}>
                  <TextStyled>Max Town Hall for this level</TextStyled>
                </GreenButton>
              </Col>

            </Grid>


            <RedButton block danger onPress={() => this.removeTownHall()}>
              <TextStyled>Delete Town Hall</TextStyled>
            </RedButton>
          </Fragment>

        </StyledContent>
      </Container>
    );
  }
}

const mapStateToProps = ({buildings}, {navigation}) => {
  const thId = navigation.getParam('thId');
  const townHall = getTh(buildings, thId);
  const builderHut = getThBuilderHut(buildings, thId)

  const defenses = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.DEFENSES);
  const durationToMaxDef = getDurationToMax(defenses, townHall, builderHut.level);
  const costToMaxDef = getCostToMax(defenses, townHall);

  const troops = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.TROOPS);
  const durationToMaxTroop = getDurationToMax(troops, townHall, 1);
  const costToMaxTroop = getCostToMax(troops, townHall);

  const darkTroops = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.DARK_TROOPS);
  const durationToMaxDarkTroop = getDurationToMax(darkTroops, townHall, 1);
  const costToMaxDarkTroop = getCostToMax(darkTroops, townHall);

  const spells = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.SPELLS);
  const durationToMaxSpell = getDurationToMax(spells, townHall, 1);
  const costToMaxSpell = getCostToMax(spells, townHall);

  const darkSpells = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.DARK_SPELLS);
  const durationToMaxDarkSpell = getDurationToMax(darkSpells, townHall, 1);
  const costToMaxDarkSpell = getCostToMax(darkSpells, townHall);

  const siegeMachines = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.SIEGE_MACHINES);
  const durationToMaxSiegeMachine = getDurationToMax(siegeMachines, townHall, 1);
  const costToMaxSiegeMachine = getCostToMax(siegeMachines, townHall);

  const heroes = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.HEROES);
  const durationToMaxHeroes = getDurationToMax(heroes, townHall, builderHut.level);
  const costToMaxHeroes = getCostToMax(heroes, townHall);

  const otherBuildings = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.BUILDING);
  const durationToMaxOtherBuilding = getDurationToMax(otherBuildings, townHall, builderHut.level);
  const costToMaxOtherBuildings = getCostToMax(otherBuildings, townHall);

  const traps = getCategoryThBuildings(buildings, thId, BUILDING_TYPES.TRAPS);
  const durationToMaxTrap = getDurationToMax(traps, townHall, builderHut.level);
  const costToMaxTrap = getCostToMax(traps, townHall);

  const durationToMaxBuilding = getDurationToMax([...traps, ...otherBuildings, ...heroes, ...defenses], townHall, builderHut.level)
  const durationToMaxLab = getDurationToMax([...siegeMachines, ...darkSpells, ...spells, ...darkTroops, ...troops], townHall, 1);

  const durationToMaxAll = Math.max(durationToMaxBuilding, durationToMaxLab);

  const costToMaxAll = summCosts([costToMaxTrap, costToMaxTroop, costToMaxSpell, costToMaxHeroes, costToMaxDarkTroop, costToMaxDarkSpell, costToMaxSiegeMachine, costToMaxOtherBuildings, costToMaxDef])
  return  {
    townHall,
    builderHut: builderHut,
    durationToMaxDef,
    costToMaxDef,
    durationToMaxTroop,
    costToMaxTroop,
    darkTroops,
    durationToMaxDarkTroop,
    costToMaxDarkTroop,
    spells,
    durationToMaxSpell,
    costToMaxSpell,

    darkSpells,
    durationToMaxDarkSpell,
    costToMaxDarkSpell,

    siegeMachines,
    durationToMaxSiegeMachine,
    costToMaxSiegeMachine,

    heroes,
    durationToMaxHeroes,
    costToMaxHeroes,

    otherBuildings,
    durationToMaxOtherBuilding,
    costToMaxOtherBuildings,

    traps,
    durationToMaxTrap,
    costToMaxTrap,

    durationToMaxAll,
    costToMaxAll,
  }
};

const mapDispatchToProps = dispatch => ({
  upgradeTownHall: (thId) => dispatch(upgradeTownHall(thId)),
  downgradeTownHall: (thId) => dispatch(downgradeTownHall(thId)),
  upgradeBuilding: (thId) => dispatch(upgradeBuilding(thId)),
  downgradeBuilding: (thId) => dispatch(downgradeBuilding(thId)),
  removeTownHall: (thId) => dispatch(removeTownHall(thId)),
  maxTownHall: (thId) => dispatch(maxTownHall(thId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TownHall)

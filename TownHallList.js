import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Font, AppLoading, Asset } from 'expo';

import { addTownHall } from './clashEntities/actions';
import TownHall from './clashEntities/townHall';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
  List,
  ListItem,
  Thumbnail
} from 'native-base';
import StyledComponents from './components/StyledComponents'
const {StyledContent, TextStyled, StyledListItem, GreenButton} = StyledComponents;

class TownHallList extends Component {
  static navigationOptions = {
   title: 'Coc track',
  };
  render() {
    let { addTownHall, townHalls } = this.props;
    townHalls = townHalls.map(th => TownHall(th))
    return (
      <Container>
          <StyledContent>
            <List>
             {townHalls.map(th => (
               <StyledListItem key={th.id} onPress={() => this.props.navigation.navigate('TownHall', {thId: th.id})}>
                 <Thumbnail style={{resizeMode: 'contain'}} square source={th.picture} />
                 <TextStyled>Town Hall level {th.level}</TextStyled>
               </StyledListItem>
             ))}
               <GreenButton block onPress={ () => addTownHall()}>
                 <TextStyled>Add new Town Hall</TextStyled>
               </GreenButton>
           </List>
          </StyledContent>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  townHalls: state.buildings.filter(building => building.buildingType === 'TOWN_HALL')
});

const mapDispatchToProps = dispatch => ({
  addTownHall: () => dispatch(addTownHall())
});

export default connect(mapStateToProps, mapDispatchToProps)(TownHallList)

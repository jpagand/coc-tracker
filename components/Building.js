import React, { Component, Fragment } from 'react';
import Building from '../clashEntities/building';
import {
  Grid,
  Row,
  Thumbnail
} from "native-base";
import StyledComponents from './StyledComponents'
const {StyledContent, StyledListItem, GreenButton, RedButton, TextStyled} = StyledComponents
import ResourceRecap from './ResourceRecap';

class BuildingComponent extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.building.level !== this.props.building.level
  }
  render() {
    const { building, townHall, onMinusClick, onPlusClick, onMaxClick } = this.props;
      const b = Building(building, townHall)
      b.next = b.nextLevel()
      b.maxed = b.isMaxed()
      b.maxLevel = b.getMaxLevel()
      if (b.next) {
        b.costs = {[b.next.resource]: b.next.cost}
      }
    return (
      <StyledListItem orange={!b.next}key={b.id}>
        <Grid>
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Thumbnail style={{resizeMode: 'contain'}} square source={b.picture} />
            {!!b.next &&
              <Fragment>
                <RedButton
                  onPress={() => onMinusClick(b.id)}
                  disabled={b.level === 0}>
                  <TextStyled>-</TextStyled>
                </RedButton>
                <TextStyled>{b.level}/{b.maxLevel}</TextStyled>
                <GreenButton
                  onPress={() => onPlusClick(b.id)}
                  disabled={b.maxed}>
                  <TextStyled>+</TextStyled>
                </GreenButton>
                <GreenButton
                  onPress={() => onMaxClick(b.id)}
                  disabled={b.maxed}>
                  <TextStyled>MAX</TextStyled>
                </GreenButton>
              </Fragment>

            }
            {!b.next &&
              <Fragment>
                <RedButton
                  onPress={() => onMinusClick(b.id)}
                  disabled={b.level === 0}>
                  <TextStyled>-</TextStyled>
                </RedButton>
                <TextStyled>Maxed!</TextStyled>
              </Fragment>
              }
          </Row>
        {!!b.next &&
          <Row>
            <TextStyled>Next level:</TextStyled>
            <ResourceRecap costs={b.costs} duration={b.next.time}/>
          </Row>
        }
        </Grid>
      </StyledListItem>
    );
  }

}

export default BuildingComponent;

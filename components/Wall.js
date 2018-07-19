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

class WallComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.wall.quantity !== this.props.wall.quantity
    }
    render() {
    const { wall, townHall, onMinusClick, onPlusClick, totalWall, maxWalls } = this.props;
    const w = wall;
    return (
      <StyledListItem key={w.id}>
        <Grid>
          <Row style={{justifyContent: 'space-between', alignItems: 'center'}}>
            <Thumbnail style={{resizeMode: 'contain'}} square source={w.picture} />
              <Fragment>
                <RedButton
                  onPress={() => onMinusClick(w.id, 10)}
                  disabled={w.quantity <10 || totalWall - 10 < 0}>
                  <TextStyled>-10</TextStyled>
                </RedButton>
                <RedButton
                  onPress={() => onMinusClick(w.id, 1)}
                  disabled={w.quantity  < 1 || totalWall - 1 < 0}>
                  <TextStyled>-</TextStyled>
                </RedButton>
                <TextStyled>{w.quantity}</TextStyled>
                <GreenButton
                  onPress={() => onPlusClick(w.id, 1)}
                  disabled={totalWall + 1 > maxWalls}>
                  <TextStyled>+</TextStyled>
                </GreenButton>
                <GreenButton
                  onPress={() => onPlusClick(w.id, 10)}
                  disabled={totalWall + 10 > maxWalls}>
                  <TextStyled>+10</TextStyled>
                </GreenButton>
              </Fragment>

          </Row>
          <Row>
            <ResourceRecap costs={w.costs} />
          </Row>
        </Grid>
      </StyledListItem>
    );
  }

}

export default WallComponent;

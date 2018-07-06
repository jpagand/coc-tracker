import React from 'react';
import {Image,View, StyleSheet} from 'react-native';
import { GOLD, ELIXIR, BLACK } from '../clashEntities/resources';
import { K, M } from '../clashEntities/quantities';
import StyledComponents from './StyledComponents'
const {TextStyled} = StyledComponents
const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})

const Resource = ({cost, type}) => {
  let unit;
  let number
  if (cost / (1 * M) >= 1) {
    unit = 'M'
    if (cost / (100 * M) >= 1) {
      number = Math.floor(cost / (1 * M))
    } else {
      number = (cost / (1 * M)).toFixed(1)
    }
  } else if (cost / (100 * K) >= 1)  {
    unit = 'K'
    number = Math.floor(cost / (1 * K))
  } else {
    unit = 'K'
    number = (cost / (1 * K)).toFixed(1)
  }
  if (number.toString().endsWith('.0')) {
    number = number.replace('.0', '')
  }
  if (type === ELIXIR) {
    return (
      <View style={styles.view}>
        <TextStyled>{number}{unit} </TextStyled><Image style={{width: 16, resizeMode: 'contain'}} source={require('../assets/images/Elixir.png')}/>
      </View>
    )
  }
  if (type === GOLD) {
    return (
      <View style={styles.view}>
        <TextStyled>{number}{unit} </TextStyled><Image style={{width: 16, resizeMode: 'contain'}} source={require('../assets/images/Gold.png')}/>
      </View>
    )
  }
  if (type === BLACK) {
    return (
      <View style={styles.view}>
        <TextStyled>{number}{unit} </TextStyled><Image style={{width: 16, resizeMode: 'contain'}} source={require('../assets/images/Dark_elixir.png')}/>
      </View>
    )
  }
}

export default Resource

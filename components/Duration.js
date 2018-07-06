import React from 'react';
import {Image,View, StyleSheet} from 'react-native';
import { GOLD, ELIXIR, BLACK } from '../clashEntities/resources';
import { K, M } from '../clashEntities/quantities';
import {convertSeconds} from '../clashEntities/times';

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

const Duration = ({duration}) => {
  duration = convertSeconds(duration)

  let time = '';
  if (duration.days) {
    time+= duration.days + 'd '
  }
  if (duration.hours && duration.days < 100) {
    time+= duration.hours + 'h '
  }
  if (duration.minutes && !duration.days) {
    time+= duration.minutes + 'm '
  }
  if (duration.secondes && !duration.days && !duration.hours) {
    time+= duration.days + 's '
  }
    return (
      <View style={styles.view}>
        <TextStyled>{time}</TextStyled><Image style={{width: 16, resizeMode: 'contain'}} source={require('../assets/images/Stopwatch.png')}/>
      </View>
    )
}

export default Duration

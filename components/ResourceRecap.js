import React from 'react';
import {View, StyleSheet} from 'react-native';
import { GOLD, ELIXIR, BLACK } from '../clashEntities/resources';
import Duration from './Duration'
import Resource from './Resource'
const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  column: {
    flexDirection: 'column',
    alignItems:'flex-end'
  }
})

const ResourceRecap = ({costs, duration, col}) => {
  return (
    <View style={[styles.view, col ?styles.column: styles.row]}>
      {costs[GOLD] > 0 && <Resource cost={costs[GOLD]} type={GOLD}/>}
      {costs[ELIXIR] > 0 && <Resource cost={costs[ELIXIR]} type={ELIXIR}/>}
      {costs[BLACK] > 0 && <Resource cost={costs[BLACK]} type={BLACK}/>}
      {(duration > 0) &&
      <Duration duration={duration}/>}
    </View>
  )
}

export default ResourceRecap

import BUILDING_TYPES from './buildingTypes'
import Building from './building'
import {GOLD, ELIXIR, BLACK} from './resources';

const sortNumber = (a, b) => a - b

export const getTh = (state, id) => _.find(state, {id})

export const getDurationToBuild = (durations, builderNumber) => {
  let builders = [...Array(builderNumber)].map(() => 0) // find the builder hut level (level = number of builder hut)
    // and create the equal number of queues
  durations.forEach(duration => {
    builders[0] += duration;
    builders.sort(sortNumber)
  })
  return builders.pop()
}

export const getAllThBuildings = (state, thId) => state.filter(b => b.thId === th.id)

export const getCategoryThBuildings = (state, thId, category) =>
  state.filter(b => category[b.buildingType] && b.thId === thId)


export const getThBuilderHut = (state, thId) =>
  state.find(building => building.buildingType === BUILDING_TYPES.BUILDER_HUT && building.thId === thId)


export const getDurationToMax = (buildings, th, builderNumber) => {
  const durations = buildings.map(b => {
    return Building(b, th).getDurationToMax()
  })
  return getDurationToBuild(durations, builderNumber)
}

export const getCostToMax = (buildings, th) => {
  return buildings.reduce((acc, b) => {
    const cost =  Building(b, th).getCostToMax()
    acc[GOLD] += cost[GOLD];
    acc[ELIXIR] += cost[ELIXIR];
    acc[BLACK] += cost[BLACK];
    return acc;
  }, {[GOLD]: 0, [ELIXIR]: 0, [BLACK]: 0})
}

export const summCosts = (costs) => {
  return costs.reduce((acc, cost) => {
    acc[GOLD] += cost[GOLD]
    acc[ELIXIR] += cost[ELIXIR]
    acc[BLACK] += cost[BLACK]
    return acc
  }, {[GOLD]: 0, [ELIXIR]: 0, [BLACK]: 0})
}

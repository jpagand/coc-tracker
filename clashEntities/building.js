import _ from 'lodash';
import BUILDING_LEVELS from './buildingLevels';
import {GOLD, ELIXIR, BLACK} from './resources';

const Building = (building, TH) => {
  const picture = _.find(BUILDING_LEVELS[building.buildingType], {level: building.level || 1}).picture

  const getMaxLevel = () => {
    const maxLvl = _.findLast(BUILDING_LEVELS[building.buildingType], b => {
      return b.requiredTH <= TH.level
    })
    if (!maxLvl) {
      console.log('!!!!!!!! getMaxLevel', building.buildingType, TH.level)
    }
    return maxLvl.level;
  }

  const isMaxed = () => building.level === getMaxLevel()

  const upgrade = () => {
    if (isMaxed()) {
      return building
    } else {
      return {...building, level: building.level + 1}
    }
  }

  const downgrade = () => {
    if (building.level > 0) {
      return {...building, level: building.level - 1}
    } else {
      return building
    }
  }
  const nextLevel = () => _.findLast(BUILDING_LEVELS[building.buildingType], {level: building.level + 1})

  const getDurationToMax = () => {
    const maxLvl = getMaxLevel();
    return BUILDING_LEVELS[building.buildingType].reduce((acc, level) => {
      if (level.level > building.level && level.level <= maxLvl ) {
        return acc + (level.time || 0)
      }
      return acc;
    }, 0)
  }

  const max = () => {
    if (isMaxed()) {
      return building
    } else {
      return {...building, level: getMaxLevel()}
    }
  }

  const getCostToMax = () => {
    const maxLvl = getMaxLevel();
    return BUILDING_LEVELS[building.buildingType].reduce((acc, level) => {
      if (level.level > building.level && level.level <= maxLvl ) {
        acc[level.resource] += level.cost
      }
      return acc;
    }, {[GOLD]: 0, [ELIXIR]: 0, [BLACK]: 0})
  }

  return {
    upgrade,
    downgrade,
    getMaxLevel,
    isMaxed,
    nextLevel,
    getDurationToMax,
    getCostToMax,
    max,
    picture,
    ...building
  }
}

export default Building

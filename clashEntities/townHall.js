import _ from 'lodash';
import Building from './building';
import AVAILABLE_BUILDINGS from './availableBuildings';
import BUILDING_LEVELS from './buildingLevels';
import BUILDING_TYPES from './buildingTypes';



const TownHall = (th) => {

  const picture = _.find(BUILDING_LEVELS[BUILDING_TYPES.TOWN_HALL], {level: th.level}).picture
  const getNewBuildings = () => {
    const newBuildings = [];
    _.forEach(AVAILABLE_BUILDINGS, (buildingNumber, type) => {
      if (type !== BUILDING_TYPES.WALL) {
        const numberToAdd = buildingNumber[th.level - 1] - (buildingNumber[th.level - 2] || 0 )
        _.times(numberToAdd, () => {
          newBuildings.push(type)
        })
      }
    })
    return newBuildings;
  }

  const getNewWalls = () => {
    const walls = BUILDING_LEVELS[BUILDING_TYPES.WALL].filter(w => w.requiredTH === th.level);
    return walls
  }

  const getRemovedBuildings = () => {
    const removedBuildings = []
    _.forEach(AVAILABLE_BUILDINGS, (buildingNumber, type) => {
      if (type !== BUILDING_TYPES.WALL) {
        const numberToRemove = buildingNumber[th.level] - buildingNumber[th.level - 1];
        _.times(numberToRemove, () => {
          removedBuildings.push(type)
        })
      }
    })
    return removedBuildings;
  }

  const getMaxLevel = () => 12

  const isMaxed = () => th.level === getMaxLevel()

  const upgrade = () => {
    if (!isMaxed()) {
      return {...th, level: th.level + 1}
    } else {
      return th
    }
  }

  const downgrade = () => {
    if (th.level > 0) {
      return {...th, level: th.level - 1}
    } else {
      return th
    }
  }
  const nextLevel = () => _.findLast(BUILDING_LEVELS[th.buildingType], {level: th.level + 1})



  return { getNewBuildings, getRemovedBuildings, isMaxed, nextLevel, upgrade, downgrade, picture, getNewWalls, ...th}
}

export default TownHall;

import _ from 'lodash';
import { combineReducers } from 'redux';
import Building from './building';
import TownHall from './townHall';
import BUILDING_TYPES from './buildingTypes';
import { getTh, getDurationToBuild, getDurationToMax } from './stateHelpers';

const getUuid = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}


const buildings = (state = [], action) => {


  const getNewBuildings = (th) => TownHall(th).getNewBuildings().map(b => ({
      id: getUuid(),
      buildingType: b,
      level: 0,
      thId: th.id
    }))

  let th;
  let newState;
  switch (action.type) {
    case 'ADD_BUILDING':
    console.log('ADD_BUILDING', action);
      return [...state, {
        id: getUuid(),
        buildingType: action.buildingType,
        thId: action.thId,
        level: 0
      }]
    case 'ADD_TOWN_HALL':
    console.log('ADD_TOWN_HALL', action);
    const th = {
      id: getUuid(),
      buildingType: BUILDING_TYPES.TOWN_HALL,
      level: 1
    }
      return [...state, th,
      {
        id: getUuid(),
        thId: th.id,
        buildingType: BUILDING_TYPES.BUILDER_HUT,
        level: 1,
      },...getNewBuildings(th)]
    case 'REMOVE_BUILDING':
      return state.filter(building => building.id !== action.id)
    case 'REMOVE_TOWN_HALL':
      return state.filter(building => building.id !== action.id && building.thId !== action.id)
    case 'UPGRADE_BUILDING':
      return state.map(building =>
        (building.id === action.id)
          ? Building(building, getTh(state, building.thId)).upgrade()
          : building
      )
    case 'DOWNGRADE_BUILDING':
      return state.map(building =>
        (building.id === action.id)
          ? Building(building, getTh(state, building.thId)).downgrade()
          : building
        )
    case 'MAX_BUILDING':
      return state.map(building =>
        (building.id === action.id)
          ? Building(building, getTh(state, building.thId)).max()
          : building
        )
    case 'MAX_TOWN_HALL':
      th  = getTh(state, action.id)
      return state.map(building =>
        (building.thId === action.id)
          ? Building(building, th).max()
          : building
        )
    case 'UPGRADE_TOWN_HALL':
      newState = state.map(building => {
        if (building.id === action.id) {
          th = TownHall(building).upgrade()
          return th
        } else {
          return building
        }
      })
      return [...newState, ...getNewBuildings(th)]
    case 'DOWNGRADE_TOWN_HALL':
      newState = state.map(building => {
        if (building.id === action.id) {
          th = TownHall(building).downgrade()
          return th
        } else {
          return building
        }
      })
      if (th.level === 0) {
        return [...newState.filter(building => building.thId !== th.id)]
      } else {
        let buildingsToRemove = TownHall(th).getRemovedBuildings()
        return [...newState.filter(building => {
          if (building.thId === th.id && buildingsToRemove.includes(building.buildingType)) {
            _.pullAt(buildingsToRemove, [buildingsToRemove.indexOf(building.buildingType)])
            return false
          }
          return true
        }).map(building => {
          // dowgrade building that are above new max
          try {
            if (building.thId === th.id && building.level > Building(building, th).getMaxLevel() ) {
              return Building(building, th).max()
            }
          } catch(e) {
            console.log('!!!! downgrade max', building.buildingType);
            throw e
          }

          return building
        })
        ]
      }

    default:
      return state
  }
}

export default combineReducers({
  buildings
})

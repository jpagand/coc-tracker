import BUILDING_TYPES from './buildingTypes'


export const addBuilding = (buildingType, thId) => ({
  type: 'ADD_BUILDING',
  thId,
  buildingType,
})

export const removeBuilding = id => ({
  type: 'REMOVE_BUILDING',
  id
})

export const upgradeBuilding = id => ({
  type: 'UPGRADE_BUILDING',
  id
})

export const downgradeBuilding = id => ({
  type: 'DOWNGRADE_BUILDING',
  id
})

export const upgradeWall = (id, quantity) => ({
  type: 'UPGRADE_WALL',
  id,
  quantity
})

export const downgradeWall = (id, quantity) => ({
  type: 'DOWNGRADE_WALL',
  id,
  quantity
})

export const maxBuilding = id => ({
  type: 'MAX_BUILDING',
  id
})

export const addTownHall = () => ({
  type: 'ADD_TOWN_HALL'
})

export const removeTownHall = id => ({
  type: 'REMOVE_TOWN_HALL',
  id
})

export const upgradeTownHall = id => ({
  type: 'UPGRADE_TOWN_HALL',
  id
})

export const downgradeTownHall = id => ({
  type: 'DOWNGRADE_TOWN_HALL',
  id
})

export const maxTownHall = id => ({
  type: 'MAX_TOWN_HALL',
  id
})

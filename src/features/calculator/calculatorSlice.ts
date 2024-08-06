import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdditiveDamage, Attributes, CalculatorData, CharacterClass, DamageMultipliers, DamageSource, DamageSourceInstance, EMPTY_ATTRIBUTES, EnemyState, PlayerState } from "../../data/interface";

const initialState: CalculatorData = {
  name: '',
  characterClass: CharacterClass.Necro,
  attributes: EMPTY_ATTRIBUTES,
  weaponDamage: 100,
  weaponSpeed: 1,
  attackSpeedBonus: 0,
  minionAttackSpeed: 0,
  additiveDamage: {},
  damageMultipliers: {},
  damageSources: {},
  playerState: {
    hasBarrier: false,
  },
  enemyState: {
    isVuln: false,
    isClose: false,
    isHealthy: false,
  },
}

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    selectClass: (state, action: PayloadAction<CharacterClass>) => {
      state.characterClass = action.payload;
    },
    updateAttributes: (state, action: PayloadAction<Attributes>) => {
      state.attributes = action.payload;
    },
    updateWeaponDamage: (state, action: PayloadAction<number>) => {
      state.weaponDamage = action.payload;
    },
    addDamageSource: (state, action: PayloadAction<DamageSource>) => {
      state.damageSources = {
        ...state.damageSources, 
        [action.payload.name]: {
          source: action.payload,
          rank: 1,
          canCrit: action.payload.canCrit,
          isCrit: false,
          canOP: action.payload.canOP,
          isOP: false,
        }
      }
    },
    updateDamageSourceInstance: (state, action: PayloadAction<DamageSourceInstance>) => {
      state.damageSources = {
        ...state.damageSources,
        [action.payload.source.name]: action.payload,
      }
    },
    updateAdditiveDamage: (state, action: PayloadAction<AdditiveDamage>) => {
      state.additiveDamage = {...state.additiveDamage, ...action.payload};
    },
    updateMultiplier: (state, action: PayloadAction<DamageMultipliers>) => {
      state.damageMultipliers = {...state.damageMultipliers, ...action.payload}
    },
    updatePlayerState: (state, action: PayloadAction<PlayerState>) => {
      state.playerState = {...state.playerState, ...action.payload};
    },
    updateEnemyState: (state, action: PayloadAction<EnemyState>) => {
      state.enemyState = {...state.enemyState, ...action.payload};
    },
  }
});

export default calculatorSlice.reducer;
export const { 
  selectClass, 
  updateAttributes, 
  updateWeaponDamage, 
  addDamageSource,
  updateDamageSourceInstance,
  updateAdditiveDamage,
  updateMultiplier,
  updatePlayerState,
  updateEnemyState,
} = calculatorSlice.actions;
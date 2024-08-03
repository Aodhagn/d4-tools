import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AdditiveDamage, Attributes, CalculatorData, CharacterClass, DamageMultipliers, DamageSource, EMPTY_ATTRIBUTES } from "../../data/interface";

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
  damageSources: [],
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
      state.damageSources = [...state.damageSources, {
        source: action.payload,
        rank: 1,
        isCrit: false,
        isOP: false,
      }]
    },
    updateAdditiveDamage: (state, action: PayloadAction<AdditiveDamage>) => {
      state.additiveDamage = {...state.additiveDamage, ...action.payload};
    },
    updateMultiplier: (state, action: PayloadAction<DamageMultipliers>) => {
      state.damageMultipliers = {...state.damageMultipliers, ...action.payload}
    },
  }
});

export default calculatorSlice.reducer;
export const { 
  selectClass, 
  updateAttributes, 
  updateWeaponDamage, 
  addDamageSource,
  updateAdditiveDamage,
  updateMultiplier,
} = calculatorSlice.actions;
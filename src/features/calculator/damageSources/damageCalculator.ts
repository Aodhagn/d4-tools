import { CalculatorData, CharacterClass, DamageMultiplier, DamageMultiplierName, DamageSourceInstance, DamageType, initializeMultiplier, InteractionPredicates, PredicateContext } from "../../../data/interface";

export interface AdditiveDamageValue {
  readonly damageType: DamageType;
  readonly value: number;
}

export const calculateDamage = (damageSourceInstance: DamageSourceInstance, calculatorData: CalculatorData): number => {
  const predicateContext = {...damageSourceInstance, ...calculatorData};

  const { appliedAdditiveDamageSources } = sortAdditiveDamageSources(
    damageSourceInstance.source.additiveDamagePredicates, predicateContext);
    
  const { appliedMultipliers } = sortMultipliers(
    damageSourceInstance.source.multiplierPredicates, predicateContext);

  return (calculatorData.weaponDamage 
    * damageSourceInstance.source.baseDamage 
    * getMainStatMulti(calculatorData)
    * getAdditiveDamageMulti(appliedAdditiveDamageSources)
    * getTotalMultiplier(appliedMultipliers));
}

export const sortAdditiveDamageSources = (additiveDamagePredicates: InteractionPredicates, predicateContext: PredicateContext):
    { appliedAdditiveDamageSources: AdditiveDamageValue[], ignoredAdditiveDamageSources: AdditiveDamageValue[]} => {
  
  const appliedAdditiveDamageSources = [], ignoredAdditiveDamageSources = [];

  for (const key in additiveDamagePredicates) {
    const value = predicateContext.additiveDamage[key as DamageType]
    if (value && additiveDamagePredicates[key as DamageType]!(predicateContext)) {
      appliedAdditiveDamageSources.push({
        damageType: key as DamageType,
        value,
      });
    } else {
      ignoredAdditiveDamageSources.push({
        damageType: key as DamageType,
        value: 0,
      });
    }
  }

  return { appliedAdditiveDamageSources, ignoredAdditiveDamageSources };
}

export const getAdditiveDamageMulti = (additiveDamageValues: AdditiveDamageValue[]): number => {
  const totalAdditiveDamage = additiveDamageValues.reduce((total, additive) => {
    return total + additive.value;
  }, 0);
  return 1 + (totalAdditiveDamage / 100);
}

export const sortMultipliers = (multiplierPredicates: InteractionPredicates, predicateContext: PredicateContext):
    { appliedMultipliers: DamageMultiplier[], ignoredMultipliers: DamageMultiplier[] } => {

  const appliedMultipliers = [], ignoredMultipliers = [];

  for (const key in multiplierPredicates) {
    let multiplier = predicateContext.damageMultipliers[key as DamageMultiplierName];
    if (multiplier && multiplierPredicates[key as DamageMultiplierName]!(predicateContext)) {
      appliedMultipliers.push(multiplier);
    } else {
      multiplier = multiplier || initializeMultiplier(key as DamageMultiplierName);
      if (multiplier) {
        ignoredMultipliers.push(multiplier);
      } else {
        console.log(`Failed to generate multiplier for ${key}`);
      }
    }
  }

  return { appliedMultipliers, ignoredMultipliers };
}

export const getTotalMultiplier = (appliedMultipliers: DamageMultiplier[]): number => {
  return appliedMultipliers.reduce((total, multi) => {
    return multi.apply(total, multi);
  }, 1)
}

export const getMainStatMulti = (calculatorData: CalculatorData): number => {
  const classRatio = getMainStatClassRatio(calculatorData.characterClass);
  const mainStat = getMainStatValue(calculatorData);
  return 1 + ((mainStat / classRatio) / 100);
}

export const getMainStatClassRatio = (characterClass: CharacterClass): number => {
  switch(characterClass) {
    case CharacterClass.Barb:
      return 10;
    case CharacterClass.Rogue:
      return 9;
    case CharacterClass.Druid:
    case CharacterClass.Necro:
    case CharacterClass.Sorc:
      return 8;
  }
}

export const getMainStatValue = (calculatorData: CalculatorData): number => {
  switch(calculatorData.characterClass) {
    case CharacterClass.Barb:
      return calculatorData.attributes.str;
    case CharacterClass.Rogue:
      return calculatorData.attributes.dex;
    case CharacterClass.Druid:
      return calculatorData.attributes.will;
    case CharacterClass.Necro:
    case CharacterClass.Sorc:
      return calculatorData.attributes.int;
  }
}

export const convertMultiToDisplay = (value: number) => {
  return ((value - 1) * 100).toFixed(0);
}

export const convertDisplayToMulti = (value: string) => {
  return (parseInt(value) / 100) + 1;
}
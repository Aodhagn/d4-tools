export interface CalculatorData {
  readonly name: string;
  readonly characterClass: CharacterClass;
  readonly attributes: Attributes;
  readonly weaponDamage: number;
  readonly weaponSpeed: number;
  readonly attackSpeedBonus: number;
  readonly minionAttackSpeed?: number;
  readonly additiveDamage: AdditiveDamage;
  readonly damageMultipliers: DamageMultipliers;
  readonly damageSources: DamageSourceInstance[];
  readonly playerState: PlayerState;
  readonly enemyState: EnemyState;
}

export interface DamageSourceInstance {
  readonly source: DamageSource;
  readonly rank: number;
  readonly isCrit: boolean;
  readonly isOP: boolean;
}

export enum CharacterClass {
  Necro = 'Necromancer',
  Barb = 'Barbarian',
  Sorc = 'Sorcerer',
  Rogue = 'Rogue',
  Druid = 'Druid',
}

export interface Attributes {
  readonly str: number;
  readonly int: number;
  readonly dex: number;
  readonly will: number;
}

export interface PlayerState {
  readonly hasBarrier: boolean;
}

export interface EnemyState {
  readonly isVuln: boolean;
  readonly isClose: boolean;
  readonly isHealthy: boolean;
  // TODO: add all other vs. conditionals
}

export const EMPTY_ATTRIBUTES: Attributes = {
  str: 0,
  int: 0,
  dex: 0,
  will: 0,
}

export type AdditiveDamage = {
  readonly [key in DamageType]?: number;
}

export type DamageMultipliers = {
  readonly [key in DamageMultiplierName]?: DamageMultiplier;
}

export enum DamageType {
  damage = 'damage',
  critDamage = 'critDamage',
  vulnDamage = 'vulnDamage',
  opDamage = 'opDamage',
  physical = 'physical',
  lightning = 'lightning',
  poison = 'poison',
  shadow = 'shadow',
  cold = 'cold',
  fire = 'fire',
  dot = 'dot',
  physicalDot = 'physicalDot',
  lightningDot = 'lightningDot',
  poisonDot = 'poisonDot',
  shadowDot = 'shadowDot',
  coldDot = 'coldDot',
  fireDot = 'fireDot',
  ultimate = 'ultimate',
  dW = 'dW',
  skillsThatSwap = 'skillsThatSwap',
  vsClose = 'vsClose',
  vsCC = 'vsCC',
  vsDistant = 'vsDistant',
  vsSlowed = 'vsSlowed',
  vsStunned = 'vsStunned',
  vsElites = 'vsElites',
  vsInjured = 'vsInjured',
  vsChilled = 'vsChilled',
  vsDazed = 'vsDazed',
  vsTrapped = 'vsTrapped',
  vsFrozen = 'vsFrozen',
  vsPoisoned = 'vsPoisoned',
  vsBurning = 'vsBurning',
  vsHealthy = 'vsHealthy',
  vsBleeding = 'vsBleeding',
  afterKillingElite = 'afterKillingElite',
  basicSkill = 'basicSkill',
  whileFortified = 'whileFortified',

  // Necromancer
  boneSkill = 'boneSkill',
  minions = 'minions',
  bloodSkill = 'bloodSkill',
  darknessSkill = 'darknessSkill',
  summoningSkill = 'summoningSkill',
  critBone = 'critBone',
  afterBloodOrb = 'afterBloodOrb',
  vsShadowDot = 'vsShadowDot',

  // Barbarian

  brawlingSkill = 'brawlingSkill',
  weaponMasterySkill = 'weaponMasterySkill',
  twoHandBludgeoning = 'twoHandBludgeoning',
  twoHandSlashing = 'twoHandSlashing',
  opTwoHandBludgeoning = 'opTwoHandBludgeoning',
  whileBerserking = 'whileBerserking',

  // Sorcerer

  conjurationSkill = 'conjurationSkill',
  frostSkill = 'frostSkill',
  pyromancySkill = 'pyromancySkill',
  shockSkill = 'shockSkill',
  critLightning = 'critLightning',
  cracklingEnergy = 'cracklingEnergy',

  // Rogue

  cutthroatSkill = 'cutthroatSkill',
  ranged = 'ranged',
  imbuedSkill = 'imbuedSkill',
  marksmanSkill = 'marksmanSkill',
  trapSkill = 'trapSkill',
  critImbuedSkill = 'critImbuedSkill',

  // Druid

  companionSkill = 'companionSkill',
  earthSkill = 'earthSkill',
  opWerebear = 'opWerebear',
  stormSkill = 'stormSkill',
  werebearSkill = 'werebearSkill',
  werewolfSkill = 'werewolfSkill',
  critEarthSkill = 'critEarthSkill',
  critWerewolfSkill = 'critWerewolfSkill',
  whileHuman = 'whileHuman',
  whileShapeshifted = 'whileShapeshifted',

}

export interface DamageMultiplier {
  readonly name: DamageMultiplierName;
  readonly variable: boolean;
  readonly enabled: boolean;
  readonly value: number;
  readonly apply: (prev: number, thisMulti: DamageMultiplier) => number;
}

export enum DamageMultiplierName {
  // General

  // Aspects
  Conceited = 'Conceited',
  Edgemasters = 'Edgemasters',
  Elements = 'Elements',
  Expectant = 'Expectant',
  InnerCalm = 'InnerCalm',
  Retribution = 'Retribution',
  Adaptability = 'Adaptability',

  // Uniques
  StarlessSkies = 'StarlessSkies',
  Grandfather = 'Grandfather',
  BanishedLordsTalisman = 'BanishedLordsTalisman',
  FistsOfFate = 'FistsOfFate',
  GodslayerCrown = 'GodslayerCrown',
  Paingorgers = 'Paingorgers',
  PenitentGreaves = 'PenitentGreaves',
  TibaultsWill = 'TibaultsWill',

  // Necromancer

  // Aspects
  Blighted = 'Blighted',
  BloodSeekers = 'BloodSeekers',
  Cadaverous = 'Cadaverous',
  Damned = 'Damned',
  Decay = 'Decay',
  GraspingVeins = 'GraspingVeins',
  Reanimation = 'Reanimation',
  Serration = 'Serration',
  Splintering = 'Splintering',
  UntimelyDeath = 'UntimelyDeath',
  UnyieldingCommander = 'UnyieldingCommander',
  BloodGetters = 'BloodGetters',
  
  // Uniques
  BlackRiver = 'BlackRiver',
  BloodMoonBreeches = 'BloodMoonBreeches',
  BloodlessScream = 'BloodlessScream',
  HowlFromBelow = 'HowlFromBelow',
  MutilatorPlate = 'MutilatorPlate',

  // Paragon Nodes
  CultLeader = 'CultLeader',
  HulkingMonstrosity = 'HulkingMonstrosity',
  FleshEater = 'FleshEater',
  BoneGraft = 'BoneGraft',
  BloodBegetsBlood = 'BloodBegetsBlood',
  BloodBath = 'BloodBath',
  Wither = 'Wither',

  // Glyphs
  Abyssal = 'Abyssal',
  Amplify = 'Amplify',
  Control = 'Control',
  Corporeal = 'Corporeal',
  Deadraiser = 'Deadraiser',
  Desecration = 'Desecration',
  Dominate = 'Dominate',
  Essence = 'Essence',
  Exploit = 'Exploit',
  Golem = 'Golem',
  Gravekeeper = 'Gravekeeper',
  Revenge = 'Revenge',
  Sacrificial = 'Sacrificial',
  Scourge = 'Scourge',

}

export type PredicateContext = CalculatorData & DamageSourceInstance;
export type PredicateTest = (context: PredicateContext) => boolean;
export const AlwaysTrue: PredicateTest = () => true;

export type DamageKey = DamageType | DamageMultiplierName;

export type InteractionPredicates = {
  readonly [key in DamageKey]?: PredicateTest;
};

export interface DamageSource {
  readonly name: string;
  readonly baseDamage: number;
  readonly hasRanks: boolean;
  readonly additiveDamagePredicates: InteractionPredicates;
  readonly multiplierPredicates: InteractionPredicates;
}

export const DefaultAdditiveDamagePredicates: InteractionPredicates = {
  [DamageType.damage]: AlwaysTrue,
  [DamageType.critDamage]: cxt => cxt.isCrit,
  [DamageType.vulnDamage]: cxt => cxt.enemyState.isVuln,
  [DamageType.opDamage]: cxt => cxt.isOP,
}

export const VersusAdditiveDamagePredicates: InteractionPredicates = {
  [DamageType.vsClose]: cxt => cxt.enemyState.isClose,
}

export const NecromancerDamageSources: DamageSource[] = [
  {
    name: 'Bone Splinters',
    baseDamage: 0.09,
    hasRanks: true,
    additiveDamagePredicates: {
      ...DefaultAdditiveDamagePredicates,
      ...VersusAdditiveDamagePredicates,
    },
    multiplierPredicates: {
      [DamageMultiplierName.Conceited]: AlwaysTrue,
      // [DamageMultiplierName.Essence]: cxt => cxt.isCrit && !cxt.enemyState.isHealthy,
      [DamageMultiplierName.Essence]: AlwaysTrue,
    },
  }
];

export interface DamageMultiplierBaseData {
  readonly defaultValue: number;
  readonly variable: boolean;
  readonly apply: (prev: number, thisMulti: DamageMultiplier) => number;
}

export type DamageMultiplierDataset = {
  // TODO: make this non-optional once all values are defined
  readonly [key in DamageMultiplierName]?: DamageMultiplierBaseData;
}

export const DefaultMultiplierApply = (prev: number, thisMulti: DamageMultiplier) => (prev * thisMulti.value);

export const DamageMultiplierData: DamageMultiplierDataset = {
  [DamageMultiplierName.Conceited]: {
    defaultValue: 1.25,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Essence]: {
    defaultValue: 1.22,
    variable: false,
    apply: DefaultMultiplierApply,
  }
}

export const initializeMultiplier = (name: DamageMultiplierName): DamageMultiplier | undefined => {
  const base = DamageMultiplierData[name];
  if (base) {
    return {
      name,
      variable: base.variable,
      enabled: true,
      value: base.defaultValue,
      apply: base.apply,
    }
  }
}


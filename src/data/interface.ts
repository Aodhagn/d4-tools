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
  readonly damageSources: DamageSources;
  readonly playerState: PlayerState;
  readonly enemyState: EnemyState;
}

export type DamageSources = Record<string, DamageSourceInstance>;

export interface DamageSourceInstance {
  readonly source: DamageSource;
  readonly rank: number;
  readonly canCrit: boolean;
  readonly isCrit: boolean;
  readonly canOP: boolean;
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

type DamageMultiplierType = 'Aspect' | 'Unique' | 'Paragon' | 'Glyph' | 'Skill';

export interface DamageMultiplier {
  readonly name: DamageMultiplierName;
  readonly type: DamageMultiplierType;
  readonly variable: boolean;
  readonly enabled: boolean;
  readonly value: number;
  readonly apply: (prev: number, thisMulti: DamageMultiplier) => number;
}

export interface DamageMultiplierBaseData {
  readonly type: DamageMultiplierType;
  readonly defaultValue: number;
  readonly variable: boolean;
  readonly apply: (prev: number, thisMulti: DamageMultiplier) => number;
}

export type DamageMultiplierDataset = {
  // TODO: make this non-optional once all values are defined
  readonly [key in DamageMultiplierName]: DamageMultiplierBaseData;
}

export const DefaultMultiplierApply = (prev: number, thisMulti: DamageMultiplier) => (prev * thisMulti.value);

export const DamageMultiplierData: DamageMultiplierDataset = {
  // General

  // Aspects
  
  [DamageMultiplierName.Conceited]: {
    type: 'Aspect',
    defaultValue: 1.25,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Edgemasters]: {
    type: 'Aspect',
    defaultValue: 1.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Elements]: {
    type: 'Aspect',
    defaultValue: 1.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Expectant]: {
    type: 'Aspect',
    defaultValue: 1.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.InnerCalm]: {
    type: 'Aspect',
    defaultValue: 1.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Retribution]: {
    type: 'Aspect',
    defaultValue: 1.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Adaptability]: {
    type: 'Aspect',
    defaultValue: 1.8,
    variable: true,
    apply: DefaultMultiplierApply,
  },

  // Uniques

  [DamageMultiplierName.StarlessSkies]: {
    type: 'Unique',
    defaultValue: 1.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Grandfather]: {
    type: 'Unique',
    defaultValue: 2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BanishedLordsTalisman]: {
    type: 'Unique',
    defaultValue: 1.6,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.FistsOfFate]: {
    type: 'Unique',
    defaultValue: 2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.GodslayerCrown]: {
    type: 'Unique',
    defaultValue: 1.6,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Paingorgers]: {
    type: 'Unique',
    defaultValue: 3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.PenitentGreaves]: {
    type: 'Unique',
    defaultValue: 1.15,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.TibaultsWill]: {
    type: 'Unique',
    defaultValue: 1.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },

  // Necromancer

  // Aspects

  [DamageMultiplierName.Blighted]: {
    type: 'Aspect',
    defaultValue: 2.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodSeekers]: {
    type: 'Aspect',
    defaultValue: 1.25,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Cadaverous]: {
    type: 'Aspect',
    defaultValue: 1.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Damned]: {
    type: 'Aspect',
    defaultValue: 1.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Decay]: {
    type: 'Aspect',
    defaultValue: 1.45,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.GraspingVeins]: {
    type: 'Aspect',
    defaultValue: 1.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Reanimation]: {
    type: 'Aspect',
    defaultValue: 1.4,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Serration]: {
    type: 'Aspect',
    defaultValue: 1.4,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Splintering]: {
    type: 'Aspect',
    defaultValue: 1.6,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.UntimelyDeath]: {
    type: 'Aspect',
    defaultValue: 1.6,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.UnyieldingCommander]: {
    type: 'Aspect',
    defaultValue: 2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodGetters]: {
    type: 'Aspect',
    defaultValue: 1.21,
    variable: true,
    apply: DefaultMultiplierApply,
  },

  // Uniques


  [DamageMultiplierName.BlackRiver]: {
    type: 'Unique',
    defaultValue: 2.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodMoonBreeches]: {
    type: 'Unique',
    defaultValue: 1.7,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodlessScream]: {
    type: 'Unique',
    defaultValue: 2.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.HowlFromBelow]: {
    type: 'Unique',
    defaultValue: 1.4,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.MutilatorPlate]: {
    type: 'Unique',
    defaultValue: 1.7,
    variable: true,
    apply: DefaultMultiplierApply,
  },

  // Paragon

  [DamageMultiplierName.CultLeader]: {
    type: 'Paragon',
    defaultValue: 2.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.HulkingMonstrosity]: {
    type: 'Paragon',
    defaultValue: 2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.FleshEater]: {
    type: 'Paragon',
    defaultValue: 1.4,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BoneGraft]: {
    type: 'Paragon',
    defaultValue: 1.08,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodBegetsBlood]: {
    type: 'Paragon',
    defaultValue: 1.3,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.BloodBath]: {
    type: 'Paragon',
    defaultValue: 1.35,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Wither]: {
    type: 'Paragon',
    defaultValue: 1.5,
    variable: true,
    apply: DefaultMultiplierApply,
  },

  // Glyphs

  [DamageMultiplierName.Abyssal]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Amplify]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Control]: {
    type: 'Glyph',
    defaultValue: 1.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Corporeal]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Deadraiser]: {
    type: 'Glyph',
    defaultValue: 1.15,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Desecration]: {
    type: 'Glyph',
    defaultValue: 1.2,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Dominate]: {
    type: 'Glyph',
    defaultValue: 1.12,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Essence]: {
    type: 'Glyph',
    defaultValue: 1.22,
    variable: false,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Exploit]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Golem]: {
    type: 'Glyph',
    defaultValue: 1.25,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Gravekeeper]: {
    type: 'Glyph',
    defaultValue: 1.18,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Abyssal]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Revenge]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Sacrificial]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
  [DamageMultiplierName.Scourge]: {
    type: 'Glyph',
    defaultValue: 1.1,
    variable: true,
    apply: DefaultMultiplierApply,
  },
}

export const initializeMultiplier = (name: DamageMultiplierName): DamageMultiplier | undefined => {
  const base = DamageMultiplierData[name];
  if (base) {
    return {
      name,
      type: base.type,
      variable: base.variable,
      enabled: true,
      value: base.defaultValue,
      apply: base.apply,
    }
  }
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
  readonly canCrit: boolean;
  readonly canOP: boolean;
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
    canCrit: true,
    canOP: true,
    additiveDamagePredicates: {
      ...DefaultAdditiveDamagePredicates,
      ...VersusAdditiveDamagePredicates,
    },
    multiplierPredicates: {
      [DamageMultiplierName.Conceited]: AlwaysTrue,
      [DamageMultiplierName.Essence]: cxt => cxt.isCrit && !cxt.enemyState.isHealthy,
      // [DamageMultiplierName.Essence]: AlwaysTrue,
    },
  }
];




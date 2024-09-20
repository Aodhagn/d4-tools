# D4 Calc

This is the source code for [d4-tools.aodhagan.link](https://d4-tools.aodhagan.link/)

This calculator is intended to be data-driven, the data for skills, multipliers, and interactions is soft-coded so that it can be easily updated or even extracted into separate files. Ideally this allows it to be updated to reflect the actual state of the game, any interactions that should work but are broken can be configured as such so that the calculations are as accurate as possible.

# Development

Read [DEVELOPMENT.md](https://github.com/Aodhagn/d4-tools/blob/main/DEVELOPMENT.md)

# Contributing

You don't need much (or any) coding knowledge to contribute data to the calculator, you just need to follow the format for the data!

If you have some experience with Git, feel free to pull the repo and add your contributions in a PR.

If you don't have experience with Git, feel free to send me your contributions in a text file via Discord to `.aodhagan`. I'll make sure to credit you in the commit!

## Multipliers

Multipliers are stored in the `DamageMultiplierData` object in [/src/data/interface.ts](https://github.com/Aodhagn/d4-tools/blob/main/src/data/interface.ts#L257). Names and labels are stored in the `DamageMultiplierName` enum.

### Add the multiplier name

To add a new multiplier first add its name to the `DamageMultiplierName` enum. 

The format is pretty simple: `key = 'label',` 
- `key` is the key used in code to reference the multiplier, it should be the multiplier name with no spaces
- `'label'` is the human readable name of the multiplier that will be displayed on the site, surrounded in single quotes `'`
- Don't forget the `,` at the end!

Example: `BanishedLordsTalisman = 'BanishedLordsTalisman',`

### Add the multiplier data

Example: 

```
[DamageMultiplierName.BanishedLordsTalisman]: {
  type: 'Unique',
  defaultValue: 1.6,
  variable: true,
  apply: DefaultMultiplierApply,
},
```

- In the first line, replace `BanishedLordsTalisman` with the key you added when adding the name above
- In the second line after `type`, put the type of multiplier
  - Valid values: `Aspect`, `Unique`, `Paragon`, `Glyph`
- For `defaultValue`, input a sensible default value for the multiplier
  - This is a decimal value, for example for a 30% multiplier you would put `1.3`
  - For a multipler that can only have one value, put that value
  - For multipliers that can roll different values (like certain aspects), put the max value
    - Don't put a value that is only achievable on a 2h or amulet
- For `variable` put `true` if the value can be different (like for aspects), or `false` if it is always constant
- The `apply` field is more complicated
  - When in doubt, put `DefaultMultiplierApply`
    - This value is applicable for any multiplier that just applies its value as-is to your damage
  - If the multiplier value depends on the context (i.e. how much main stat or some other affix the player has), you will need a custom function
    - If this is the case, see the "Custom Multiplier Apply functions" in the Advanced section
    - This requires some basic coding knowledge

## Skills and Damage Sources

### Schema

```
DamageSource: 
{
  name: string;
  baseDamage: number;
  hasRanks: boolean;
  canCrit: boolean;
  canOP: boolean;
  additiveDamagePredicates: InteractionPredicates;
  multiplierPredicates: InteractionPredicates;
}
```

- `name` is obviously the name of the damage source, i.e. skill name
- `baseDamage` is the damage dealt (rank 1 if applicable) in terms of weapon damage, in decimal format
  - Can typically be pulled from the tooltip
- `hasRanks` is true if the damage source is a skill with ranks, false otherwise
- `canCrit` and `canOP` are self explanatory, true or false
- `additiveDamagePredicates` and `multiplierPredicates` are complex objects that store the interactions between the damage source and any damage modifiers

```
InteractionPredicates:
{
  {key}: {predicate test}
}
```

- The `{key}` is any value in the `DamageType` enum (additive damage) or `DamageMultiplierName` enum
- The `{predicate test}` is a function that returns true or false if the damage modifier should be applied given the context

### Example

```
{
  name: 'Bone Splinters',
  baseDamage: 0.09,
  hasRanks: true,
  canCrit: true,
  canOP: true,
  additiveDamagePredicates: {
    [DamageType.damage]: AlwaysTrue,
    [DamageType.vulnDamage]: cxt => cxt.enemyState.isVuln,
  },
  multiplierPredicates: {
    [DamageMultiplierName.Conceited]: cxt => cxt.playerState.hasBarrier,
    [DamageMultiplierName.Essence]: cxt => cxt.isCrit && !cxt.enemyState.isHealthy,
  },
}
```

### How to add a damage source

- First find the correct array to add the damage source, there are separate arrays for each class
  - If an array doesn't exist for your class, add it!
- Add a new item in the array with the above `DamageSource` schema
  - Most fields should be pretty straight forward except for the predicates
- For the predicates
  - Rule of thumb is that if a damage modifier could never apply to the damage source, don't add a predicate
    - For example, if the damage source is a DOT don't add predicates for crit based modifiers as they will always be false
    - If the damage source is fire damage, don't add predicates for cold damage
  - If the damage modifier will always apply to the damage source, you can use the named `AlwaysTrue` predicate function
  - Otherwise you will need to specify a custom predicate function
    - See the "Custom Predicate functions" section below

# Advanced

## Custom Multiplier Apply functions

This function allows the calculator to handle dynamic multipliers, i.e. ones that scale based on some value outside the multiplier itself.

An example would be the Wither glyph:

> Your Shadow damage over time effects have a 5%[x] chance to deal 50%[x] bonus damage each time they deal damage. This chance is increased by 1%[x] and bonus damage is increased by 4%[x] for each 60 Intelligence you have, up to 1,200 Intelligence.

The base multiplier damage is 50%, but it increases the more intelligence the player has.

The function signature is this:
```
(prev: number, context: CalculatorData, thisMulti: DamageMultiplier) => number;
```

- `prev` is the damage value without the given multiplier applied (note: these apply functions are chained, so `prev` might not have all other multipliers applied yet)
- `context` is the `CalculatorData` object, which contains all player state, attributes, etc.
- `thisMulti` is the multiplier being applied, has all necessary properties like the multiplier value (if applicable)
- The function returns the damage value after applying the multiplier

For the Wither glyph example above, the apply function would look like this:
```
(prev: number, context: CalculatorData, thisMulti: DamageMultiplier) => prev * Math.min((1.5 + (0.04 * (context.attributes.int / 60))), 2.3)
```

## Custom Predicate functions

- A predicate function has one parameter, the `PredicateContext`, and returns a boolean
- The `PredicateContext` is a union of 2 objects: 
  - `CalculatorData`, containing all the player state, attributes, additive damage values, enemyState etc
  - `DamageSourceInstance`, all the `DamageSource` fields except for the predicates, added fields indicating if the hit is a crit or OP
- The function should return true if the damage modifier should apply to the damage source, or false otherwise

### Example

```
// For Essence Glyph, which only applies to crits against enemies that are not healthy
cxt => cxt.isCrit && !cxt.enemyState.isHealthy

// For Conceited glyph, which only applies if the player has a barrier
cxt => cxt.playerState.hasBarrier
```

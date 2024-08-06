import { Autocomplete, Grid, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { DamageMultiplier, DamageMultiplierName, initializeMultiplier } from "../../../data/interface";
import { updateMultiplier } from "../calculatorSlice";
import { MultiplierView } from "./multiplierView";

export const MultiplierSectionView = () => {
  const { damageSources, damageMultipliers } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const relevantMultipliers = new Set<DamageMultiplierName>();

  for (const damageSource of Object.values(damageSources)) {
    for (const multiplier in damageSource.source.multiplierPredicates) {
      relevantMultipliers.add(multiplier as DamageMultiplierName);
    }
  }

  const unselectedMultipliers = [...relevantMultipliers].filter(multiplier => !damageMultipliers[multiplier])

  const handleSelection = (selection: DamageMultiplierName | null) => {
    console.log(selection);
    if (selection) {
      const multiplier = initializeMultiplier(selection);
      if (multiplier) {
        dispatch(updateMultiplier({[selection]: multiplier}));
      } else {
        console.log(`Error: no multiplier found for ${selection}`);
      }
    } else {
      console.log(`Error: missing selection`);
    }
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h5'>Multipliers</Typography></Grid>
      
      {Object.values(damageMultipliers).map(multiplier => (
        <MultiplierView {...multiplier} key={multiplier.name}/>
      ))}
      
      <Grid item xs={12}>
        {unselectedMultipliers.length === 0 &&
          <Autocomplete 
            id='multiplier-selector'
            disabled
            options={unselectedMultipliers}
            renderInput={(params) => <TextField {...params} label='Select a damage source first' />}
            value={null}
            blurOnSelect
            onChange={((e, newValue) => handleSelection(newValue))} />
        }
        {unselectedMultipliers.length > 0 &&
          <Autocomplete 
            id='multiplier-selector'
            options={unselectedMultipliers}
            renderInput={(params) => <TextField {...params} label='Select a multiplier' />}
            value={null}
            blurOnSelect
            onChange={((e, newValue) => handleSelection(newValue))} />
        }
      </Grid>
    </Grid>
  )
}
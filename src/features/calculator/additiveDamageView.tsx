import { Grid, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DamageType } from "../../data/interface";
import { updateAdditiveDamage } from "./calculatorSlice";

export const AdditiveDamageView = () => {
  const { damageSources, additiveDamage } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const relevantAdditives = new Set<DamageType>();

  for (const damageSource of damageSources) {
    for (const additive in damageSource.source.additiveDamagePredicates) {
      relevantAdditives.add(additive as DamageType);
    }
  }

  const onChange = (additive: DamageType, value: string) => {
    console.log(`${additive}: ${value}`);
    if (!isNaN(Number(value)) && +value >= 0) {
      dispatch(updateAdditiveDamage({[additive]: Number(value)}));
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant='h5'>Additive Damage</Typography>
      </Grid>
      {relevantAdditives.size === 0 &&
        <Typography variant='subtitle1'>Select a damage source first</Typography>
      }
      {[...relevantAdditives].map(additive => (
        <Grid item xs={4} key={additive}>
          <TextField 
              id={additive}
              value={additiveDamage[additive] || 0}
              label={additive}
              onChange={((e) => onChange(additive, e.target.value))} />
        </Grid>
      ))}
    </Grid>
  )
}
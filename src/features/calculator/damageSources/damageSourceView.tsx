import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DamageSourceInstance } from "../../../data/interface";
import { updateDamageSourceInstance } from "../calculatorSlice";
import { calculateDamage } from "./damageCalculator";

// export interface DamageSourceViewProps {
//   readonly damageSource: DamageSourceInstance;
// }

export const DamageSourceView = (props: DamageSourceInstance) => {
  const calculatorData = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const estimatedDamage = Math.ceil(calculateDamage(props, calculatorData));

  const onCheckboxChange = (property: 'isCrit' | 'isOP', checked: boolean) => {
    dispatch(updateDamageSourceInstance({
      ...props,
      [property]: checked,
    }));
  }

  return (
    <Grid item xs={12} key={props.source.name}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h5'>
            {props.source.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1'>
            {`Estimated damage per hit: ${estimatedDamage}`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel 
              control={<Checkbox checked={props.isCrit} onChange={(e) => onCheckboxChange('isCrit', e.target.checked)} disabled={!props.canCrit} />}
              label={'Critical Hit'} />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel 
              control={<Checkbox checked={props.isOP} onChange={(e) => onCheckboxChange('isOP', e.target.checked)} disabled={!props.canOP} />}
              label={'Overpower'} />
        </Grid>
      </Grid>
    </Grid>
  )
}
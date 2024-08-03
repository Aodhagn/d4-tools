import { Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { DamageMultiplier } from "../../../data/interface";
import { updateMultiplier } from "../calculatorSlice";
import { convertDisplayToMulti, convertMultiToDisplay } from "../damageSources/damageCalculator";

export const MultiplierView = (props: DamageMultiplier) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(new String(convertMultiToDisplay(props.value)));
  
  const onChangeValue = (value: string) => {
    console.log(`${value}`);
    if (!isNaN(Number(value)) && +value >= 0) {
      dispatch(updateMultiplier({[props.name]: {
        ...props,
        value: convertDisplayToMulti(value),
      }}))
    } else {
      setValue(convertMultiToDisplay(props.value))
    }
  }

  return (
    <Grid item xs={6}>
      <Grid item xs={12}><Typography variant='subtitle1'>{props.name}</Typography></Grid>
      <Grid item xs={12}>
        <TextField 
            id={`${props.name}-value`}
            disabled={!props.variable}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={((e) => onChangeValue(e.target.value))} />
      </Grid>
    </Grid>
  )
}
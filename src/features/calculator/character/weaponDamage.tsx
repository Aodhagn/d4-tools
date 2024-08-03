import { Grid, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateWeaponDamage } from "../calculatorSlice";

export const WeaponDamage = () => {
  const { weaponDamage } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const onInputChange = (value: string) => {
    if (!isNaN(Number(value)) && +value >= 0) {
      dispatch(updateWeaponDamage(+value));
    }
  }

  return (
    <Grid item xs={12}>
      <TextField 
          id='weaponDamage'
          value={weaponDamage}
          label='Weapon Damage'
          onChange={(e) => onInputChange(e.target.value)} />
    </Grid>
  )
}
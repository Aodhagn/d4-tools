import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { EnemyState } from "../../../data/interface";
import { updateEnemyState } from "../calculatorSlice";
import { StateView } from "./stateView";

export const EnemyStateView = () => {
  const { enemyState } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const onChange = (property: string, checked: boolean) => {
    if (enemyState.hasOwnProperty(property)) {
      dispatch(updateEnemyState({ ...enemyState, [property]: checked }))
    }
  }

  const properties = Object.keys(enemyState);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h5'>Enemy State</Typography></Grid>
      {Object.keys(enemyState).map((property) => (
        <StateView 
            key={property}
            checked={enemyState[property as keyof EnemyState]}
            name={property}
            onChange={onChange} />
        // <Grid item xs={3} key={property}>
        //   <FormControlLabel 
        //       control={<Checkbox checked={enemyState[property as keyof EnemyState]} onChange={(e) => onChange('isVuln', e.target.checked)} />}
        //       label='Vulnerable' />
        // </Grid>
      ))}
    </Grid>
  )
}
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DamageSourceInstance } from "../../../data/interface";
import { calculateDamage } from "./damageCalculator";

// export interface DamageSourceViewProps {
//   readonly damageSource: DamageSourceInstance;
// }

export const DamageSourceView = (props: DamageSourceInstance) => {
  const calculatorData = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const estimatedDamage = Math.ceil(calculateDamage(props, calculatorData));

  return (
    <Grid item xs={12} key={props.source.name}>
      <Typography variant='h5'>
        {props.source.name}
      </Typography>
      <Typography variant='subtitle1'>
        {`Estimated damage per hit: ${estimatedDamage}`}
      </Typography>
    </Grid>
  )
}
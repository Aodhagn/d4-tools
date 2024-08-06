import { Checkbox, FormControlLabel, Grid } from "@mui/material";

export interface StateViewProps {
  readonly checked: boolean;
  readonly name: string;
  readonly onChange: (name: string, checked: boolean) => void;
}

export const StateView = (props: StateViewProps) => (
  <Grid item xs={3}>
    <FormControlLabel 
        control={<Checkbox checked={props.checked} onChange={(e) => props.onChange(props.name, e.target.checked)} />}
        label={labels[props.name]} />
  </Grid>
);

const labels: Record<string, string> = {
  // Player states
  hasBarrier: 'Has Barrier',

  // Enemy states
  isVuln: 'Vulnerable',
  isClose: 'Close',
  isHealthy: 'Healthy'
}
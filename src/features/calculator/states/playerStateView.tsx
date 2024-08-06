import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { PlayerState } from "../../../data/interface";
import { updatePlayerState } from "../calculatorSlice";
import { StateView } from "./stateView";

export const PlayerStateView = () => {
  const { playerState } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const onChange = (property: string, checked: boolean) => {
    console.log(property)
    if (playerState.hasOwnProperty(property)) {
      dispatch(updatePlayerState({ ...playerState, [property]: checked }))
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h5'>Player State</Typography></Grid>
      {Object.keys(playerState).map(property => (
        <StateView 
            key={property}
            checked={playerState[property as keyof PlayerState]}
            name={property}
            onChange={onChange} />
      ))}
    </Grid>
  )
}
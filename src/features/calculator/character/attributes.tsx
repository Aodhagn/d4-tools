import { Container, Grid, InputLabel, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { updateAttributes } from "../calculatorSlice";

export const Attributes = () => {
  const { attributes } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const onAttributeChange = (attribute: string, value: string) => {
    if (!isNaN(Number(value)) && +value >= 0) {
      dispatch(updateAttributes({
        ...attributes,
        [attribute]: +value,
      }));
    }
  }

  return (
    <>
      {/* <InputLabel id='strength'>Strength</InputLabel> */}
      <Grid item xs={6}>
        <TextField 
            id='strength'
            value={attributes.str}
            label='Strength'
            onChange={(e) => onAttributeChange('str', e.target.value)} />
      </Grid>

      {/* <InputLabel id='intelligence'>Intelligence</InputLabel> */}
      <Grid item xs={6}>
        <TextField 
            id='intelligence'
            value={attributes.int}
            label='Intelligence'
            onChange={(e) => onAttributeChange('int', e.target.value)} />
      </Grid>

      {/* <InputLabel id='dexterity'>Dexterity</InputLabel> */}
      <Grid item xs={6}>
        <TextField 
            id='dexterity'
            value={attributes.dex}
            label='Dexterity'
            onChange={(e) => onAttributeChange('dex', e.target.value)} />
      </Grid>

      {/* <InputLabel id='willpower'>Willpower</InputLabel> */}
      <Grid item xs={6}>
        <TextField 
            id='willpower'
            value={attributes.will}
            label='Willpower'
            onChange={(e) => onAttributeChange('will', e.target.value)} />
      </Grid>
    </>
  )
}
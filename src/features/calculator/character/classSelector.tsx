import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { CharacterClass } from "../../../data/interface";
import { selectClass } from "../calculatorSlice";

export const ClassSelector = () => {
  const { characterClass } = useAppSelector(state => state.calculator);
  const dispatch = useAppDispatch();

  const onSelect = (selected: string) => {
    if (Object.values(CharacterClass).includes(selected as CharacterClass)) {
      dispatch(selectClass(selected as CharacterClass));
    } else {
      console.log(`Invalid class selected: ${selected}`);
    }
  }

  return (
    <Grid item xs={12}>
      <InputLabel id='character-class'>Class</InputLabel>
      <Select
          labelId='character-class'
          id='character-class'
          value={characterClass}
          label='Class'
          onChange={(e) => onSelect(e.target.value)} >

        {Object.values(CharacterClass).map(className =>(
          <MenuItem key={className} value={className}>{className}</MenuItem>
        ))}
      </Select>
    </Grid>
  );
}
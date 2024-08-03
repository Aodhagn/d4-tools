import { Autocomplete, Container, Grid, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { CharacterClass, DamageSource } from "../../../data/interface";
import { addDamageSource } from "../calculatorSlice";
import { DamageSourceView } from "./damageSourceView";

export const DamageSources = () => {
  const { damageSources, characterClass } = useAppSelector(state => state.calculator);
  const { data } = useAppSelector(state => state.appData); 
  const dispatch = useAppDispatch();
  console.log(characterClass)
  console.log('DamageSources')
  console.log(damageSources);
  console.log(data.commonDamageSources)
  console.log(data.necromancerDamageSources);

  let classDamageSources: DamageSource[] = [];
  switch(characterClass) {
    case CharacterClass.Necro:
      console.log("Found necro")
      classDamageSources = [...data.necromancerDamageSources];
      break;
  }
  console.log(classDamageSources)
  const availableDamageSources = [...data.commonDamageSources, ...classDamageSources].filter(val => (
    damageSources.findIndex(source => source.source.name === val.name) === -1
  ));

  const handleSelection = (selection: string | null) => {
    console.log(selection);
    if (selection) {
      const source = availableDamageSources.find(source => source.name === selection);
      if (source) {
        dispatch(addDamageSource(source));
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant='h5'>Damage Sources</Typography></Grid>
      {damageSources.map(source => 
        <DamageSourceView {...source} key={source.source.name}/>  
      )}
      <Grid item xs={12}>
        <Autocomplete 
          id='damage-source-selector'
          options={availableDamageSources.map(source => source.name)}
          renderInput={(params) => <TextField {...params} label='Damage Source' />}
          value={null}
          blurOnSelect
          onChange={((e, newValue) => handleSelection(newValue))} />
      </Grid>
    </Grid>
  )
}
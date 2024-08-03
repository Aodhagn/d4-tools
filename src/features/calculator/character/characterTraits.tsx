import { Container, Grid } from "@mui/material"
import { Attributes } from "./attributes"
import { ClassSelector } from "./classSelector"
import { WeaponDamage } from "./weaponDamage"

export const CharacterTraits = () => {
  return (
    <Grid container spacing={2} className='character-traits-container'>
      <ClassSelector />
      <Attributes />
      <WeaponDamage />
    </Grid>
  )
}
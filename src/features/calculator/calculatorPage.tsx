import { Container, FormControl } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { refreshAppData } from "../../data/dataSlice"
import { AsyncWrapper } from "../async"
import { AdditiveDamageView } from "./additiveDamageView"
import { CharacterTraits } from "./character/characterTraits"
import { DamageSources } from "./damageSources"
import { EnemyStateView } from "./states/enemyStateView"
import { MultiplierSectionView } from "./multipliers"
import { PlayerStateView } from "./states/playerStateView"

export const CalculatorPage  = () => {
  const { loadStatus } = useAppSelector(state => state.appData);
  const dispatch = useAppDispatch();

  return (
    <Container className='calculator-page-container'>
      <AsyncWrapper 
          status={loadStatus}
          shouldInitialize={true}
          asyncAction={() => {
            dispatch(refreshAppData());
          }} >
        <FormControl>
          <CharacterTraits />
          <DamageSources />
          <PlayerStateView />
          <EnemyStateView />
          <AdditiveDamageView />
          <MultiplierSectionView />
        </FormControl>
      </AsyncWrapper>
    </Container>
  )
}
import { Viewport } from './components/viewport'
import { useSettings } from './hooks/useSettings'
import { Grid } from './components/grid'
import { Player } from './components/player'

export function App() {
  const [settings, setSettings] = useSettings()
  const { isInverted } = settings

  return (
    <Grid className="viewport" templateRows="1fr auto">
      <Grid templateCols="1fr auto 1fr">
        <Player name={isInverted ? settings.p2 : settings.p1} isFirst />
        <div style={{ width: '1rem', }} />
        <Player name={isInverted ? settings.p1 : settings.p2} />
      </Grid>
      <div>buttons</div>
    </Grid>
  )
}

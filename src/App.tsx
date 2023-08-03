import { Viewport } from './components/viewport'
import { Layout } from './components/layout'
import { useSettings } from './hooks/useSettings'
import { Grid } from './components/grid'
import { Player } from './components/player'

export function App() {
  const [settings, setSettings] = useSettings()
  const { isInverted } = settings

  console.log(settings)

  const topGrid = (
    <Grid templateCols="1fr auto 1fr">
      <Player name={isInverted ? settings.p2 : settings.p1} isFirst />
      <div style={{ width: '1rem', }} />
      <Player name={isInverted ? settings.p1 : settings.p2} />
    </Grid>
  )

  return (
    <Viewport>
      <Layout
        className="blacken"
        top={topGrid}
        bot={<div>bot</div>}
      />
    </Viewport>
  )
}

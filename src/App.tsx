import { Control } from './components/Control'
import { Grid } from './components/Grid'

const App = () => (
  <>
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid />
    </div>
    <Control />
  </>
)

export default App

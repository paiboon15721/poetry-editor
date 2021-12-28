import { observer } from 'mobx-react-lite'
import { store } from './store'

const buildInitialValues = (n: number) => Array(n * n).fill('x')

store.setVs(buildInitialValues(10))

const Box: React.FC<{
  i: number
}> = observer(({ i }) => {
  return (
    <input
      style={{
        width: '25px',
        height: '25px',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
      ref={store.refs[i]}
      value={store.vs[i]}
      onKeyDown={x => {
        console.log('keydown', x)
      }}
      onChange={x => {
        store.setV(i, x.target.value)
      }}
      onFocus={() => {
        store.refs[i].current?.select()
      }}
      onClick={() => {
        store.refs[i].current?.select()
      }}
      maxLength={1}
    />
  )
})

const Grid: React.FC = () => {
  return (
    <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
      {store.vs.map((_, i) => (
        <span key={i}>
          <Box i={i} />
          {(i + 1) % store.sqrt === 0 && <br />}
        </span>
      ))}
    </div>
  )
}

const App = () => {
  return <Grid />
}

export default App

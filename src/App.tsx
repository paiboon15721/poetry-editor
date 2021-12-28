import { observer } from 'mobx-react-lite'
import { store } from './store'

const buildInitialValues = (n: number) => Array(n * n).fill('')

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
        const strategies: { [key in string]: () => void } = {
          ArrowRight: () => store.select(i + 1),
          ArrowLeft: () => store.select(i - 1),
          ArrowUp: () => store.select(i - store.sqrt),
          ArrowDown: () => store.select(i + store.sqrt),
        }
        const func = strategies[x.code]
        if (func) {
          func()
        }
      }}
      onChange={x => {
        store.setV(i, x.target.value)
      }}
      onFocus={() => {
        store.select(i)
      }}
      onClick={() => {
        store.select(i)
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

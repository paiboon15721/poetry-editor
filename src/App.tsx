import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { store } from './store'

const Box: React.FC<{
  i: number
}> = observer(({ i }) => (
  <input
    style={{
      width: '15px',
      height: '15px',
      textAlign: 'center',
      textTransform: 'uppercase',
      border: 0,
    }}
    ref={store.refs[i]}
    value={store.vs[i]}
    onKeyDown={x => {
      const strategies: { [key in string]: () => void } = {
        ArrowLeft: () => store.moveLeft(),
        ArrowRight: () => store.moveRight(),
        ArrowUp: () => store.moveUp(),
        ArrowDown: () => store.moveDown(),
      }
      const func = strategies[x.code]
      if (func) {
        func()
      }
    }}
    onChange={x => {
      store.setV(x.target.value)
    }}
    onClick={() => {
      store.select(i)
    }}
    maxLength={1}
  />
))

const Grid: React.FC = () => (
  <div
    style={{
      overflow: 'auto',
      whiteSpace: 'nowrap',
      border: '1px solid black',
    }}
  >
    {store.vs.map((_, i) => (
      <Fragment key={i}>
        <Box i={i} />
        {(i + 1) % store.sqrt === 0 && <br />}
      </Fragment>
    ))}
  </div>
)

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
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        opacity: 0.2,
      }}
    >
      <button>import</button>
      <button>export</button>
      <button
        onClick={() => {
          if (window.confirm('Are you sure?')) {
            store.clear()
          }
        }}
      >
        clear
      </button>
    </div>
  </>
)

export default App

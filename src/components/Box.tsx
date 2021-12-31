import { observer } from 'mobx-react-lite'
import { store } from '../store'

export const Box: React.FC<{
  i: number
}> = observer(({ i }) => (
  <input
    style={{
      width: '15px',
      height: '15px',
      textAlign: 'center',
      transform: `rotate(${store.dg}deg)`,
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
        ControlLeft: () => store.changeDeg(),
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

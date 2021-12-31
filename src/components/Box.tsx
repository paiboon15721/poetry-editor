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
      transform: `rotate(${store.vs[i].dg}deg)`,
      border: 0,
    }}
    ref={store.refs[i]}
    value={store.vs[i].v}
    onKeyDown={x => {
      const strategies: { [key in string]: () => void } = {
        ArrowLeft: () => store.moveLeft(x.shiftKey),
        ArrowRight: () => store.moveRight(x.shiftKey),
        ArrowUp: () => store.moveUp(x.shiftKey),
        ArrowDown: () => store.moveDown(x.shiftKey),
        Space: () => store.changeDg(),
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

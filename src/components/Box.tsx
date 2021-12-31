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
    value={store.vs[i].v || ''}
    onKeyDown={x => {
      store.onKeyDown(x.key, x.shiftKey)
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

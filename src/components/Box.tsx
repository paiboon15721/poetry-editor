import { store } from '../store'

export const Box: React.FC<{
  i: number
}> = ({ i }) => (
  <input
    style={{
      width: '15px',
      height: '15px',
      textAlign: 'center',
      border: 0,
    }}
    ref={store.refs[i]}
    onKeyDown={e => {
      store.onKeyDown(e)
    }}
    onChange={e => {
      store.setV(e.target.value)
    }}
    onClick={() => {
      store.select(i)
    }}
    maxLength={1}
  />
)

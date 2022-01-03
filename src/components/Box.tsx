import { store } from '../store'

export const Box: React.FC<{
  i: number
}> = ({ i }) => (
  <input
    style={{
      caretColor: 'transparent',
      width: '15px',
      height: '15px',
      textAlign: 'center',
      border: 0,
    }}
    ref={store.refs[i]}
    onKeyDown={e => {
      store.onKeyDown(e)
    }}
    onClick={() => {
      store.select(i)
    }}
    maxLength={1}
  />
)

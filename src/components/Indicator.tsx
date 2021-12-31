import { observer } from 'mobx-react-lite'
import { store } from '../store'

export const Indicator: React.FC = observer(() => (
  <>
    <span>{store.dg}</span>
    <span style={{ display: 'inline-block', width: '15px' }}>
      {store.drArrow}
    </span>
  </>
))

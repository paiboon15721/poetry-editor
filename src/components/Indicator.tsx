import { observer } from 'mobx-react-lite'
import { store } from '../store'

export const Indicator: React.FC = observer(() => {
  return <span>{store.dg}</span>
})

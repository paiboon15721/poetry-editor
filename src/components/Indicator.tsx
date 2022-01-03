import { store } from '../store'

export const Indicator: React.FC = () => (
  <>
    <span>{store.dg}</span>
    <span style={{ display: 'inline-block', width: '15px' }}>
      {store.drArrow}
    </span>
  </>
)

import { useEffect, useReducer } from 'react'
import { store } from '../store'

export const Indicator: React.FC = () => {
  const [, notify] = useReducer(x => x + 1, 0)

  useEffect(() => {
    store.setIndicatorNotify(notify)
  }, [])

  return (
    <>
      <span>{store.dg}</span>
      <span style={{ display: 'inline-block', width: '15px' }}>
        {store.drArrow}
      </span>
    </>
  )
}

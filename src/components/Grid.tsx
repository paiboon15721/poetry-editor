import { Fragment, useEffect } from 'react'
import { store } from '../store'
import { Box } from './Box'

export const Grid: React.FC = () => {
  useEffect(() => {
    store.setVsToRefs()
  }, [])

  return (
    <div
      style={{
        overflow: 'auto',
        whiteSpace: 'nowrap',
        border: '1px solid black',
      }}
    >
      {store.refs.map((_, i) => (
        <Fragment key={i}>
          <Box i={i} />
          {(i + 1) % store.sqrt === 0 && <br />}
        </Fragment>
      ))}
    </div>
  )
}

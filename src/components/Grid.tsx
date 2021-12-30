import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { store } from '../store'
import { Box } from './Box'

export const Grid: React.FC = observer(() => (
  <div
    style={{
      overflow: 'auto',
      whiteSpace: 'nowrap',
      border: '1px solid black',
    }}
  >
    {store.vs.map((_, i) => (
      <Fragment key={i}>
        <Box i={i} />
        {(i + 1) % store.sqrt === 0 && <br />}
      </Fragment>
    ))}
  </div>
))

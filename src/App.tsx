import { range } from 'lodash'

const Box: React.FC<{ x: string }> = ({ x }) => (
  <input
    style={{
      width: '25px',
      height: '25px',
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
    onKeyDown={x => {
      console.log('xx', x)
    }}
    maxLength={1}
  />
)

const Grid: React.FC<{ n: number }> = ({ n }) => {
  const renderGrid = (n: number) =>
    range(n * n).map(x => (
      <>
        <Box x="x" />
        {(x + 1) % n === 0 && <br />}
      </>
    ))

  return (
    <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
      {renderGrid(n)}
    </div>
  )
}

const App = () => <Grid n={10} />

export default App

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

const Grid: React.FC<{ xs: string[] }> = ({ xs }) => {
  return (
    <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
      {xs.map((x, i) => (
        <span key={i}>
          <Box x="x" />
          {(i + 1) % Math.sqrt(xs.length) === 0 && <br />}
        </span>
      ))}
    </div>
  )
}

const App = () => {
  const buildInitialValues = (n: number) => Array(n * n).fill('')
  return <Grid xs={buildInitialValues(10)} />
}

export default App

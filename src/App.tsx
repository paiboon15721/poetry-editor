import { observer, useLocalObservable } from 'mobx-react-lite'
import { createRef, RefObject, useEffect, useRef } from 'react'

const buildInitialValues = (n: number) => Array(n * n).fill('x')

const Box: React.FC<{
  childRef: RefObject<HTMLInputElement>
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}> = observer(({ childRef, value, onChange }) => {
  return (
    <input
      style={{
        width: '25px',
        height: '25px',
        textAlign: 'center',
        textTransform: 'uppercase',
      }}
      ref={childRef}
      value={value}
      onKeyDown={x => {
        console.log('keydown', x)
      }}
      onChange={onChange}
      onFocus={() => {
        childRef.current?.select()
      }}
      onClick={() => {
        childRef.current?.select()
      }}
      maxLength={1}
    />
  )
})

const Grid: React.FC = observer(() => {
  const xs = useLocalObservable(() => buildInitialValues(10))
  const refs = useRef<RefObject<HTMLInputElement>[]>([])
  useEffect(() => {
    refs.current = refs.current.slice(0, xs.length)
  }, [xs])

  return (
    <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
      {xs.map((x, i) => {
        refs.current[i] = createRef()
        return (
          <span key={i}>
            <Box
              childRef={refs.current[i]}
              value={x}
              onChange={x => {
                xs[i] = x.target.value
              }}
            />
            {(i + 1) % Math.sqrt(xs.length) === 0 && <br />}
          </span>
        )
      })}
    </div>
  )
})

const App = () => {
  return <Grid />
}

export default App

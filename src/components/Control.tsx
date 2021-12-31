import { useRef } from 'react'
import { store } from '../store'
import { Indicator } from './Indicator'

export const Control: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null)

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        opacity: 0.5,
      }}
    >
      <Indicator />
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files?.length) {
            store.import(e.target.files[0])
          }
        }}
      />
      <button
        onClick={() => {
          fileInput?.current?.click()
        }}
      >
        import
      </button>
      <button
        onClick={() => {
          store.export()
        }}
      >
        export
      </button>
      <button
        onClick={() => {
          if (window.confirm('Are you sure?')) {
            store.clear()
          }
        }}
      >
        clear
      </button>
    </div>
  )
}

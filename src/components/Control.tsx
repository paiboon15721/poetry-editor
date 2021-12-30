import { store } from '../store'

export const Control: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        opacity: 0.5,
      }}
    >
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={e => {
          if (e.target.files?.length) {
            store.import(e.target.files[0])
          }
        }}
      />
      <button>import</button>
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

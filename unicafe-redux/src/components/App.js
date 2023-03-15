import React from 'react'

const App = ({ store }) => (
  <div>
    <div>
      <button onClick={e => store.dispatch({type: 'GOOD'})}>
        good
      </button>
      <button onClick={e => store.dispatch({type: 'OK'})}>
        ok
      </button>
      <button onClick={e => store.dispatch({type: 'BAD'})}>
        bad
      </button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>
        reset stats
      </button>
    </div>
    <p>
      Good: {store.getState().good}
    </p>
    <p>
      Ok: {store.getState().ok}
    </p>
    <p>
      Bad: {store.getState().bad}
    </p>
  </div>
)

export default App
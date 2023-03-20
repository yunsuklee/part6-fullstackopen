import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdoteReducer', () => {
  const newAnecdote = {
    content: 'Hello World!',
    id: 1,
    votes: 0,
  }

  test('returns new state with action ADD_VOTE', () => {
    const state = [newAnecdote]
    const action = {
      type: 'ADD_VOTE',
      payload: { id: 1 }
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState[0]).toHaveProperty('votes', 1)
  })

  test('returns new state with action CREATE_NEW', () => {
    const state = []
    const action = {
      type: 'CREATE_NEW',
      payload: { newAnecdote }
    }
    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toHaveLength(1)
  })
})
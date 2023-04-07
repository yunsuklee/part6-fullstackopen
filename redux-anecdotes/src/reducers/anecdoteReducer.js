import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    mapAnecdotes(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    sortAnecdotes(state) {
      state.sort((a, b) => b.votes - a.votes)
    }
  }
})

export const {
  mapAnecdotes,
  setAnecdotes,
  sortAnecdotes,
  appendAnecdote,
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes())
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(sortAnecdotes())
  }
}

export const voteAnecdote = anecdoteToVote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const votedAnecdote = await anecdoteService.vote(changedAnecdote)
    
    dispatch(mapAnecdotes(votedAnecdote))
    dispatch(sortAnecdotes())
  }
}

export default anecdoteSlice.reducer
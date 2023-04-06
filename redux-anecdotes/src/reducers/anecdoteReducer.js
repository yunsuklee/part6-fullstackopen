import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    sortAnecdotes(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {...anecdoteToVote}
      votedAnecdote.votes += 1

      return state.map(
        a => a.id !== id ? a : votedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload).sort((a, b) => b.votes - a.votes)
    }
  }
})

export const {
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
  }
}

export const voteAnecdote = anecdoteToVote => {
  return async dispatch => {
    const changedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    const votedAnecdote = await anecdoteService.vote(changedAnecdote)
    
    dispatch(sortAnecdotes(votedAnecdote.id))
  }
}

export default anecdoteSlice.reducer
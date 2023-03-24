import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdote'
import { setAnecdotes } from '../reducers/anecdoteReducer'

import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'
import Notification from './Notification'
import Filter from './Filter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(a => dispatch(setAnecdotes(a)))
  }, [dispatch])
  
  return (
    <div>
      <Notification />
      <h2>AnecdotesList</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}


export default App
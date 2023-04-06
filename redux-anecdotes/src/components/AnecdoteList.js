import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <li>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </li>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') return anecdotes

    const regex = new RegExp(filter, 'gi')

    return anecdotes.filter(a => a.content.match(regex))
  })
  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setMessage(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(setMessage(''))
    }, 5000)
  }

  return (
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVote(anecdote)}
        />
      )}
    </ul>
  )
}

export default AnecdoteList
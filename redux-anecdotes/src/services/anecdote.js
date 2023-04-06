import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (votedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
  return response.data
}

const anecdoteService = {
  getAll,
  createNew,
  vote,
}

export default anecdoteService
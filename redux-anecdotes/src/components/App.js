import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'
import Filter from './Filter'
import Notification from './Notification'

const App = () => (
  <div>
    <Notification />
    <h2>AnecdotesList</h2>
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
  </div>
)


export default App
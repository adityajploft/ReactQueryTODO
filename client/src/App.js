import { useQuery } from '@tanstack/react-query'
import './App.css'
import Home from './components/Home'

function App() {
  // In usequery two parameter 1 is Dependency([:key example 'todo' is key and '[ ]' is dependancy  of list ] , callbacks function   )
  const { data , status , isFetching } = useQuery(['todo'], async () =>
    (await fetch('http://localhost:8000/todo')).json()
  )
  console.log('data', data)
  if(isFetching){
    return <h1>Loding...</h1>
  }
  return (
    <div className="App">
      <p>status:{status}</p>
      <Home />
      {data &&
        data.data &&
        data.data.map((index, element) => 
        <li>{index.title}</li>
        )}
    </div>
  )
}

export default App

import React from 'react'
import { useState } from 'react'
import { useMutation , QueryClient, useQueryClient} from '@tanstack/react-query'
// what is Mutation  when u create or update anything on server called mutation.

const createTodo = (text) => {
  return () =>
    fetch('http://localhost:8000/todo/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: text }),
    })
}

const Home = () => {
  const [text, setText] = useState()
  const queryClient = useQueryClient()
  // In this first called function in this case:1 createTodo is function , second callback function
  const todoMutation = useMutation(createTodo(text), {
    onSuccess: () => {
      console.log('success')
      queryClient.invalidateQueries(['todo'])
      
    },
    onError: () => {
      console.log('Error')
    },
  })
  return (
    <>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
      />
      <button onClick={(e) => todoMutation.mutate()}>Create</button>
    </>
  )
}

export default Home

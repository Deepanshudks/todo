import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './component/CreateTodo'
import { Todos } from './component/Todos'



function App() {
  const [todo, setTodo] = useState([])
  
  useEffect( () => {
   fetch("http://localhost:3000/todos")
   .then(async (res)=>{
     const todo = await res.json()
     setTodo(todo)
   })
  }, [])
  
  return (
    <>
    <div className="flex justify-center flex-col items-center bg-zinc-200 w-full h-full">
    <CreateTodo/>
    <Todos todos={todo}/>
    </div>
    </>
  )
}

export default App

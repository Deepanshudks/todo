
export function Todos({todos}){
   
    return <div className="flex m-4">
    {
        todos.map((todos)=>{
            return (
                <div className="card m-2 bg-[#e5e5e5]">
                <h3 className="text-light m-2 ">{todos.title}</h3>
                <h4 className="text-light m-2 ">{todos.description}</h4>
                <button className="bg-blue-500 text-white hover:rounded-full rounded-xl mt-2 p-1 px-4">{todos.completed? "Completed": "Mark as Completed"}</button>
        
                </div>
            )
        })

   }
   </div>
}
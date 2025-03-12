import { useState } from "react";

export default function CreateTodo (){
    const [loading,setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const onClickHandler = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:3000/todo",{
            method: "POST",
            body : JSON.stringify ({
            title: title,
            description: description
        }),
            Headers : {
                "Content-type" : "application/json"
            }
        })
       console.log(await response.json())

    }
    return (
    <>
    <div className="flex flex-col justify-center w-80 ">
        <label className="mt-2" htmlFor="title"> Title</label>
        <input className="px-3" type="text" onChange={(e)=>{
            const value = e.target.value;
            setTitle(value);
        }} id="title" name="title" placeholder="Title" />
        <label className="mt-2" htmlFor="description"> Description</label>
        <input className="px-3" onChange={(e)=>{
            const value = e.target.value;
            setDescription(value);
        }} type="text" id="description" placeholder="Description" name="description" />
        <button className="border text-white  rounded-lg p-2 bg-blue-500 mt-4 " onClick={onClickHandler}> Create Todo </button>
    </div>
    </>
    )
}

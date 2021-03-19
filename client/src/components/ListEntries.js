import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button'
import EditEntries from "./EditEntries"

const ListEntries = () =>{

const [entries, setEntries] = useState([]);

    
const getList = async () => {
    const res = await fetch("http://localhost:5000/timer");
    let data = await res.json()
    setEntries(data);
    };

useEffect(()=>{
    getList()  
},[])

const deleteEntry = async (e) =>{
    e.preventDefault();
    let id = e.target.id;
   try{
        await fetch(`http://localhost:5000/timer/${id}`, {
        method: "DELETE"
    });
   } catch(err){
       console.error(err.message)
   };

    getList()
}



return (
        
<table className="table">
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Sunrise</th>
      <th scope="col">Song</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
   
    {entries.map(entry=>(
    <tr key={entry.id}>
      <td>{entry.day}</td>
      <td>{entry.sunrise}</td>
      <td>{entry.description}</td>
      <td><EditEntries entry={entry}/></td>
      <td><Button id={entry.id} variant="danger" onClick={deleteEntry}>Delete</Button></td>
    </tr>
    ))}
  </tbody>
</table>     
  )
}

export default ListEntries;

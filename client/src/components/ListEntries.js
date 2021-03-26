import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button'
import EditEntries from "./EditEntries"
import moment from "moment"

const ListEntries = () =>{

const [entries, setEntries] = useState([]);

    
const getList = async () => {
    const res = await fetch("/timer");
    let data = await res.json()
    console.log(data[0])
    //日本時間で入力→ポスグレ内で記録→呼び出されるときにUTC表記になり一日前になるのを、もう一度ローカル時間表記にする。
     for (let obj of data){
     obj.day = moment(obj.day).format()
    }
    setEntries(data);
    };

useEffect(()=>{
    getList()  
},[])

const deleteEntry = async (e) =>{
    e.preventDefault();
    let id = e.target.id;
   try{
        await fetch(`/timer/${id}`, {
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
      <td>{entry.day.substring(0, entry.day.indexOf("T"))}</td>
      {/* <td>{(new Date(entry.day).substring(0, new Date(entry.day).indexOf("T"))}</td> */}
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

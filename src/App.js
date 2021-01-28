import React,{useState,useEffect} from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [foodName,setFoodName]=useState('');
  const [foodList,setFoodList]=useState([]);
  const [newFoodName,setNewFoodName]= useState('');
  const [days,setDays] = useState(0);
  const [reload,setreload] = useState(true);

  useEffect(() => {
    Axios.get(' http://localhost:5000/api/foods/read').then((response)=>{
      setFoodList(response.data)
    })
   
  }, [reload])

  const changereload= ()=>{
    setreload(!reload)
  }
  const addToList=()=>{
    Axios.post(' http://localhost:5000/api/foods/insert',{
      foodName:foodName,
      daysSinceAte:days})
      .then(res=>{  
        console.log(res)
        changereload()
      }).catch(err=>console.log(err))
  }
  const updateToList=(id)=>{
    Axios.put(' http://localhost:5000/api/foods/update',{
      id:id,
      foodName:foodName,

  }).then(res=>{  
    console.log(res)
    changereload()
  }).catch(err=>console.log(err))
  }
  const deleteFromList=(id)=>{
    Axios.delete(`http://localhost:5000/api/foods/delete/${id}`).then(res=>{  
      console.log(res)
      changereload()
    }).catch(err=>console.log(err))
    }


  return (
    <div className="App">
     <h1>CRUD APP with mern</h1>
     <label>Food Name:</label>
     <input type="text"  onChange={(event)=>{setFoodName(event.target.value)}}/>
     <label>Days Since you ate it:</label>
     <input type="number" onChange={(event)=>{setDays(event.target.value)}}/>
     <button onClick={addToList}>Add to list</button>

     <h1>Food List</h1>
     {foodList.map((val,key)=>{
       return <div key={key} className="food"><h1>{val.foodName}</h1>
       <h1>{val.daysSinceAte}</h1>
       <input type="text" placeholder="foodname ..." onChange={(event)=>{setFoodName(event.target.value)}}/>
       <button onClick={()=>updateToList(val._id)}>Update</button>
       <button  onClick={()=>deleteFromList(val._id)}>Delete</button>
       </div>
     })}
    </div>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [employee,setEmployee] = useState([]);
   useEffect(()=>{
    fetch("/home").then((res)=>{
      if(res.ok){
        console.log(res);
        return res.json();
      }
      else{
        return console.log("error in fetching date");
      }
    })
    .then((response)=>{
      console.log(response);
      setEmployee(response.employee)
    })
   },[])
   return (
    <>
       {
        employee.map((value,index) => {
          return(
            <>
               <li>Name: {value.name}</li>
            </>
          );
        })
       }
    </>
  );
}

export default App;

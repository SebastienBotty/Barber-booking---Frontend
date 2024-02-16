import React,{useState,useEffect} from 'react'
import './appointmentSchedule'
import { convertDecimalToTime } from '../../utilityFunctions'

function AppointmentSchedule() {

    const barbers= [{name:"Joey"},
                    {name:"Bobby"},
                    {name:"Michael"}
                ]
    const firstClient = 9 // In hours
    const lastClient= 18 // In hours
    const intervalTime = 0.5 // In hours
    const breakTime= 12 // In hours
   

    const [appointmentTime, setAppointmentTime] = useState([])

    

    useEffect(() => {

        const createIntervals = (start,end,interval)=>{
            const temporaryInterval= []
            for ( let i = start; i <=end;i +=interval){
                (i == breakTime)? console.log("rien"): temporaryInterval.push(i)
            }
            console.log(temporaryInterval + "Temporaire")
            
            const formatedTime =temporaryInterval.map(convertDecimalToTime)
            console.log(formatedTime)
            setAppointmentTime(formatedTime)
        }

        createIntervals(firstClient,lastClient,intervalTime)
    
      return () => {
    
      }
    }, [])
    

  return (
   <> 
    
      {appointmentTime.map((time,index)=>{
        
        return (
            <li key={index}>{time}</li>
        )
      })}
    </>
  )
}

export default AppointmentSchedule
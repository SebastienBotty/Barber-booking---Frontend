import React,{useState,useEffect} from 'react'
import './barberSchedule'
import { convertDecimalToTime } from '../../utilityFunctions/utilityFunctions'
import DateContext from '../../screens/appointment/appointment'

function BarberSchedule(props) {

    const {barberName,dateAppointment} = props.value



   
                    
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
            //console.log(temporaryInterval + "Temporaire")
            
            const formatedTime =temporaryInterval.map(convertDecimalToTime)
            //console.log(formatedTime)
            setAppointmentTime(formatedTime)
        }

        console.log(barberName + " + " + dateAppointment)
        createIntervals(firstClient,lastClient,intervalTime)
    
      return () => {
    
      }
    }, [dateAppointment])
    

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

export default BarberSchedule
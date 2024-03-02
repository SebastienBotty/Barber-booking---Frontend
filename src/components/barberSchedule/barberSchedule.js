import React,{useState,useEffect} from 'react'
import './barberSchedule'
import { convertDecimalToTime,createDateFromTimeString,resetSecondsAndMs } from '../../utilityFunctions/dates'
import DateContext from '../../screens/appointment/appointment'

import './barberSchedule.css'

function BarberSchedule(props) {

    const {barberName,dateAppointment,selectAppointmentToBook,confirmedBooking} = props.value
    
    const firstClient = 9 // In hours
    const lastClient= 17.5 // In hours and decimal
    const intervalTime = 0.75 // In decimal    0.5= 30min
    const breakTime= 12 // In hours
   
    const [appointmentTime, setAppointmentTime] = useState([])
    const [bookedAppointments, setbookedAppointments] = useState([])

    const isDateBooked = (dateToCompare) =>{
        const test = bookedAppointments.find(appointment=> new Date(appointment.date).toString() === new Date(dateToCompare).toString() )
        return test? true: false
    }    

    const bookAppointment = (dateToBook)=>{
      selectAppointmentToBook({barberName:barberName,date:dateToBook})
  
    }
    //Check the time to disable ppl from booking an already passed time
    const isTimePassed = (time) => {
      const now = new Date().toISOString()
 
      if (new Date(time).toISOString() < now){
        return true
      }
      return false

    }


    useEffect(() => {

        const createIntervals = (start,end,interval)=>{
            const temporaryInterval= []
            for ( let i = start; i <=end;i +=interval){
                (i == breakTime)? console.log("rien"): temporaryInterval.push(i)
            }
            
            const formatedTime =temporaryInterval.map(convertDecimalToTime)
            setAppointmentTime(formatedTime)
        }

        const fetchAppointments = async (barberName,date) => {
            try {
              const response = await fetch('http://localhost:3000/api/appointment/barber/'+ barberName + "/date/" + date);
              if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
              }
              const jsonData = await response.json();
              setbookedAppointments(jsonData);
              //console.log( barberName + ':' + jsonData)

            } catch (error) {
              console.error('Une erreur s\'est produite:', error);
            }
          }
        


        createIntervals(firstClient,lastClient,intervalTime)
        fetchAppointments(barberName,dateAppointment)
    
      return () => {
    
      }
    }, [dateAppointment,confirmedBooking])
    

  return (
   <div className='barberSchedule'> 
      <ul>
        <h4>{barberName}</h4>
        {appointmentTime.map((time,index)=>{  

          return (isDateBooked(createDateFromTimeString(dateAppointment,time)) || isTimePassed(createDateFromTimeString(dateAppointment,time)))?
          (<li className= "Book-interval-booked"   key={index} tabIndex={0}></li>)
          :
          (<li className= "Book-interval" onClick={()=>{
            bookAppointment(createDateFromTimeString(dateAppointment,time))}} key={index} tabIndex={0}>{time}</li>)

        })}
      </ul>
    </div>
  )
}

export default BarberSchedule
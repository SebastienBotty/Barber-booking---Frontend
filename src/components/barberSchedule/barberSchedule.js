import React,{useState,useEffect} from 'react'
import './barberSchedule'
import { convertDecimalToTime,createDateFromTimeString } from '../../utilityFunctions/dates'
import DateContext from '../../screens/appointment/appointment'

import './barberSchedule.css'

function BarberSchedule(props) {

    const {barberName,dateAppointment} = props.value



                    
    const firstClient = 9 // In hours
    const lastClient= 18 // In hours
    const intervalTime = 0.5 // In hours
    const breakTime= 12 // In hours
   

    const [appointmentTime, setAppointmentTime] = useState([])

    const [bookedAppointments, setbookedAppointments] = useState([])


    const isDateBooked = (dateToCompare) =>{
      
        /*   if ( barberName==="Michael"){
              console.log("COMPARER : " + dateToCompare)
              console.log(new Date(dateToCompare).toISOString())
              console.log("----------------")

            
          } */ 
          const test = bookedAppointments.find(appointment=> new Date(appointment.date).toISOString() === new Date(dateToCompare).toISOString() )
          if (test){
            console.log("RDV BOOKED:"+ bookedAppointments[0].date)
            console.log(dateToCompare + ' EST DEJA PRIS')
          }

          return test? true: false
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
              console.log( barberName + ':' + jsonData)

            } catch (error) {
              console.error('Une erreur s\'est produite:', error);
            }
          }
        


        createIntervals(firstClient,lastClient,intervalTime)
        fetchAppointments(barberName,dateAppointment)
    
      return () => {
    
      }
    }, [dateAppointment])
    

  return (
   <> 
    
      {appointmentTime.map((time,index)=>{  

        return isDateBooked(createDateFromTimeString(dateAppointment,time))?
         (<li className= "Book-interval-booked" key={index}>{time}</li>)
         :
         (<li className= "Book-interval" key={index}>{time}</li>)

      })}
      
      
    </>
  )
}

export default BarberSchedule
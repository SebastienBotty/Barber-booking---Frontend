import React,{useState,useEffect} from 'react'
import './barberSchedule'
import { convertDecimalToTime,createDateFromTimeString,convertHourToDecimal } from '../../utilityFunctions/dates'

import './barberSchedule.css'

function BarberSchedule(props) {

    const {barberName,dateAppointment,selectAppointmentToBook,confirmedBooking} = props.value
    
     
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

        const createIntervals = (start,end,interval,breakTime,breakDuration)=>{
            const temporaryInterval= []

            for ( let i = start; i <=end;i +=interval){
              if (breakTime){
                if (i >=breakTime && i <(breakTime + breakDuration)){
                  i = breakTime + breakDuration
                }
                temporaryInterval.push(i)
              }else{
                  temporaryInterval.push(i)
                }
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

          const fetchShopInfos = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/shopInfos/')
                if (!response.ok){

                    throw new Error('Erreur lors de la récupération des données');
                }
                const jsonData = await response.json()
                console.log(jsonData)
                let opening = (convertHourToDecimal(jsonData.openingTime.opening))    //In hours and Demical => 11h45 = 11.75
                let closing = (convertHourToDecimal(jsonData.openingTime.closing))    //same
                let appointmentDuration = (jsonData.appointmentDuration/60)           // In decimal 45min = 0.75
                let isBreak                                                           //In hours and demical
                let breakDuration                                                     //In hours and demical
                if (jsonData.lunch.time){
                    isBreak=(convertHourToDecimal(jsonData.lunch.time))             
                    breakDuration =(jsonData.lunch.duration/60)  
                }
                createIntervals(opening,closing,appointmentDuration,isBreak,breakDuration)


            }
            catch (err) {
                console.error('Une erreur s\'est produite:', err);
            }
        }
        

        fetchShopInfos()
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
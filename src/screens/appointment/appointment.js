import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'

import AppointmentSchedule from '../../components/appointmentSchedule/appointmentSchedule'

import './appointment.css'



function Appointment() {

    const [selecTedDate, setSelectedDate] = useState(new Date())

    const handleClickDay= (date)=>{
            console.log(date)
            setSelectedDate(date)

      }

      useEffect(() => {
        setSelectedDate(new Date())
      
        return () => {
        }
      }, [])
      
  return (
    <>
        <header><Calendar onClickDay={(value,event)=>handleClickDay(value)}/></header>
        <main><AppointmentSchedule/></main>
    </>    
  )
}

export default Appointment
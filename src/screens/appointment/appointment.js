import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'

import BarberSchedule from '../../components/barberSchedule/barberSchedule'

import './appointment.css'



function Appointment() {

    const [selectedDate, setSelectedDate] = useState(new Date())
    
    const [barbers, setBarbers] = useState([])


    const handleClickDay= (date)=>{
            //console.log(date)
            setSelectedDate(date)

      }

      useEffect(() => {
      
        const fetchBarbers = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/barber/');
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const jsonData = await response.json();
            setBarbers(jsonData);
          } catch (error) {
            console.error('Une erreur s\'est produite:', error);
          }
        }

        setSelectedDate(new Date())
        fetchBarbers()

        return () => {
        }
      }, [])
      
  return (
    <>
        <header><Calendar onClickDay={(value,event)=>handleClickDay(value)}/></header>
          <main>
              {barbers.map((barber)=>{
                return (
                  <>
                    <ul key={barber.name}>{barber.name}</ul>
                    <BarberSchedule value={{barberName :barber.name,dateAppointment:selectedDate}}/>
                  </>
                )
              })}
          </main>
    </>    
  )
}

export default Appointment
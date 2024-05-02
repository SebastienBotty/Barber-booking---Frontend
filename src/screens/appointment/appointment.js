import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'


import BarberSchedule from '../../components/barberSchedule/barberSchedule'
import AppointmentConfirmation from '../../components/appointmentConfirmation/appointmentConfirmation';


import './appointment.css'
import './calendar.css'



function Appointment() {

    const today= new Date()
    today.setHours(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    const [selectedDate, setSelectedDate] = useState(today)
    const [barbers, setBarbers] = useState([])
    const [appointmentToBook, setAppointmentToBook] = useState(null)
    const [confirmedBooking, setConfirmedBooking] = useState(false) // Swap everytime a booking is confirmed to refresh barberSchedule component, value has no meaning
    const [closedDays, setClosedDays] = useState([])

    const closedDayss = 1

    const handleClickDay= (date)=>{
      console.log(date)
      setSelectedDate(date)
      
    }

    const changeAppointmentToBook = (date) =>{
      setAppointmentToBook(date)
    }

    const refreshScheduleOnConfirmedBooking = () =>{
      setConfirmedBooking(!confirmedBooking)
    }

    const tileDisabled = ({ date, view }) => {
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate()-1)
      // Désactiver les dates passées
      if (date < yesterday) {
        return true;
      }
      if(closedDays.includes(date.getDay())){
        return true
      }

      return false;
    };

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

        const fetchClosedDays = async ()=>{
          try{
            const response = await fetch("http://localhost:3000/api/shopInfos/closed-days")
            if (!response.ok){
              throw new Error('Erreur lors de la récupération des données');
            }
            const jsonData = await response.json();
            console.log(jsonData)
            setClosedDays(jsonData)
           
          }catch(err){

          }
        }
        
        fetchClosedDays()
        fetchBarbers()

        return () => {
        }
      }, [])
      
  return (
    <div className='appointment-page'>
      
        <div className='left-side'>
          <div className='left-side-centered-div'>
            <Calendar 
            onClickDay={(value,event)=>handleClickDay(value)} 
            tileDisabled={tileDisabled}
            id="calendar"/>
          </div>
        </div>
        <div className="center-div">
          <div className='schedule-display'>
                {barbers.map((barber)=>{
                  return (
                    <>
                      <BarberSchedule value={{barberName :barber.name,dateAppointment:selectedDate,selectAppointmentToBook:changeAppointmentToBook,confirmedBooking:confirmedBooking}}/>
                    </>
                  )
                })}
          </div>
        </div>  
        <div className='right-side'>

          {appointmentToBook&&
          <AppointmentConfirmation appointmentInfos={appointmentToBook} confirmedBooking={refreshScheduleOnConfirmedBooking}/>}
          
        </div>
    </div>    
  )
}

export default Appointment
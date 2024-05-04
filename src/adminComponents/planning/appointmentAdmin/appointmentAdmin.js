import React,{useState,useEffect} from 'react'
import Calendar from 'react-calendar'



import AppointmentConfirmationAdmin from './appointmentConfirmationAdmin/appointmentConfirmationAdmin'
import BarberScheduleAdmin from './barberScheduleAdmin/barberScheduleAdmin'


import '../../../screens/appointment/appointment.css'
import '../../../screens/appointment/calendar.css'



function AppointmentAdmin() {

    const today= new Date()
    today.setHours(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    const [selectedDate, setSelectedDate] = useState()
    const [barbers, setBarbers] = useState([])
    const [appointmentToBook, setAppointmentToBook] = useState(null)
    const [confirmedBooking, setConfirmedBooking] = useState(false) // Swap everytime a booking is confirmed to refresh barberSchedule component, value has no meaning
    const [closedDays, setClosedDays] = useState([])



    const handleClickDay= (date)=>{
      console.log(date)
      setSelectedDate(date)
      
    }

    const changeAppointmentToBook = (date) =>{
      setAppointmentToBook(date)
      console.log(date)
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
              id="calendar"
              />
          </div>
          
        </div>
        <div className="center-div">
          {selectedDate?
            <> 
            <div className='schedule-display'>
              {barbers.map((barber)=>{
                return (
                  <>
                    <BarberScheduleAdmin value={{barberName :barber.name,dateAppointment:selectedDate,selectAppointmentToBook:changeAppointmentToBook,confirmedBooking:confirmedBooking}}/>
                  </>
                )
              })}
            </div>
            </>
            :
            <div id='select-date-msg'>Sélectionnez une date</div>
           }
        </div>  
        <div className='right-side'>

          {appointmentToBook&&
          <AppointmentConfirmationAdmin appointmentInfos={appointmentToBook} confirmedBooking={refreshScheduleOnConfirmedBooking} />}
          
        </div>
    </div>    
  )
}

export default AppointmentAdmin
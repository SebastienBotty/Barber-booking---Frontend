import React,{useState,useEffect} from 'react'
import './barberSchedule'
import { convertDecimalToTime } from '../../utilityFunctions/dates'
import DateContext from '../../screens/appointment/appointment'

function BarberSchedule(props) {

    const {barberName,dateAppointment} = props.value



   
                    
    const firstClient = 9 // In hours
    const lastClient= 18 // In hours
    const intervalTime = 0.5 // In hours
    const breakTime= 12 // In hours
   

    const [appointmentTime, setAppointmentTime] = useState([])

    const [appointmentsBarber, setAppointmentsBarber] = useState([])


    

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

        const fetchAppointments = async (barberName,date) => {
            try {
              const response = await fetch('http://localhost:3000/api/appointment/barber/'+ barberName + "/date/" + date);
              if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
              }
              const jsonData = await response.json();

              if (Object.keys(jsonData).length>0){
                setAppointmentsBarber(jsonData);
                console.log(jsonData)



              }
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
        
        return (
            <li className= "Book-interval" key={index}>{time}</li>
        )
      })}
      
      
    </>
  )
}

export default BarberSchedule
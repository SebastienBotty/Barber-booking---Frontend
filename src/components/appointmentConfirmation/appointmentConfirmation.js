import React,{useState} from 'react'

import "./appointmentConfirmation.css"
import { formatTimeText } from '../../utilityFunctions/dates'
import { errorMsgHandler } from '../../utilityFunctions/errorAPIHandler'

function AppointmentConfirmation(props) {
  const {barberName,date} = props.appointmentInfos
  const confirmedBooking = props.confirmedBooking
  const [clientName, setClientName] = useState('')
  const [loading, setloading] = useState(false)

 
   
  const confirmBooking = (e) => {
    e.preventDefault()
    postAppointmentInDB()
  }

  const postAppointmentInDB = async () =>{
    const postData={
      barberName:barberName,
      clientName:clientName,
      date: date
    }
    setloading(true)
    try {
      const response = await fetch('http://localhost:3000/api/appointment', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
        body: JSON.stringify(postData) 
      });
  
      if (!response.ok) {
        const responseData = await response.json(); // Extraire les données JSON de la réponse
        console.log(responseData)
        errorMsgHandler(responseData.message)                                                                                                /*  TODO
                                                                                                  
                                                                                                  Afficher le message d'erreur */
        setTimeout(()=>setloading(false),1000)
        throw new Error(`Erreur lors de la requête: ${response.status}`);
      }
  
      const responseData = await response.json(); // Extraire les données JSON de la réponse
      console.log('Réponse:', responseData);
      setTimeout(()=>{
        setloading(false)
        confirmedBooking()
      },1000)

      return true
    } catch (error) {
      // Gérer les erreurs en les capturant dans le bloc catch
      console.error(error.message);
    }
  }

  return (
    <div className='booking-summary'>
      <section>
        <h2>Réservation</h2>
        <div className='booking-infos'>
          <ul className='list-left-side'>
            <li>Nom:</li>
            <li>Coiffeur:</li>
            <li>Date:</li>
          </ul>
        
          <ul className='list-right-side'>
            <li>{clientName? clientName: "Guest"}</li>
            <li>{barberName}</li>
            <li>{formatTimeText(new Date(date).toString()).date}</li>
            <li>{formatTimeText(new Date(date).toString()).hour}</li>

          </ul>
        </div>
      </section>
      <footer className='booking-summary-footer'>
        <form onSubmit={(e)=>confirmBooking(e)}>
          <input type='text' required value={clientName} placeholder='Nom de la réservation' onChange={(e)=>{setClientName(e.target.value)}}/>
          <div className='centered-div'>
            {loading?
              <div className='spinner'></div>
              :
              <button type='submit' className="confirm-button" > CONFIRMER</button>
              }
          </div>
        </form>
       </footer>
    </div>
  )
}

export default AppointmentConfirmation
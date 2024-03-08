import React,{useState,useEffect} from 'react'
import { CheckmarkCircleOutline,AlertCircleOutline } from 'react-ionicons'

import { formatTimeText } from '../../utilityFunctions/dates'
import { errorMsgHandler } from '../../utilityFunctions/errorAPIHandler'

import "./appointmentConfirmation.css"


function AppointmentConfirmation(props) {
  const {barberName,date} = props.appointmentInfos
  const confirmedBooking = props.confirmedBooking
  const [clientName, setClientName] = useState('')
  const [status, setStatus] = useState('progressing')
  const [errorMsg, setErrorMsg] = useState('')

 
   
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
    setStatus('loading')
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
        setErrorMsg(errorMsgHandler(responseData.message))        
        setTimeout(() => {
          setStatus("error")

        }, 1000);
        console.log("setStatus false")
        /*  TODO
                                                                                                  
                                                                                                  Afficher le message d'erreur */
        throw new Error(`Erreur lors de la requête: ${response.status}`);
      }
  
      const responseData = await response.json(); // Extraire les données JSON de la réponse
      console.log('Réponse:', responseData);
      setTimeout(()=>{
        setStatus("success")
        confirmedBooking()
      },1000)

      return true
    } catch (error) {
      // Gérer les erreurs en les capturant dans le bloc catch
      console.error(error.message);
    }
  }

  useEffect(() => {
    
    setStatus('progressing')
 
  }, [barberName,date])
  

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
          {!(status=="success" || status=="error")&&<input type='text' className='input-field'required value={clientName} placeholder='Nom de la réservation' onChange={(e)=>{setClientName(e.target.value)}}/>}
          <div className='centered-bottom-div'>
            {(status == 'progressing')&& <button type='submit' className="confirm-button" > CONFIRMER</button>}
            {(status == "loading")&& <div className='spinner'></div>}
            {(status == "success")&& 
              <div className='confirmed-booking'>
                <div className='confirmed-booking-ionIcons'>
                  <CheckmarkCircleOutline
                    color={'#638064'} 
                    height="1.75rem"
                    width="1.75rem"
                  />
                </div>
                <div className='confirmed-booking-text-container'>
                  Rendez-vous confirmé.
                </div>
              </div>}
            {(status =="error")&&
              <div className='error-booking'>
                <div className='error-booking-ionIcons'>
                  <AlertCircleOutline
                      color={'#6E3434'} 
                      height="1.75rem"
                      width="1.75rem"
                    />
                  </div>
                  <div className='error-booking-text-container'>
                    {errorMsg}
                  </div>
                </div>}
            
          </div>
        </form>
       </footer>
    </div>
  )
}

export default AppointmentConfirmation
import React,{useState,useEffect} from 'react'
import { CheckmarkCircleOutline,AlertCircleOutline } from 'react-ionicons'

import { formatTimeText } from '../../../../utilityFunctions/dates'
import { errorPostAppointmentHandler } from '../../../../utilityFunctions/errorAPIHandler'

import "../../../../components/appointmentConfirmation/appointmentConfirmation.css"
import "./appointmentConfirmationAdmin.css"

import LoadingSpinner from '../../../../components/loadingSpinner/loadingSpinner'


function AppointmentConfirmationAdmin(props) {
  const {barberName,date,isEdit,clientToEdit,appointmentId} = props.appointmentInfos
  const confirmedBooking = props.confirmedBooking
  const [clientName, setClientName] = useState(clientToEdit?clientToEdit:"")
  const [status, setStatus] = useState('progressing')
  const [errorMsg, setErrorMsg] = useState('')

 
   
  const confirmBooking = (e) => {
    setStatus('loading')
    postAppointmentInDB()
  }

  const deleteBooking = async ()=>{
    setStatus('loading')
    console.log(appointmentId)
    try{
      const response = await fetch('http://localhost:3000/api/appointment/delete/'+appointmentId , {
        method:"DELETE"
      })
      if (!response.ok){
        throw new Error(response.text())
      }
      const jsonData = await response.json()
      setTimeout(() => {
        setStatus("success")

      }, 500);
      confirmedBooking()
    }catch(err){
      setStatus('error')
      console.error(err.message)
    }

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
        setErrorMsg(errorPostAppointmentHandler(responseData.message))        
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
    isEdit?setClientName(clientToEdit):setClientName('') 
  }, [barberName,date,clientToEdit])
  

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
        {isEdit?
        <>
          {(status === 'progressing')&&<button className='delete-button-confirm' onClick={deleteBooking}>Supprimer</button>}
          {(status === "loading")&& <LoadingSpinner/>}
          {(status === "success")&& 
              <div className='confirmed-booking'>
                <div className='confirmed-booking-ionIcons'>
                  <CheckmarkCircleOutline
                    color={'#638064'} 
                    height="1.75rem"
                    width="1.75rem"
                  />
                </div>
                <div className='confirmed-booking-text-container'>
                  Rendez-vous Supprimé.
                </div>
              </div>}
            {(status ==="error")&&
              <div className='error-booking'>
                <div className='error-booking-ionIcons'>
                  <AlertCircleOutline
                      color={'#6E3434'} 
                      height="1.75rem"
                      width="1.75rem"
                    />
                  </div>
                  <div className='error-booking-text-container'>
                    Erreur lors de la suppression
                  </div>
                </div>}
        </>
        
          :
          <form onSubmit={(e)=>confirmBooking(e)}>
          {!(status==="success" || status==="error")&&<input type='text' className='input-field'required value={clientName} placeholder='Nom de la réservation' onChange={(e)=>{setClientName(e.target.value)}}/>}
          <div className='centered-bottom-div'>
            {(status === 'progressing')&& <button type='submit' className="confirm-button" > CONFIRMER</button>}
            {(status === "loading")&& <LoadingSpinner/>}
            {(status === "success")&& 
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
            {(status ==="error")&&
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
          }
        
       </footer>
    </div>
  )
}

export default AppointmentConfirmationAdmin
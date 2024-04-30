import React,{useState,useEffect} from 'react'
import {  Close, EllipsisVertical } from 'react-ionicons'


import './barberDetails.css'
import noProfilePic from '../images/no-profile-pic.png'


function BarberDetails(props) {

  const [barber, setBarber] = useState(props.barber)
  const updateList = props.updateBarbersList
  const toggleEditModal = props.toggleEditModal

  const [stringedSpecialties, setStringedSpecialties] = useState(barber.specialties.join(', '))
  const [confirmDeleteBarber, setConfirmDeleteBarber] = useState(false)

  const deleteBarber = async (req,res) =>{
    
    try{
      const response = await fetch(`http://localhost:3000/api/barber/barberId/${barber._id}`, {
        method: 'DELETE',
      })
      if (!response.ok){
        throw new Error(response.text())
      }
      const jsonData = await response.json()
      console.log(jsonData)
      updateList()
      setConfirmDeleteBarber(false)

    }catch(err){
      console.log(err.message)
    }
  }



  useEffect(() => {
      setBarber(props.barber)
      setStringedSpecialties(props.barber.specialties.join(', '))
    return () => {
    }
  }, [props.barber])
  

  return (
    <section className='barber-details'>
      <div className='options-top'> 
        <div className='options-top-left'>
          <div className='ion-icons'>
            <EllipsisVertical
              color={'#00000'} 
              height="2rem"
              width="2rem"
              onClick={()=>toggleEditModal(props.barber)}
              />
          </div>
          <div className='hidden-msg-info'>Modifier</div>  
        </div>
       
        <div  className='options-top-right'>
          <div className='test'>
            <div className='ion-icons'>
              <Close
                color="red" 
                height="2rem"
                width="2rem"
                onClick={()=>setConfirmDeleteBarber(true)}
                />
            </div>
            <div className='hidden-msg-info'>Supprimer</div>  
          </div>
        </div>
        
      </div>
      <div className='img-container'>
        <img src={barber.photo?barber.photo:noProfilePic} width='100%' height='100%'/>
      </div>
      <div className='barber-details-text-container'>
        {confirmDeleteBarber?
            <>
              <div className='confirm-delete-text'>
                Supprimer {barber.name}?
                </div>  
                <div className='confirm-buttons-zone'>
                  <button className="delete-button" id="cancel-delete" onClick={()=>setConfirmDeleteBarber(false)}>Annuler</button>
                  <button className="delete-button" id="confirm-delete" onClick={()=>deleteBarber()}>Supprimer</button>
                </div>
              </>
            :
            <>
              <div className='barber-name' onClick={()=>console.log(barber.name,barber.specialties)}>{barber.name}</div>
              <div className='barber-specialties'>{stringedSpecialties}</div>
            </>
              }

      </div>
      </section>
    )
}

export default BarberDetails
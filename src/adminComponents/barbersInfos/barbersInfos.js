import React,{useState,useEffect} from 'react'

import BarberDetails from './barberDetails/barberDetails'
import AddBarber from './addBarber/addBarber'
import EditBarber from './editBarber/editBarber'
import './barbersInfos.css'

function BarbersInfos() {

    const [barbers, setBarbers] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [updateList, setUpdateList] = useState(true) //Switch to call useEffect on state change
    
    const [barberDatasEdit, setBarberDatasEdit] = useState({})

    const handleUpdateList = ()=>{
      setUpdateList(!updateList)
      console.log("switched")
    }

    const handleOutsideClick = (event) => {
      if (event.target.id === 'modal') {
        setShowAddModal(false);
        setShowEditModal(false)
      }
    }
    const toggleAddModal = ()=>{
      setShowAddModal(!showAddModal)
    }

    const toggleEditModal = (barberData)=>{
      setBarberDatasEdit(barberData)
      setShowEditModal(!showEditModal)
    }

   

    useEffect(() => {
        const fetchBarbersInfos = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/barber')
                if (!response.ok){
                    throw new Error('Erreur lors de la récupération des données');
                }

                const jsonData = await response.json()
                console.log(jsonData)
                setBarbers(jsonData)
            }
            catch (err) {
                console.error('Une erreur s\'est produite:', err);
            }
        }
        
        fetchBarbersInfos()
      return () => {
        
      }
    }, [updateList])
    
  return (
    <>
      <div className='barber-infos'>
        <div className='add-barber-zone'>
          <button id="btn-add-barber" onClick={()=>toggleAddModal()}> Ajouter coiffeur</button>
        </div>
        <div className='barbers-display-container'>
          {barbers.map(barber=>{
            return (
              <BarberDetails key={barber.name} barber={barber} updateBarbersList={handleUpdateList} toggleEditModal={toggleEditModal}/>
            )
          })}
        </div>
       
      </div>
      {showAddModal && (
        <div className="modal-add-barber" id="modal" onClick={(e)=>handleOutsideClick(e)}>
          <div className="modal-add-barber-content" onClick={()=>null}>
            <AddBarber closeModal={()=>toggleAddModal()} updateBarbersList={handleUpdateList}/>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="modal-add-barber" id="modal" onClick={(e)=>handleOutsideClick(e)}>
          <div className="modal-add-barber-content" onClick={()=>null}>
            <EditBarber barber={barberDatasEdit} closeModal={()=>toggleEditModal()} updateBarbersList={handleUpdateList}/>
          </div>
        </div>
      )}
     
    </>
  )
}

export default BarbersInfos
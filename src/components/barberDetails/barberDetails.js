import React,{useState,useEffect} from 'react'

import './barberDetails.css'


function BarberDetails(props) {

  const barberName= "Michael"
  const [barberSpecialties, setBarberSpecialties] = useState()

  useEffect(() => {
    const fetchBarberSpecialties = async () =>{
      try {
        const response = await fetch(`http://localhost:3000/api/barber/specialties/${barberName}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const jsonData = await response.json();
        setBarberSpecialties(jsonData[0].specialties);
        console.log(jsonData[0].specialties)
      } catch (error) {
        console.error('Une erreur s\'est produite:', error);
      }
    }
  
    fetchBarberSpecialties()
    return () => {
    }
  }, [])
  

  return (
    <section className='booking-summary'>
    {barberSpecialties?
      barberSpecialties.map((specialty,index)=>{
        console.log(specialty)
        return (
          <li key={specialty}>{specialty}</li>
        )
      })
      :
      "slt c bob"}

    </section>
    )
}

export default BarberDetails
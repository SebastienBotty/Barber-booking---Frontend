import React,{useState,useRef} from 'react'

import LoadingSpinner from '../../../components/loadingSpinner/loadingSpinner'
import { errorPostBarberHandler } from '../../../utilityFunctions/errorAPIHandler'
import noProfilePic from '../images/no-profile-pic.png'

import './editBarber.css'

function EditBarber(props) {

    const [image, setImage] = useState(props.barber.photo)
    const [errorMsg, setErrorMsg] = useState('')
    const [specialtie, setSpecialtie] = useState('')
    const [specialties, setSpecialties] = useState(props.barber.specialties)
    const [status, setStatus] = useState('processing')

    const {_id,name} = props.barber

    const fileInputRef = useRef(null)


    const addSpecialtie = (e)=>{
        e.preventDefault()
        setSpecialties(prev => [specialtie,...prev])
        setSpecialtie("")
    }

    const convertToBase64 = (e)=>{
        if (e.target.files[0]){             //Check if a file has been selected
            const reader = new FileReader()
            console.log(e)
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () =>{
                console.log(reader.result)
                setImage(reader.result)
            }
            reader.onerror= error =>{
                console.log("Error:" , error)
            }
        }
        else{
            return false
        }
    }

    const confirmEditBarber = ()=>{
       updateBarber()
    }

    const handleClick = () => {
        fileInputRef.current.click();
     };

    const handleFileChange = (e) => {
        convertToBase64(e)
    };

    const deleteSpecialtie = (specialtieIndex) =>{
        const newSpecialties = [...specialties]
        newSpecialties.splice(specialtieIndex,1)
        setSpecialties(newSpecialties)

    }

    const updateBarber = async () =>{
        
        try {
            const response = await fetch('http://localhost:3000/api/barber/update', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id:_id,
                photo:image,
                barberName:name,
                specialties:specialties
              })
            });
        
            if (!response.ok) {
                console.log(response)
              throw new Error(response.message);
            }
        
            const data = await response.json();
            console.log(data);
            props.updateBarbersList()
            props.closeModal()
          } catch (error) {
            console.error('Erreur lors de la requête :', error);
          }
    }

   
  return (
    <div className='edit-barber'>
        <div className='edit-barber-img-container' >

                <img className="img-barber" src={image?image:noProfilePic} width={"100%"} height={"100%"} onClick={handleClick}/>
    
            <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
        </div>
        <div className='edit-barber-text-container'>
            <div className='edit-infos'>
                <div className='edit-infos-name'>
                    {name}
                </div>

                <form id='edit-specialtie' onSubmit={(e)=>addSpecialtie(e)}>
                    Spécialités:
                    <input id='specialtie-input' type='text' placeholder='Spécialités' value={specialtie} onChange={(e)=>setSpecialtie(e.target.value)}/>
                    <ul className='list-specialties'>
                        {specialties.map((item,index)=>{
                            return (
                                    <li className='list-specialties-item' onClick={()=>deleteSpecialtie(index)}key={item}>{item}</li>
                            )
                        })}
                    </ul>
                </form>
                <div className="edit-infos-footer">
                
                {(status==="processing") &&
                    <button type='button' className='confirm-button' onClick={()=>confirmEditBarber()}>Confirmer</button>
                    }
                </div>
                {(status==='loading')&&
                    <div className='loading-spinner-center'>
                        <LoadingSpinner/>
                    </div>
                }
                {(status==='error')&&
                    <div className='post-barber-error'>
                        {errorMsg}
                        </div>
                }
                {(status==='success')&&
                    <div className='post-barber-success'>
                        Coiffeur Ajouté.
                    </div>
                }

            </div>
        </div>
    </div>
  )
}

export default EditBarber
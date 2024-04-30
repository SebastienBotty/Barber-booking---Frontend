import React,{useState,useRef} from 'react'

import LoadingSpinner from '../../../components/loadingSpinner/loadingSpinner'
import { errorPostBarberHandler } from '../../../utilityFunctions/errorAPIHandler'
import noProfilePic from '../images/no-profile-pic.png'

import './addBarber.css'

function AddBarber(props) {

    const [image, setImage] = useState('')
    const [barberName, setBarberName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [specialtie, setSpecialtie] = useState('')
    const [specialties, setSpecialties] = useState([])
    const [status, setStatus] = useState('processing')


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

    const confirmBarber = ()=>{
       postBarber()
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

    const postBarber = async () =>{
        const postData = {
            name:barberName,
            specialties:specialties.sort(),
            photo:image
        }
        setStatus('loading')
        
        try {
            const response = await fetch('http://localhost:3000/api/barber', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin

            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          
            body: JSON.stringify(postData) 
            });
    
            if (!response.ok){
                const responseData = await response.json(); // Extraire les données JSON de la réponse
                setTimeout(() => {
                    setStatus("error")
                    setErrorMsg(errorPostBarberHandler(responseData.message))   
                    setTimeout(() => {
                        setStatus("processing")
                    }, 2000);
                    
                }, 500);

                throw new Error("Erreur lors de l'envoie de donnée")
            }
            const jsonData = await response.json()
            console.log(jsonData)
            setTimeout(() => {
                setStatus("success");
                setTimeout(() => {
                    props.updateBarbersList()
                    props.closeModal()
                }, 500);
            }, 200);
            return true
        } catch (err) {
            console.log(err.message)
        }
    }
  return (
    <div className='add-barber'>
        <div className='add-barber-img-container' >

                <img className="img-barber" src={image?image:noProfilePic} width={"100%"} height={"100%"} onClick={handleClick}/>
    
            <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
        </div>
        <div className='add-barber-text-container'>
            <div className='add-infos'>
                <div className='add-infos-name'>
                    <input id='barber-name-input' type='text' placeholder='Nom' value={barberName} onChange={(e)=>setBarberName(e.target.value)} required/>
                </div>

                <form id='add-specialtie' onSubmit={(e)=>addSpecialtie(e)}>
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
                <div className="add-infos-footer">
                
                {(status==="processing") &&
                    <button type='button' className='confirm-button' onClick={()=>confirmBarber()}>Confirmer</button>
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

export default AddBarber
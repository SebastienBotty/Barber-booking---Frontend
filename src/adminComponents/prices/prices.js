import React,{useState,useEffect, useRef} from 'react'

import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"

import './prices.css'

function Prices() {

    const [columns, setColumns] = useState([])
    const [isVisible, setIsVisible] = useState(false);
    const [newService, setNewService] = useState('')
    const [newServicePrice, setNewServicePrice] = useState(null)
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [refreshIncrement, setRefreshIncrementer] = useState(false) // Variable that switches everytime a POST is successful to refresh useEffect
    const [services, setServices] = useState([])
    const [serviceToDelete, setServiceToDelete] = useState()
    const [status, setStatus] = useState('progressing')


    const newServiceRef = useRef(null)

    const addService = async (e)=>{
        e.preventDefault()
        await postService()
        newServiceRef.current.focus()
    }
    const closeModal = () => {
        // Masquez le modal
        setIsVisible(false);
    };

    const deleteService = async () =>{
        try{
            const response = await fetch('http://localhost:3000/api/shopInfos/prices/cutName/' + serviceToDelete._id,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                },
            })

            if (!response.ok){
                throw new Error(`Erreur lors de la requête: ${response.status}`);
            }
            refreshPriceList()
            closeModal()
        }
        catch(err){
            console.error(err.message)
        }
    }


    const handleClick = (e,service) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        setServiceToDelete(service)
        };

 
    const postService = async (data) =>{
        const postData = {
            cutName:newService,
            price:newServicePrice
        }
        setStatus('loading')
        try {
            const response = await fetch('http://localhost:3000/api/shopInfos/prices', {
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
                setTimeout(() => {
                    setStatus("error")
          
                  }, 1000);
                  /*  TODO
                                                                                                            
                                                                                                            Afficher le message d'erreur */
                  throw new Error(`Erreur lors de la requête: ${response.status}`);
            }
            setTimeout(()=>{
              setStatus("success")
              refreshPriceList()
              resetFormValues()
            },1000)
      
            return true
          }
          catch (error) {
            // Gérer les erreurs en les capturant dans le bloc catch
            console.error(error.message);
          }
        
    }


    const refreshPriceList = ()=>{
        setRefreshIncrementer(!refreshIncrement)
    }

    const resetFormValues = ()=>{
        setNewService("")
        setNewServicePrice("")
    }

    const splitArray =(array)=> {
        const numSousArrays = Math.ceil(array.length / 10); 
        const result = []; 
    
        let indexDebut = 0;
        for (let i = 0; i < numSousArrays; i++) {
            result.push(array.slice(indexDebut, indexDebut + 10)); 
            indexDebut += 10; 
        }
    
        setColumns(result);
        return result
    }
    useEffect(() => {
        const fetchPrices = async ()=>{
            try {
                const response= await fetch("http://localhost:3000/api/shopInfos/prices")
                if (!response.ok){
                    throw new Error('Erreur lors de la récupération des données');
                }
                const jsonData = await response.json();
                const sortedData = jsonData.toSorted((a,b)=>{return a.cutName.localeCompare(b.cutName)})
    
                setServices(sortedData)
                splitArray(sortedData)
            } catch (err) {
                console.error('Une erreur s\'est produite:', err);
            }
        }

        fetchPrices()
    return () => {
    }
    }, [refreshIncrement])

  return (
    <>
        <section className='prices'>
            <form className="form-add-service" onSubmit={(e)=>addService(e)}> 
                <div className='form-row'>
                    <input 
                        type='text' 
                        ref={newServiceRef}
                        required 
                        placeholder='Service'
                        onChange={e=>setNewService(e.target.value)}
                        value={newService}
                    />

                    <input 
                        type='number' 
                        required 
                        placeholder='Prix'
                        id='input-price'
                        onChange={e=>setNewServicePrice(e.target.value)}
                        value={newServicePrice}
                    />
                </div>
                <div className='form-second-row'>
                    <div className='form-second-row-center'>
                        {((status==="progressing")||(status==='success'))&&
                            <button type='submit' className='confirm-button'>Ajouter</button>
                        }
                        {(status==='loading')&&<LoadingSpinner/>}
                    </div>
                </div>
            </form>
            <div className='display-prices'>

                {columns.map((column,index)=>{
                    return (
                    <ul className='columns-prices'>
                        {column.map((item)=>{
                            return (
                                <li className="list-prices-item" key={item.cutName} onClick={e=>handleClick(e,item)} >
                                    <div className='service-name-left' >{item.cutName}</div>
                                    <div className='service-price-right'>{item.price}€</div>
                                </li>
                            )
                        })}
                    </ul>
                    )
                })}
                
                
            </div>
        </section>
        {isVisible && (
            <div className='modal-overlay'  onClick={()=>closeModal()}>
                <div className="modal" style={{ top: position.y, left: position.x ,zIndex:2}} onClick={()=>null}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                        <b>&times;</b>
                        </span>
                        <button  className="modal-delete-button" onClick={()=>deleteService()}> SUPPRIMER </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default Prices
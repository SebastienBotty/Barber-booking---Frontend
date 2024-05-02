import React,{useState,useEffect} from 'react'
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner'
import "./shopSettings.css"

function ShopSettings() {
    //datas
    const [address, setAddress] = useState('')
    const [appointmentDuration, setAppointmentDuration] = useState(45)
    const [lunchTime, setLunchTime] = useState('12:00')
    const [lunchTimeDuration, setLunchTimeDuration] = useState(30)
    const [mail, setMail] = useState('')
    const [shopName, setShopName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingTime, setOpeningTime] = useState({opening:'09:30',closing:"18:00"})
    const [closingDays, setClosingDays] = useState([])

    // status checkers
    const [isChecked, setIsChecked] = useState(false) 
    const [isShopExisting, setIsShopExisting] = useState(false)
    const [status, setStatus] = useState('progressing')



    const days=['Lundi','Mardi','Mercredi','Jeudi',"Vendredi",'Samedi','Dimanche']
    


    const createShop = async ()=>{
        const postData={
            shopName:shopName,
            shopAddress:address,
            shopPhoneNumber:phoneNumber,
            shopMail:mail,
            openingTime:openingTime,
            appointmentDuration:appointmentDuration,
            lunch:isChecked?{time:lunchTime,duration:lunchTimeDuration}:{time:"",duration:0},
            closingDays:closingDays
        }
        console.log(postData)
        try {
            const response = await fetch('http://localhost:3000/api/shopInfos', {
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

              if (!response.ok){
                throw new Error("Erreur lors de l'envoie de données")
              }
              const responseData = await response.json()
              console.log("Shop crée ! " + responseData)
              setStatus("success")
                setTimeout(() => {
                    setStatus("progressing")
                    setIsShopExisting(true)
                }, 2000);
        } catch (error) {
            console.error("Erreur : " + error.message)
        }
    }

    const editShop = async()=>{
        console.log(isChecked)
        let lunchData = isChecked?{time:lunchTime,duration:lunchTimeDuration}:{time:"",duration:0}
        console.log("------")
        console.log(lunchData)
        const postData={
            shopName:shopName,
            shopAddress:address,
            shopPhoneNumber:phoneNumber,
            shopMail:mail,
            openingTime:openingTime,
            appointmentDuration:appointmentDuration,
            lunch:lunchData,
            closingDays:closingDays
        }
        console.log("postDATA")
        console.log(postData)
        try {
            const response = await fetch('http://localhost:3000/api/shopInfos', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(postData)
            });
        
            if (!response.ok) {
                console.log(response)
              throw new Error(response.message);
            }
        
            const data = await response.json();
            console.log("Modifié! avec succès" );
            console.log(data)
            setStatus("success")
            setTimeout(() => {
                setStatus("progressing")
            }, 2000);
          } catch (error) {
            console.error('Erreur lors de la requête :', error);
          }
    }

    const generateOpeningOptions = () => {
        const options = [];
        for (let hour = 8; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute +=30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(<option key={time} value={time}>{time}</option>);
            }
        }
        return options;
    };

    const generateClosingOptions = () => {
        const options = [];
        const [openingHourStr,openingHourMins]= openingTime.opening.split(':')
        const openingHour= parseInt(openingHourStr,10)
        for (let hour = openingHour + 1; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute +=30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(<option key={time} value={time}>{time}</option>);
            }
        }
        return options;
    };

    const handleAddressChange = (e)=>{
        setAddress(e.target.value)
    }

    const handleDaysChange = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setClosingDays([...closingDays, name]); // Ajoute le jour coché à l'array
        } else {
            setClosingDays(closingDays.filter(item => item !== name)); // Retire le jour décoché de l'array
        }
        console.log(name + " a été mis sur "+  event.target.checked)

      };


    const handleForm = (e)=>{
        e.preventDefault()
        setStatus('loading')
        isShopExisting? editShop() : createShop()

    }
    const handleNameChange= (e)=>{
        setShopName(e.target.value)
    }

    const handleOpeningTimeChange = (e)=>{
        setOpeningTime({...openingTime,opening:e.target.value})
    }
    const handleClosingTimeChange = (e)=>{
        setOpeningTime({...openingTime,closing:e.target.value})
    }
    const handlePhoneChange = (e) => {
        const input = e.target.value;
        if (/^[0-9]*$/.test(input)) {
            setPhoneNumber(input);
        }
    };



    const handleMailChange = (e)=>{
        setMail(e.target.value)
    }


    useEffect(() => {
        const fetchShopInfos = async () =>{
            try {
                const response = await fetch('http://localhost:3000/api/shopInfos/')
                if (!response.ok){

                    throw new Error('Erreur lors de la récupération des données');
                }
                const jsonData = await response.json()
                console.log(response)
                console.log(jsonData)
                setIsShopExisting(true)
                setAddress(jsonData.shopAddress)
                setShopName(jsonData.shopName)
                setMail(jsonData.shopMail)
                setPhoneNumber(jsonData.shopPhoneNumber)
                setOpeningTime(jsonData.openingTime)
                setAppointmentDuration(jsonData.appointmentDuration)
                setClosingDays(jsonData.closingDays)
                if(jsonData.lunch.time){
                    setIsChecked(true)
                    setLunchTime(jsonData.lunch.time)
                    setLunchTimeDuration(jsonData.lunch.duration)
                }
            }
            catch (err) {
                console.error('Une erreur s\'est produite:', err);
            }
        }
        
      fetchShopInfos()
    
      return () => {
        
      }
    }, [])
    

  return (
    <div className='shop-settings'>


        <form className='shop-form' onSubmit={handleForm}> 
            <h2 style={{height:"2rem"}}>
                {isShopExisting?shopName:"Magasin"}
            </h2>

            <div>
                <label htmlFor="shop-name">Nom du magasin</label>
                <input 
                    type="text" 
                    id="shop-name" 
                    name="shop-name" 
                    size={15}
                    value={shopName}
                    onChange={handleNameChange}
                    required
                    />
            </div>
            <div>
                <label htmlFor="Address">Addresse</label>
                <input 
                    type="text" 
                    id="Address" 
                    name="Address" 
                    value={address}
                    onChange={handleAddressChange}
                    required
                    />
            </div>
            <div>
                <label htmlFor="mail">Mail</label>
                <input 
                    type="mail" 
                    id="mail" 
                    name="mail" 
                    value={mail}
                    onChange={handleMailChange}
                    />
            </div>
            <div>
                <label htmlFor="phone">Téléphone</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                />
            </div>
            <div>
                <label htmlFor="opening-time">Heure d'ouverture</label>
                <select id="time" name="time" value={openingTime.opening} onChange={handleOpeningTimeChange}>
                    {generateOpeningOptions()}
                </select>
            </div>
            <div>
                <label htmlFor='lunchTime'>Pause</label>
                <input
                    id='lunchTime'
                    name='lunchTime'
                    type='checkbox'
                    checked={isChecked}
                    onChange={(e)=>setIsChecked(e.target.checked)}
                    />
                {isChecked &&
                <div className='lunch-time'>
                    <div>
                        <label htmlFor='lunch-time'>Heure</label>
                        <select id='lunch-time' name='lunch-time' value={lunchTime} onChange={(e)=>setLunchTime(e.target.value)}>
                            {generateClosingOptions()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor='lunch-time-duration'>Durée<span style={{fontSize:'small'}}>(minutes)</span></label>
                        <select id='lunch-time-duration' name='lunch-time-duration' value={lunchTimeDuration} onChange={(e)=>setLunchTimeDuration(e.target.value)}>
                            <option key={"lunchTime-15"} value={15}>15</option>
                            <option key={"lunchTime-30"}value={30}>30</option>
                            <option key={"lunchTime-45"} value={45}>45</option>
                        </select>
                    </div>
                </div>}
            </div>
            <div>
                <label htmlFor="opening-time">Heure de fermeture</label>
                <select id="time" name="time" value={openingTime.closing} onChange={handleClosingTimeChange}>
                    {generateClosingOptions()}
                </select>
            </div>
            <div>
                <label htmlFor='appointment-duration'>Durée RDV<span style={{fontSize:'small'}}>(minutes)</span></label>
                <select  id='appointment-duration' name='appointment-duration' type='number' required value={appointmentDuration} onChange={(e)=>setAppointmentDuration(e.target.value)}>
                    <option key='appointment-duration-15' value={15}>15</option>
                    <option key='appointment-duration-20' value={20}>20</option>
                    <option key='appointment-duration-30' value={30}>30</option>
                    <option key='appointment-duration-40' value={40}>40</option>
                    <option key='appointment-duration-45' value={45}>45</option>
                    <option key='appointment-duration-60' value={60}>60</option>
                </select>
            </div>
            
           
            <div className='closing-days'>
                <div className='closing-days-columns'>
                    <span>Jours fermés</span>
                </div>
                <div className='closing-days-columns' id={"closing-days-checkbox"}>
                    <ul>
                        {days.map(day => (
                            <li  key={day} >
                                <label id={day} htmlFor={day}>
                                <input
                                    type="checkbox"
                                    name={day}
                                    checked={closingDays.includes(day)}
                                    onChange={handleDaysChange}
                                />
                                <div style={{marginRight:'1rem'}}>
                                    {day}
                                </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
           
            <div className='confirmation-form-footer'>
                {(status === "loading")&& <LoadingSpinner/>}
                {(status === 'progressing')&&<button id="btn-form-shop-settings" type="submit">{isShopExisting? 'Modifier': "Créer"}</button>}
                {(status==="success") && <div className='shop-confirmation-message' id="success">{isShopExisting?"Modifié" : "Créé"}</div>}
                {(status==="error") && <div className='shop-confirmation-message' id='error' >Erreur</div>}

            </div>
        </form>
        
        
    </div>
  )
}

export default ShopSettings
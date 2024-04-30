import React,{useState,useEffect} from 'react'
import LoadingSpinner from '../../../components/loadingSpinner/loadingSpinner'
import "./shopSettings.css"

function ShopSettings() {
    const [address, setAddress] = useState('')
    const [mail, setMail] = useState('')
    const [shopName, setShopName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingTime, setOpeningTime] = useState({opening:'09:30',closing:"18:00"})
    const [status, setStatus] = useState('progressing')


    const [isShopExisting, setIsShopExisting] = useState(false)


    const createShop = async ()=>{
        const postData={
            shopName:shopName,
            shopAddress:address,
            shopPhoneNumber:phoneNumber,
            shopMail:mail,
            openingTime:openingTime
        }
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
              setIsShopExisting(true)
              setStatus("success")
                setTimeout(() => {
                    setStatus("progressing")
                }, 2000);
        } catch (error) {
            console.error("Erreur : " + error.message)
        }
    }

    const editShop = async()=>{
        const postData={
            shopName:shopName,
            shopAddress:address,
            shopPhoneNumber:phoneNumber,
            shopMail:mail,
            openingTime:openingTime
        }
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
            console.log("Modifié! avec succès" + data);
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
        <h2>
            Magasin
        </h2>

        <form className='shop-form' onSubmit={handleForm}> 
            <div>
                <label htmlFor="Name">Nom du magasin</label>
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
                    size={30}
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
                <label htmlFor="opening-time">Heure de fermeture</label>
                <select id="time" name="time" value={openingTime.closing} onChange={handleClosingTimeChange}>
                    {generateClosingOptions()}
                </select>
            </div>
            <div className='confirmation-form-footer'>
                {(status === "loading")&& <LoadingSpinner/>}
                {(status === 'progressing')&&<button id="btn-form-shop-settings" type="submit">{isShopExisting? 'Modifier': "Créer"}</button>}
                {(status==="success") && <div className='shop-confirmation-message' id="success">{isShopExisting?"Modifié" : "Créé"} avec succès</div>}
                {(status==="error") && <div className='shop-confirmation-message' id='error' >Erreur</div>}

            </div>
        </form>
    </div>
  )
}

export default ShopSettings
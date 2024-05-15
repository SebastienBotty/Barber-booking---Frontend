import React,{useState,useLayoutEffect,useRef} from 'react'
import { auth } from '../../firebase';

import SignIn from '../../adminComponents/auth/signIn/signIn'
import Sidebar from '../../adminComponents/sideBar/sideBar';
import Prices from '../../adminComponents/prices/prices';
import BarbersInfos from '../../adminComponents/barbersInfos/barbersInfos';
import ShopSettings from '../../adminComponents/shopSettings/shopSettings';
import Planning from '../../adminComponents/planning/planning';


import './adminDashboard.css'


function AdminDashboard() {
    const [user, setUser] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    const pricesRef = useRef(null);
    const barbersRef = useRef(null);
    const shopSettingsRef = useRef(null);
    const planningRef = useRef(null);

    const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    useLayoutEffect(() => {
      
      const authSubscribe = auth.onAuthStateChanged(user => {
        setUser(user);
        setIsAuthChecked(true)
      });

      return () => authSubscribe();
    }, []);

    const handleSignOut = () => {
      auth.signOut();
    };

    if (!isAuthChecked) {
      // La vérification de la connexion n'est pas encore terminée
      return null; // Ou un composant de chargement/spinner
    }
    
    return (

   <>
        {user ? 
            <>
            <div className='admin-dashboard'>
                <Sidebar 
                  disconnect={ ()=>handleSignOut()}
                  scrollToPrices={() => scrollToSection(pricesRef)}
                  scrollToBarbers={() => scrollToSection(barbersRef)}
                  scrollToInfos={() => scrollToSection(shopSettingsRef)}
                  scrollToSchedule={() => scrollToSection(planningRef)}
                />
                <div className='content-container'>
                  <div ref={shopSettingsRef}><ShopSettings/></div>
                  <div ref={pricesRef}><Prices /></div>
                  <div ref={barbersRef}><BarbersInfos/></div>
                  <div ref={planningRef}><Planning/></div>
                </div>
              </div>
            </>
            : 
            <SignIn/>
        }
    </>
  )
}

export default AdminDashboard
import React,{useState,useEffect,useRef} from 'react'
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

    const pricesRef = useRef(null);
    const barbersRef = useRef(null);
    const shopSettingsRef = useRef(null);
    const planningRef = useRef(null);

    const scrollToSection = (ref) => {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    };

  useEffect(() => {
    const authSubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => authSubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut();
  };
    
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
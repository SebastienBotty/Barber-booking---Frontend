import React, { useRef } from 'react';
import { auth } from '../../firebase';
import { PricetagOutline,TimeOutline,PeopleOutline, InformationOutline } from 'react-ionicons'


import './sideBar.css';

function Sidebar(props){
  const prices = useRef(null);
  const barbers = useRef(null);
  const shopInfos = useRef(null);
  const schedule = useRef(null);

  const handleSignOut = () => {
    auth.signOut();
  };


  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => scrollToSection(prices)}>
        <div className='li-ionIcons-left-side'>
                <PricetagOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
            </div>
            Prix 
           
        </li>
        <li onClick={() => scrollToSection(barbers)}>
            <div className='li-ionIcons-left-side'>
                    <PeopleOutline
                        color={'#fff'} 
                        height="1.5rem"
                        width="1.5rem"
                    />
            </div>
            Coiffeurs 
        </li>
        <li onClick={() => scrollToSection(shopInfos)}>
        <div className='li-ionIcons-left-side'>
                <InformationOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
        </div>
            Infos 
        </li>
        <li onClick={() => scrollToSection(schedule)}>
        <div className='li-ionIcons-left-side'>
                <TimeOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
        </div>
            Planning
        </li>
      </ul>
      <div className='footer-sidebar'>
         <li  onClick={() => props.disconnect()}>Déconnexion </li>
      </div>
    </div>
  );
};

export default Sidebar;

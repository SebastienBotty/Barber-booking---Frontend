import React, { useRef } from 'react';
import { auth } from '../../firebase';
import { PricetagOutline,TimeOutline,PeopleOutline,ExitOutline, InformationOutline } from 'react-ionicons'


import './sideBar.css';

function Sidebar(props){

  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => props.scrollToPrices()}>
        <div className='li-ionIcons-left-side'>
                <PricetagOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
            </div>
            Prix 
           
        </li>
        <li onClick={() => props.scrollToBarbers()}>
            <div className='li-ionIcons-left-side'>
                    <PeopleOutline
                        color={'#fff'} 
                        height="1.5rem"
                        width="1.5rem"
                    />
            </div>
            Coiffeurs 
        </li>
        <li onClick={() => props.scrollToInfos()}>
        <div className='li-ionIcons-left-side'>
                <InformationOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
        </div>
            Infos 
        </li>
        <li onClick={() => props.scrollToSchedule()}>
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
         <li  onClick={() => props.disconnect()}>
         <div className='li-ionIcons-left-side'>
                <ExitOutline
                    color={'#fff'} 
                    height="1.5rem"
                    width="1.5rem"
                />
        </div>
          Déconnexion </li>
      </div>
    </div>
  );
};

export default Sidebar;

import React,{useState,useEffect} from 'react'
import { auth } from '../../firebase';

import SignIn from '../../adminComponents/auth/signIn/signIn'
import Sidebar from '../../adminComponents/sideBar/sideBar';


function AdminDashboard() {
    const [user, setUser] = useState(null);

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
              <Sidebar disconnect={handleSignOut}/>
            </>
            : 
            <SignIn/>
        }
    </>
  )
}

export default AdminDashboard
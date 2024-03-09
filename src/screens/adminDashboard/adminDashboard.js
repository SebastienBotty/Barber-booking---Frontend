import React,{useState,useEffect} from 'react'
import { auth } from '../../firebase';

import SignIn from '../../components/auth/signIn/signIn'


function AdminDashboard() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const authSubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => authSubscribe();
  }, []);

  const handleSignOut = () => {
    console.log(user)
    auth.signOut();
  };
    
    return (

   <>
        {user? <button onClick={handleSignOut}>Deco</button> : <SignIn/>}
   </>
  )
}

export default AdminDashboard
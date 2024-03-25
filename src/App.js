import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import { FileDetails } from './FileDetails';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Notification } from './Notification';

const App = () => {
    const [user, setGlobalUser] = useState({})
		const [activateNotification, setActivateNotification] = useState(false)

    useEffect(() => {
      const localUser = window.localStorage.getItem('user');
      if(localUser) {
        setGlobalUser(JSON.parse(localUser));
      }
    }, [])

    useEffect(() => {
      if(user.id === undefined) {
        return
      }
      window.localStorage.setItem('user', JSON.stringify(user));
    }, [user])

    return (
        <HashRouter>
					{activateNotification ? <Notification checkmark={true} text={"sign up is successful"} /> : null}
          <Routes>
            <Route path="/" element={<Login setGlobalUser={setGlobalUser}/>}/>
            <Route path="/files" element={<FileDetails user={user} setGlobalUser={setGlobalUser}/>} />
            <Route path="/signUp" element={<SignUp setGlobalUser={setGlobalUser} setActivateNotification={setActivateNotification}/>}/>
        	</Routes>
            
        </HashRouter>
    );
};

export default App;
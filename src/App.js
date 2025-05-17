import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import { FileDetails } from './FileDetails';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { Notification } from './Notification';
import { ForgotPassword } from './ForgotPassword';

const App = () => {
		const [activateNotification, setActivateNotification] = useState(false)
    const [notificationText, setNotificationText] = useState('check your email for activation link')
    // const [globalUser, setGlobalUser] = useState({})

    // useEffect(() => {
    //   const localUser = window.localStorage.getItem('user');
    //   if(localUser) {
    //     setGlobalUser(JSON.parse(localUser));
    //   }
    // }, [])

    // useEffect(() => {
    //   if(user.id === undefined) {
    //     return
    //   }
    //   window.localStorage.setItem('user', JSON.stringify(user));
    // }, [user])

    return (
        <HashRouter>
					{activateNotification ? <Notification checkmark={true} text={notificationText} /> : null}
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/files" element={<FileDetails/>} />
            <Route path="/signUp" element={<SignUp setActivateNotification={setActivateNotification} setNotificationText={setNotificationText}/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword/>} />
            <Route path="/activate" element={<Login setNotificationText={setNotificationText} setActivateNotification={setActivateNotification}/>}/>
        	</Routes>
            
        </HashRouter>
    );
};

export default App;
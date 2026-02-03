import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import React from 'react';

// Layouts
import ClientLayoutView from './skillswap.client/layouts/Layout'; 
import ClientAppLayoutView from './skillswap.client/layouts/AppLayout'; 
import ClientInternalAppLayoutView from './skillswap.client/layouts/InternalAppLayout'; 

// Client
import ClientHomeView from './skillswap.client/pages/HomeView';
import ClientAboutView from './skillswap.client/pages/AboutView';
import ClientContactView from './skillswap.client/pages/ContactView';
import ClientProfileView from './skillswap.client/pages/app/ProfileView'; 
import ClientMyProfileView from './skillswap.client/pages/app/MyProfileView'; 
import ClientSwipeView from './skillswap.client/pages/app/SwipeView'; 

// Shared
import SharedLoginView from './skillswap.shared/pages/LoginView';
import SharedRegisterView from './skillswap.shared/pages/RegisterView';
import SharedNotFoundView from './skillswap.shared/pages/NotFoundView';

// Authorization
import AuthContext from './skillswap.shared/components/authentication/AuthContext';
import AuthorizedView from './skillswap.shared/components/authentication/AuthorizedView';


function App() {
  return (
    <HashRouter>
        <div className='App'>
          <AuthContext>
            <Routes>
            
              <Route path="/" element={<ClientLayoutView />}>
                <Route index element={<ClientHomeView />} />
                <Route path='/about' element={<ClientAboutView/>}/>
                <Route path='/contact' element={<ClientContactView/>}/>
              </Route>

              <Route path="/app" element={<ClientAppLayoutView />}>
                <Route element={<AuthorizedView />}>
                    <Route element={<ClientInternalAppLayoutView />}>
                        <Route index element={<ClientSwipeView />} /> 
                        <Route path='profile/:guid' element={<ClientProfileView/>}/> 
                    </Route>

                    <Route path='/app/my/account' element={<ClientMyProfileView/>}/> 
                </Route>
              </Route>

              <Route path='/shared/login' element={<SharedLoginView/>}/>
              <Route path='/shared/register' element={<SharedRegisterView/>}/>

              // Not found view - 404 
              <Route path='*' element={<SharedNotFoundView/>}/>
            </Routes>
          </AuthContext>
        </div>
      <NotificationContainer />
    </HashRouter>
  );
}

export default App;
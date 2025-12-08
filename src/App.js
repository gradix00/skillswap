import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

//Layouts
import ClientLayoutView from './skillswap.client/layouts/Layout';
import ClientAppLayoutView from './skillswap.client/layouts/AppLayout';

//Client
import ClientHomeView from './skillswap.client/pages/HomeView';
import ClientAboutView from './skillswap.client/pages/AboutView';
import ClientContactView from './skillswap.client/pages/ContactView';

//Shared
import SharedLoginView from './skillswap.shared/pages/LoginView';
import SharedRegisterView from './skillswap.shared/pages/RegisterView';

//Authorization
import AuthContext from './skillswap.shared/components/authentication/AuthContext';
import AuthorizedView from './skillswap.shared/components/authentication/AuthorizedView';

function App() {
  return (
    <BrowserRouter>
        <div className='App'>
          <AuthContext>
            <Routes>
              //Client public views
              <Route path="/" element={<ClientLayoutView />}>

                //Unauthorized views
                <Route index element={<ClientHomeView />} />
                <Route path='/about' element={<ClientAboutView/>}/>
                <Route path='/contact' element={<ClientContactView/>}/>

                //Authorized views
                <Route element={<AuthorizedView />}>
                  //Account Layout
                  {/* <Route path="/account/listings/favorite" element={<ClientFavoriteListingsView />} /> */}
                </Route>
              </Route>

              //Client authorized views
              <Route path="/app" element={<ClientAppLayoutView />}>

                //Authorized views
                <Route element={<AuthorizedView />}>
                  <Route index element={<ClientAboutView />} />
                </Route>

              </Route>

              Shared views
              <Route path='/shared/login' element={<SharedLoginView/>}/>
              <Route path='/shared/register' element={<SharedRegisterView/>}/>

              Not found view - 404
              {/* <Route path='*' element={<SharedNotFoundView/>}/> */}
            </Routes>
          </AuthContext>
        </div>
      <NotificationContainer />
    </BrowserRouter>
    // <CounterView/>
  );
}

export default App;

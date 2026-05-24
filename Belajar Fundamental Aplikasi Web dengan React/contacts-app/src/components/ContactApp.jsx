import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Navigation from './Navigation';
import HomePage from '../pages/HomePage';
import AddPage from '../pages/AddPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged,putAccessToken } from '../utils/api';
import { LocalProvider } from '../contexts/LocaleContext';

class ContactApp extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localContext: {
        locale: localStorage.getItem('locale') || 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLocale = prevState.localContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLocale);
            return {
              localContext: {
                ...prevState.localContext,
                locale: newLocale,
              },
            };
          });
        },
      },
    };
    this.onLoginSuccess=this.onLoginSuccess.bind(this);
    this.onLogout=this.onLogout.bind(this);
  }

  onLogout(){
    this.setState(()=>{
      return{
        authedUser:null,
      }
    });
    putAccessToken('');
  }

  async componentDidMount(){
    try {
      const {data} =await getUserLogged();

      this.setState(()=>{
          return{
            authedUser:data,
            initializing:false
          };
      });
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.setState(() => {
        return {
          authedUser: null,
          initializing: false,
        };
      });
    }
  }

  async onLoginSuccess({accessToken}){
    try {
      putAccessToken(accessToken);
      const {data}=await getUserLogged();

      this.setState(()=>{
        return {
          authedUser:data,
        };
      });
    } catch (error) {
      console.error('Failed to complete login:', error);
    }
  }


  render(){
    if(this.state.initializing){
      return (
        <div className='contact-app'>
          <p>Loading...</p>
        </div>
      );
    }

      if(this.state.authedUser ===null){
        return(
          <LocalProvider value={this.state.localContext}>
              <div className='contact-app'>
                <header className='contact-app__header'>
                  <h1>Aplikasi Kontak</h1>
                </header>
                <main>
                  <Routes>
                    <Route path='/*' element={<LoginPage LoginSuccess={this.onLoginSuccess}/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                  </Routes>
                </main>
              </div>
          </LocalProvider>
          
        )
      }

      return (
        <LocalProvider value={this.state.localContext}>
          <div className='contact-app'>
            <header className='contact-app__header'>
              <h1>{this.state.localContext.locale === 'id' ? 'Aplikasi Kontak' : 'Contacts App'}</h1>
              <Navigation logout={this.onLogout} name={this.state.authedUser.name} />
            </header>

            <main>
              <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/Add' element={<AddPage/>}/>
              </Routes>
            </main>
          </div>
        </LocalProvider>
        
      );
  }
}


export default ContactApp;
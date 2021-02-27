import './App.css';
import {ThemeProvider} from "styled-components";
import  {useDarkMode} from "./components/useDarkMode"
import { GlobalStyles } from "./components/GlobalStyles";
import { Toggle } from "./components/Toggle";
import { lightTheme, darkTheme } from "./components/Theme"
import {useEffect, useState, Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Chat from './components/Chat'
import Login from './components/Login'
import styled from 'styled-components'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import db from './firebase'
import {auth, provider} from './firebase'



function App() {

  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}

const [rooms,setRooms] = useState([])
const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));


  const getChannels = () => {
   db.collection('rooms').onSnapshot((snapshot) => {
       setRooms(snapshot.docs.map((doc) => {
         return{id: doc.id, name:doc.data().name}

       
   }))
  })
}

 const signOut= () => {
   auth.signOut().then(() => {
     localStorage.removeItem('user');
     setUser(null);
   })

 }

  useEffect(() => {
    getChannels();
  }, []) 

  
  
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
    <GlobalStyles/>
    <div className="App">
    <button onClick={themeToggler}>Switch Theme</button>

      <Router>
        {
          !user ?
          <Login setUser={setUser} />
         :
        
        <Container>
          <Header signOut={signOut} user={user}/>
          <Main>
            <Sidebar rooms={rooms}/>
        <Switch>
          <Route path="/room/:channelId">
             <Chat user={user}/>
          </Route>
          <Route path= "/">
            Select or Create Channel
          </Route>
      
        </Switch>
        </Main>
        </Container>
}

      </Router>
     
    </div>
    </>
    </ThemeProvider>
  );
}


export default App;
const Container = styled.div`
width: 100%;
height: 100vh;
display: grid;
grid-template-rows: 38px minmax(0, 1fr);
`
const Main = styled.div`
display: grid;
grid-template-columns: 260px auto;
`
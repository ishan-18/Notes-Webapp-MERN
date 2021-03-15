import React, {useState, useEffect} from 'react'
import axios from 'axios'
import User from './components/User'
import Notes from './components/Notes'

function App() {

  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    const checkLogin = async ()=>{
      const token = localStorage.getItem('token')
      try {
        const verified = await axios.get('/user/byId', {
          headers: {Authorization: token}
        })
        console.log(verified)
        setIsLogin(verified.data)
        if(verified.data === false) return localStorage.clear()
      } catch (err) {
        setIsLogin(false)
      }
    }
    checkLogin()
  },[])

  return (
    <div className="App">
      {
        isLogin ? <Notes setIsLogin={setIsLogin} /> : <User setIsLogin={setIsLogin} />
      }
    </div>
  );
}

export default App;

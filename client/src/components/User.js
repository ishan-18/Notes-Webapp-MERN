import React, {useState} from 'react'
import axios from 'axios'

const User = ({setIsLogin}) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [err,setErr] = useState('')

    const onChangeInput = e =>{
        const {name, value} = e.target
        setUser({...user, [name]:value})
        setErr('')
    }

    const onRegister = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post('user/register', {
                name: user.name,
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr('')
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const onLogin = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('user/login', {
                email: user.email,
                password: user.password
            })
            setUser({name: '', email: '', password: ''})
            setErr('')
            localStorage.setItem('token', res.data.token)
            setIsLogin(true)
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const [onSignin, setOnSignin] = useState(false)
    const style = {
        display: onSignin ? "block" : "none",
        opacity: onSignin ? 1 : 0
    }

    return (
        <section className="login-page">
            <div className="login-form create1" >
                <h2>Login</h2>
                <form onSubmit={onLogin}>
                    <input type="email" name="email" placeholder="Enter your Email:" required value={user.email} onChange={onChangeInput} />
                    <input type="password" name="password" placeholder="Enter your Password:" autoComplete="true" required value={user.password} onChange={onChangeInput} />
                    <button type="submit">Login</button>
                    <p>Already Have an Account? <span onClick={()=> setOnSignin(true)}>Register Now!</span></p>
                </form>
                <h3>{err}</h3>
            </div>
            <div className="register-form create1" style={style}>
                <h2>Register</h2>
                <form onSubmit={onRegister}>
                    <input type="text" name="name" placeholder="Enter your Name:" required value={user.name} onChange={onChangeInput} />
                    <input type="email" name="email" placeholder="Enter your Email:" required value={user.email} onChange={onChangeInput} />
                    <input type="password" name="password" placeholder="Enter your Password:" autoComplete="true" required value={user.password} onChange={onChangeInput} />
                    <button type="submit">Register</button>
                    <p>Create an Account? <span onClick={()=>setOnSignin(false)}>Wanna Login?</span></p>
                </form>
                <h3>{err}</h3>
            </div>
        </section>
    )
}

export default User

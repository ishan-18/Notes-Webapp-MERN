import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {format} from 'timeago.js';
import axios from 'axios'

const Home = () => {

  const [notes, setNotes] = useState([])
  const [token, setToken] = useState('')

  const getNotes = async (token) => {
    const res = await axios.get('api/notes', {
      headers: {Authorization: token}
    })
    setNotes(res.data)
    console.log(res.data)
  }

  useEffect(()=>{
    const token = localStorage.getItem('token')
    setToken(token)
    if(token){
      getNotes(token)
    }
  }, [])

  const deleteNote = async (id)=>{
    try {
      if(token){
        await axios.delete(`api/notes/${id}`, {
          headers: {Authorization: token}
        })
        getNotes(token)
      }
    } catch (err) {
      window.location.href = "/";
    }
  }

    return (
        <div className="note-wrapper">
          {
            notes.map((note)=>(
              <div className="card" key={note._id}>
                <h3 title={note.title}>{note.title}</h3>
                <h4>{note.subtitle}</h4>
                <div className="text-wrapper">
                  <p>{note.body}</p>
                </div>
                <br/>
                <p className="date">{format(note.date)}</p>
                <div className="card-footer">
                  {note.postedBy.name}
                  <Link to={`/edit/${note._id}`}>Edit</Link>
                </div>
                <button className="close" onClick={()=> deleteNote(note._id)}>x</button>
              </div> 
            ))
          }
        </div>
    )
}

export default Home

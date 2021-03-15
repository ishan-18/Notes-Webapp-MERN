import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Create = () => {

    const history = useHistory()
    const [notes, setNotes] = useState({
        title: '',
        subtitle: '',
        body: '',
        date: ''
    })

    const onChangeInput = e => {
        const {name, value} = e.target
        setNotes({...notes, [name]: value})
    }

    const onCreateNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if(token){
                const {title, subtitle, body, date} = notes
                const newNote = {
                    title,
                    subtitle,
                    body,
                    date
                }

                await axios.post('api/notes',newNote, {
                    headers: {Authorization: token}
                })
                return history.push('/')
            }
        } catch (err) {
            window.location.href = '/'
        }
    }

    return (
        <div className="create">
            <h2>Create Your Notes</h2>
            <form onSubmit={onCreateNote}>
                <div className="row">
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="Enter the Title" value={notes.title} name="title" onChange={onChangeInput} />    
                </div> 
                <div className="row">
                    <label htmlFor="subtitle">Subtitle:</label>
                    <input type="text" placeholder="Enter the Subtitle" value={notes.subtitle} name="subtitle" onChange={onChangeInput} />    
                </div> 
                <div className="row">
                    <label htmlFor="body">Body:</label>
                    <textarea type="text" placeholder="Enter the Body" value={notes.body} name="body" rows="10" onChange={onChangeInput} />    
                </div> 
                <div className="row">
                    <label htmlFor="date">Date: {notes.date}</label>
                    <input type="date" name="date" onChange={onChangeInput} />    
                </div> 
                <br/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Create

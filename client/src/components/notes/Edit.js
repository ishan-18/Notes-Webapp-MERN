import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Edit = ({match}) => {

    const history = useHistory()
    const [notes, setNotes] = useState({
        title: '',
        subtitle: '',
        body: '',
        date: '',
        id: ''
    })

    useEffect(()=>{
        const getNotes = async ()=>{
            const token = localStorage.getItem('token')
            if(match.params.id){
                const res = await axios.get(`/api/notes/${match.params.id}`, {
                    headers: {Authorization: token}
                })
                setNotes({
                    title: res.data.title,
                    subtitle: res.data.subtitle,
                    body: res.data.body,
                    date: new Date(res.data.date).toLocaleDateString(),
                    id: res.data._id
                })
            }
        }
        getNotes()
    },[match.params.id])

    const onChangeInput = e => {
        const {name, value} = e.target
        setNotes({...notes, [name]: value})
    }

    const onEditNote = async e => {
        e.preventDefault()
        try {
            const token = localStorage.getItem('token')
            if(token){
                const {title, subtitle, body, date, id} = notes
                const newNote = {
                    title,
                    subtitle,
                    body,
                    date
                }

                await axios.put(`/api/notes/${id}`,newNote, {
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
            <h2>Edit Note</h2>
            <form onSubmit={onEditNote}>
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

export default Edit

import React, {useState, useEffect} from 'react'

const Create = () => {

    const [notes, setNotes] = useState({
        title: '',
        subtitle: '',
        body: '',
        date: ''
    })

    return (
        <div className="create">
            <h2>Create Your Notes</h2>
            <form>
                <div className="row">
                    <label htmlFor="title">Title:</label>
                    <input type="text" placeholder="Enter the Title" value={notes.title} name="title" />    
                </div> 
                <div className="row">
                    <label htmlFor="subtitle">Subtitle:</label>
                    <input type="text" placeholder="Enter the Subtitle" value={notes.subtitle} name="subtitle" />    
                </div> 
                <div className="row">
                    <label htmlFor="body">Body:</label>
                    <textarea type="text" placeholder="Enter the Body" value={notes.body} name="body" rows="10" />    
                </div> 
                <div className="row">
                    <label htmlFor="date">Date: {notes.date}</label>
                    <input type="date" name="date" />    
                </div> 
                <br/>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default Create

import React from 'react'
import Create from './notes/Create'
import Edit from './notes/Edit'
import Home from './notes/Home'
import Nav from './notes/Nav'
import {BrowserRouter, BrowserRouter as Router, Route} from 'react-router-dom'

const Notes = ({setIsLogin}) => {
    return (
        <BrowserRouter>
            <div>
                <Nav setIsLogin={setIsLogin} />
                <section>
                    <Route path="/" component={Home} exact />
                    <Route path="/create" component={Create} exact  />
                    <Route path="/edit/:id" component={Edit} exact  />
                </section>
            </div>
        </BrowserRouter>
    )
}

export default Notes

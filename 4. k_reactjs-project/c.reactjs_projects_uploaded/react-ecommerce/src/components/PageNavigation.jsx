import React from 'react'
import { Link } from 'react-router-dom'
import './css/PageNavigation.css'

const PageNavigation = ({ name }) => {
    return (
        <div>
            <p className='pageNavigationHeader'> <Link to='/'> <strong style={{ color: '#245eaa' }}>Home </strong> /</Link> {name} </p>

        </div>
    )
}

export default PageNavigation

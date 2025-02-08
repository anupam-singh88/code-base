import React, { useState, useEffect } from 'react'
import './Nav.css';
// import './Row.css';

function Nav() {
	const [show, handleShow] = useState(false);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 250) {
				handleShow(true);
			} else handleShow(false);
		})
		return () => {
			window.removeEventListener("scroll")
		}
	}, [])
	return (
		<div className={`nav ${show && "nav__black"}`} >
			<img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" alt="Netflix Logo  " />
		</div >
	)
}

export default Nav

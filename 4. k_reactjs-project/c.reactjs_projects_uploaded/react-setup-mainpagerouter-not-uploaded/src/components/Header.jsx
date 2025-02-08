import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const navItems = [
        {
            name: "Component 1",
            slug: "/component1",
        },
        {
            name: "Component 2",
            slug: "/component2",
        },
    ];

    return (
        <header style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: 'purple',
            color: 'white',
        }}>
            <div>
                <Link to="/" style={{
                    textDecoration: "none",
                    color: 'white', // Ensure the text color matches
                }}>Home</Link>
            </div>
            <ul style={{
                display: "flex",
                listStyleType: "none",
                justifyContent: "space-between",
                margin: 0,
                padding: 0,
            }}>
                {
                    navItems.map((item, index) => (
                        <li key={index} style={{
                            margin: '0 10px',
                        }}>
                            <NavLink
                                to={item.slug}
                                style={({ isActive }) => ({
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderBottom: isActive ? '2px solid yellow' : 'none', // Apply underline when active
                                    paddingBottom: '2px' // Adjust padding if needed
                                })}
                            >
                                {item.name}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </header>
    );
};

export default Header;

import React from 'react'
import { Menu } from 'antd'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardOutlined, HomeOutlined, PoweroffOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import './index.css'
const SideMenu = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            height: '100vh'
        }}>
            <Header />
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                <SidMenu />
                <Content />
            </div>
            <Footer />
            {/* <SidMenu /> */}
        </div>

    )
}
function Header() {
    return (
        <div style={{
            height: 60,
            backgroundColor: 'lightskyblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        }}>
            Header
        </div>
    )
}
function Footer() {
    return (
        <div style={{
            height: 60,
            backgroundColor: 'lightgrey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        }}>
            Footer
        </div>
    )
}
function SidMenu() {
    const navigate = useNavigate();
    return (
        <Menu
            onClick={({ key }) => {
                if (key === 'signout') {
                    //? todo signout the user here
                } else {
                    navigate(key)
                }
            }}
            defaultSelectedKeys={[window.location.pathname]}
            items={[
                {
                    label: 'Home',
                    icon: <HomeOutlined />,
                    key: "/"
                },
                {
                    label: 'Dashboard',
                    icon: <DashboardOutlined />,
                    key: "/dashboard"


                },
                {
                    label: 'User List',
                    icon: <UnorderedListOutlined />,
                    key: "/userList",
                    children: [
                        {
                            label: 'Active Users',
                            key: '/activeUsers'
                        },
                        {
                            label: 'Disabled Users',
                            key: '/disabledUsers'
                        }
                    ]

                },
                {
                    label: 'Profile',
                    icon: <UserOutlined />,
                    key: "/profile"


                },
                {
                    label: 'SignOut',
                    icon: <PoweroffOutlined />,
                    danger: true,
                    key: "/signout"

                },
            ]}>

        </Menu>
    )
}
function Content() {
    const Home = () => {
        return (
            <div>
                <h1>This is a home component</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, rem commodi enim hic iure quo error ad iusto, quam veritatis exercitationem accusantium reiciendis, pariatur mollitia.</p>
            </div>
        )
    }
    return <div>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<div>Dashboard</div>}></Route>
            <Route path='/userList' element={<div>userlist</div>}></Route>
            <Route path='/profile' element={<div>profile</div>}></Route>
            <Route path='/disabledUsers' element={<div>Disabled Users</div>}></Route>
            <Route path='/activeUsers' element={<div>Active Users</div>}></Route>
        </Routes>
    </div>
}
export default SideMenu

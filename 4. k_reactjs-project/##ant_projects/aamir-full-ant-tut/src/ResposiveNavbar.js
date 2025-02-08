// import React, { useState } from 'react'
// import { Drawer, Menu } from 'antd'
// const ResposiveNavbar = () => {
//     const [openMenu, setOpenMenu] = useState(true);
//     return (
//         <div style={{
//             height: '100vh',
//             backgroundColor: 'lightcoral'
//         }}>
//             <AppMenu />
//             <Drawer
//                 open={openMenu}
//                 closable={false}
//                 bodyStyle={{
//                     backgroundColor: 'orange',
//                     fontSize: '25',
//                     border: 'none'
//                 }}
//                 onClose={() => {
//                     setOpenMenu(false)
//                 }}
//             >
//                 <AppMenu isInline={true} />
//             </Drawer>
//         </div>
//     )
// }

// function AppMenu({ isInline = false }) {
//     return (
//         <Menu
//             style={{
//                 backgroundColor: 'lightgoldenrodyellow',
//                 fontSize: 23
//             }}
//             mode={isInline ? 'inline' : 'horizontal'}
//             items={
//                 [
//                     {
//                         label: 'Home',
//                         key: 'home'
//                     },
//                     {
//                         label: 'About',
//                         key: 'about'
//                     },
//                     {
//                         label: 'Contact',
//                         key: 'contact'
//                     },
//                     {
//                         label: 'Career',
//                         key: 'career'
//                     },
//                 ]
//             }>

//         </Menu>
//     )
// }
// export default ResposiveNavbar
import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header } = Layout;

const ResponsiveNavbar = () => {
    const [collapsed, setCollapsed] = React.useState(false);

    const toggle = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Header className="header">
            <div className="logo">
                <img src="/logo.svg" alt="logo" />
            </div>
            <Menu
                mode="horizontal"
                theme="dark"
                style={{ lineHeight: '64px' }}
                defaultSelectedKeys={['1']}
                onClick={toggle}
                collapsed={collapsed}
            // overflowedIndicator={<Icon type="menu" />}
            >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">About</Menu.Item>
                <Menu.Item key="3">Contact</Menu.Item>
            </Menu>
        </Header>
    );
};

export default ResponsiveNavbar;


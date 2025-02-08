import React from 'react'
import { Input, Menu, Space } from 'antd'
import { AccountBookFilled, ContactsOutlined, HomeOutlined } from '@ant-design/icons'
const AntMenu = () => {
    return (
        <div >
            <h1>Menu</h1>
            <Space>
                <Menu
                    // mode='inline'

                    // defaultOpenKeys={['about-us']}
                    onClick={(info) => {
                        console.log(info.key)
                    }}
                    items={
                        [
                            {
                                label: <Input.Search placeholder='Search Here...'></Input.Search>,
                                key: 'search',

                            },

                            {
                                label: "Home",
                                key: 'home',
                                icon: <HomeOutlined />
                            },
                            {
                                label: "About Us",
                                key: 'about-us',
                                icon: <AccountBookFilled />,
                                children: [
                                    {
                                        label: 'Our Storya',
                                        key: 'our-storya'
                                    },
                                    {
                                        label: 'Meet the Team',
                                        key: 'meet-the-teama'
                                    }
                                ]
                            },
                            {
                                label: <span style={{ color: 'red' }}>Red</span>,
                                key: '-s',
                                type: 'group',
                                icon: <AccountBookFilled />,
                                children: [{
                                    label: 'Our Story',
                                    key: 'our-storyaa'
                                }, {
                                    label: 'Meet the Team',
                                    key: 'meet-the-teams'
                                }]
                            },
                            {
                                label: "Uss",
                                key: '-ss',
                                type: 'divider',
                                icon: <AccountBookFilled />,
                                children: [{
                                    label: 'Our Storys',
                                    key: 'our-story'
                                }, {
                                    label: 'Meet the Teasm',
                                    key: 'meet-the-teamas'
                                }]
                            },
                            {
                                label: "Contact Us",
                                key: 'contact-us',
                                icon: <ContactsOutlined />,
                                danger: true

                            }
                        ]}
                ></Menu>
            </Space>
        </div>
    )
}

export default AntMenu

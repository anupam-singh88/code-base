import { CopyOutlined, ShareAltOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import React from 'react'

const CustomRightClick = () => {
    const menu = <Menu
        onClick={({ key }) => {
            console.log(key)
        }}
        items={[
            {
                label: 'Copy',
                key: 'copy',
                icon: <CopyOutlined />
            },
            {
                label: 'share',
                key: 'share',
                icon: <ShareAltOutlined />
            },
            {
                label: 'reload',
                key: 'reload',
                icon: <ReloadOutlined />
            },
            {
                label: 'danger',
                key: 'danger',
                icon: <DeleteOutlined />,
                danger: true
            },
        ]}
    >

    </Menu>
    return (
        <div>
            <Dropdown overlay={menu} trigger={'contextMenu'}>
                <div style={{ width: 200, height: 200, backgroundColor: 'lightgrey', border: '1px dashed red', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Right Click ME
                </div>
            </Dropdown>
        </div>
    )
}

export default CustomRightClick

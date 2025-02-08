import { Button, Drawer } from 'antd'
import React, { useState } from 'react'

const AntDrawer = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => {
                setVisible(true)
            }}>Open Drawer</Button>
            <Drawer
                visible={visible}
                title='Drawer Title'
                footer="Drawer Footer"
                closable={true}
                onClose={() => {
                    setVisible(false)
                }}
                // maskClosable={false}
                placement='right' //left bottom top
            >
                <p style={{ margin: 0 }}>Some contents...</p>
                <Button onClick={() => {
                    setVisible(false)
                }}>Close</Button>
            </Drawer>
        </div>
    )
}

export default AntDrawer

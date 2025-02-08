import { Avatar } from 'antd'
import React from 'react'
import { UserOutlined, } from '@ant-design/icons'


const AntAvatar = () => {
    return (
        <div>
            <h1>Ant Design</h1>
            <p><b>Avatars: </b></p>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjx" />
            <br /><br />
            <p><b>Letter Avatars: </b></p>
            <Avatar style={{ backgroundColor: '#f56a00', color: '#fff' }} icon={<UserOutlined />} />
            {/* <Avatar style={{ backgroundColor: '#87d068', color: '#fff' }} icon={<VideoCameraOut />} /> */}
            <Avatar.Group></Avatar.Group>

        </div>
    )
}

export default AntAvatar

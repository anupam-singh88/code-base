import { HeartOutlined } from '@ant-design/icons'
import { Rate, Space } from 'antd'
import React from 'react'

const AntRatingComponent = () => {
    return (
        <div>
            <Space size={12} direction='vertical'>
                <Rate />
                <Rate defaultValue={3} />
                <Rate defaultValue={3} allowHalf allowClear={false} />
                <Rate defaultValue={3} count={3} />
                <Rate defaultValue={3} count={4} style={{ color: 'green' }} character='A' />
                <Rate defaultValue={3} count={4} style={{ color: 'green' }} character={<HeartOutlined />} />
            </Space>
        </div>
    )
}

export default AntRatingComponent

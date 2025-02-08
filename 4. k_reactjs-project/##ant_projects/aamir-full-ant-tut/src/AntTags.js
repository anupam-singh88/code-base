import { Space, Tag } from 'antd'
import React from 'react'

const AntTags = () => {
    return (
        <div>
            <h2>Ant TAGS</h2>
            <Space direction='vertical' size={2}>
                <Tag>Tag</Tag>
                <Tag>Tag2</Tag>
                <Tag
                    color='warning'
                    closable
                    onClose={() => {
                        console.log('Tag Closed')
                    }}
                > closable </Tag>

            </Space>
        </div>
    )
}

export default AntTags

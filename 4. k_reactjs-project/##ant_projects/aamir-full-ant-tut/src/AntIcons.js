import { LoadingOutlined, PieChartFilled } from '@ant-design/icons'
import { Divider } from 'antd'
import React from 'react'

const AntIcons = () => {

    // we can also add custom icons watch the tutorial from code with aamir
    return (
        <div>
            <h1>Ant ICONS</h1>
            <PieChartFilled style={{
                color: 'purple',
                fontSize: 100
            }} />
            <LoadingOutlined
                twoToneColor='green' spin
                rotate={45} style={{
                    color: 'red',
                    fontSize: 100
                }} />
            <Divider />
        </div>
    )
}

export default AntIcons

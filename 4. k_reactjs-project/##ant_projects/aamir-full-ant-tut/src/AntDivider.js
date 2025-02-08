import React from 'react'
import { Divider } from 'antd'

const AntDivider = () => {
    return (
        <div>
            <Divider style={{ borderColor: 'red' }} dashed />
            <Divider style={{ borderColor: 'red' }}
                orientation='left'
                orientationMargin={23}
                type='vertical'
            >TExt</Divider>
        </div>
    )
}

export default AntDivider

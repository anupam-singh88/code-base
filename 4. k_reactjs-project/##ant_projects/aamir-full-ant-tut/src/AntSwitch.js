import { CheckCircleOutlined } from '@ant-design/icons'
import { Space, Switch } from 'antd'
import React from 'react'

const AntSwitch = () => {
    return (
        <div >
            <Space size={12} direction='vertical'>
                <Switch /><br />
                <Switch defaultChecked={true} />
                <Switch defaultChecked={true} checkedChildren='on' unCheckedChildren='of longer texzt' />
                <Switch defaultChecked={false} checkedChildren={<CheckCircleOutlined />} unCheckedChildren='of longer texzt' onChange={(checked) => { console.log(checked) }} disabled={true} loading={true} />
            </Space>
        </div>
    )
}

export default AntSwitch

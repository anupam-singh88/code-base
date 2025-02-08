import { Calendar } from 'antd'
import React from 'react'

const AntCalender = () => {
    return (
        <div>
            <Calendar onSelect={(date) => {
                console.log(date)
            }}
            // disabledDate={}
            />
        </div>
    )
}

export default AntCalender

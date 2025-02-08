import { AutoComplete } from 'antd'
import React from 'react'

const AntAutoComplete = () => {
    const options = [
        {
            label: 'One',
            key: 'one'
        },
        {
            label: 'Two',
            key: 'twp'
        },
        {
            label: 'Three',
            key: 'three'
        },
    ]
    return (
        <div>
            <AutoComplete style={{ width: 200 }} placeholder='Type Here...' options={options} filterOption={true} onSelect={(value) => {
                console.log(value)
            }}
                onSearch={(value) => {
                    console.log(value)
                }}
            />
        </div>
    )
}

export default AntAutoComplete

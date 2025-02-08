import React, { useState } from 'react'
import { Input, Table } from 'antd'
const AntGlobalSearch = () => {
    const [searchedText, setSearchedText] = useState('');
    const columns = [
        {
            title: "Name",
            dataIndex: 'name',
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                String(record.name).toLowerCase().includes(value.toLowerCase())
                // String(record.age).toLowerCase().includes(value.toLowerCase()) ||
                // String(record.address).toLowerCase().includes(value.toLowerCase())
            },
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        }
    ]
    const dataSource = [{
        key: 2,
        name: `b ${2}`,
        age: 32 + 2,
        address: `New York No. 1 Lake Park${2}`
    }];
    for (let index = 0; index < 20; index++) {
        dataSource.push({
            key: index,
            name: `A ${index}`,
            age: 32 + index,
            address: `New York No. 1 Lake Park${index}`
        })
    }

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            width: '50%',
            margin: 'auto'
        }}>
            <Input.Search
                placeholder='Search Here...'
                style={{ marginBottom: 8 }}
                onSearch={(value) => {
                    console.log('search value', value);
                    setSearchedText(value)
                }}
                onChange={(e) => {
                    setSearchedText(e.target.value)
                }}
            >
            </Input.Search>
            <Table
                columns={columns}
                dataSource={dataSource}
                filteredValue={searchedText}
                scroll={{ x: true, scrollToFirstRowOnChange: true }} //for adding the scroll bar in horizontal direction
                width={400}
            >

            </Table>

        </div >
    )
}

export default AntGlobalSearch

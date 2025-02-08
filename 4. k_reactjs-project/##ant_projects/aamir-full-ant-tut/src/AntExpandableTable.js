import React, { useState } from 'react'
import { Table } from 'antd'
import './index.css'
import { PlusCircleTwoTone, MinusCircleTwoTone } from '@ant-design/icons'

const AntExpandableTable = () => {
    const dataSource = [];
    for (let index = 1; index < 500; index++) {
        dataSource.push({
            key: index,
            name: 'Name ' + index,
            age: index,
            address: 'Address ' + index,
            description: 'Description ' + index
        })
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Age',
            dataIndex: 'age'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },

    ]
    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                expandable={{
                    rowExpandable: (record) => record.age < 6,
                    expandedRowRender: (record) => {
                        if (record.age == 4) {
                            return (<Table
                                dataSource={dataSource}
                                columns={columns}
                            >{record.description}</Table>)
                        }
                        return <p>{record.description}</p>
                    },
                    // defaultExpandAllRows:true
                    // defaultExpandedRowKeys: [1, 2]
                    expandRowByClick: true,
                    expandIcon: ({ expanded, onExpand, record }) => {
                        if (record.age > 6) return null;
                        return expanded ? <MinusCircleTwoTone onClick={(e) => {
                            onExpand(record, e)
                        }} /> : <PlusCircleTwoTone onClick={(e) => {
                            onExpand(record, e)
                        }} />
                    }
                }}
            >

            </Table>
        </div>
    )
}

export default AntExpandableTable

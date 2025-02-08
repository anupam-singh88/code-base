import React, { useState } from 'react'
import { Table, Tag } from 'antd'
const AntSelectTable = () => {

    const [alreadySelectedRows, setAlreadySelectedRows] = useState(['1', '3'])

    const columns = [
        {
            title: "Student Id",
            dataIndex: 'id',
        },
        {
            title: "Student Name",
            dataIndex: 'name',
        },
        {
            title: "Student Grade",
            dataIndex: 'grade',
            render: (tag) => {
                const color = tag.includes('A') ? 'Green' : tag.includes('B') ? "purple" : tag.includes('C') ?
                    "red" : "volcano";
                return <Tag color={color} key={tag}>{tag}</Tag>
            }
        },
    ]

    const dataSource = [
        {
            key: '1',
            id: '1',
            name: 'Student Name 1',
            grade: 'A'
        },
        {
            key: '2',
            id: '2',
            name: 'Student Name 2',
            grade: 'B+'
        },
        {
            key: '3',
            id: '3',
            name: 'Student Name 3',
            grade: 'C'
        },
        {
            key: '4',
            id: '4',
            name: 'Student Name 4',
            grade: 'D'
        }
    ]
    return (
        <div>
            <h1>Select Fields</h1>
            <Table
                style={{ width: '50%' }}
                columns={columns}
                dataSource={dataSource}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: alreadySelectedRows,
                    onChange: (keys) => {
                        setAlreadySelectedRows(keys)
                    },
                    onSelect: (record) => {
                        console.log(record);
                    },
                    // hideSelectAll: true,
                    selections: [
                        Table.SELECTION_NONE,
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        {
                            key: 'even',
                            text: 'Select Even Rows',
                            onSelect: (allKeys) => {
                                const selectedKeys = allKeys.filter(key => {
                                    return key % 2 == 0
                                })
                                setAlreadySelectedRows(selectedKeys)
                            }
                        },
                        {
                            key: 'excellent',
                            text: 'Select Student with excellent grades',
                            onSelect: (allKeys) => {
                                const selectedKeys = allKeys.filter(key => {
                                    const isExcellent = dataSource.find(student => {
                                        return student.key == key && student.grade.includes('A');
                                    })
                                    return isExcellent;
                                })
                                setAlreadySelectedRows(selectedKeys)
                            }
                        }
                    ]
                    // getCheckboxProps: (record) => ({
                    //     disabled: record.grade === 'C'
                    // })
                    // getCheckboxProps: (record) => {
                    //     if (alreadySelectedRows.includes(record.id)) {
                    //         return ({ disabled: true })
                    //     } else {
                    //         return {}
                    //     }

                    // }
                }}
            ></Table>
        </div>
    )
}

export default AntSelectTable

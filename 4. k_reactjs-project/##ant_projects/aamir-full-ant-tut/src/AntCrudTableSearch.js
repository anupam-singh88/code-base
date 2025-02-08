import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Table, Button, Modal, Input } from 'antd'
import React, { useState } from 'react'

const AntCrudTable = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null)

    const columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
                return <>
                    <Input
                        autoFocus
                        placeholder='Type Your Text Here'
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(e.target.value ? [e.target.value] : [])
                            confirm({ closeDropdown: false })
                        }}
                        onPressEnter={() => {
                            confirm();
                        }}
                        onBlur={() => {
                            confirm()
                        }}

                    ></Input>
                    <Button onClick={() => {
                        confirm()
                    }} type='primary'>Search</Button>
                    <Button onClick={() => {
                        clearFilters()
                    }} type='primary'>Reset</Button>
                </>;
            },
            filterIcon: () => {
                return <SearchOutlined />
            },
            onFilter: (value, record) => {
                return record.name.toLowerCase().includes(value.toLowerCase())
            }
        },
        {
            key: '2',
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: '3',
            title: 'Email',
            dataIndex: 'email',
        },
        {
            key: '4',
            title: 'Address',
            dataIndex: 'address',
        },
        {
            key: '5',
            title: 'Actions',
            // dataIndex: 'address',
            render: (record) => {
                return <>
                    <EditOutlined
                        onClick={() => { editStudent(record) }}
                    />
                    <DeleteOutlined style={{
                        color: 'red',
                        marginLeft: 12
                    }}
                        onClick={() => {
                            onDeleteStudent(record)
                        }} />
                </>
            }
        },
    ]



    const [dataSource, setDataSource] = useState([
        { id: 1, name: 'John Brown', email: 'john@example.com', address: 'New city No.', key: '1' },
        { id: 2, name: ' Brown', email: 'j@example.com', address: 'New York No.', key: '2' },
        { id: 3, name: 'John ', email: 'amir@example.com', address: 'New ', key: '3' },
        { id: 4, name: 'John singh', email: 'greeb@example.com', address: 'New York ', key: '4' },
    ])

    const onAddStudent = () => {
        setDataSource(pre => {
            const newStudent = {
                id: 5, name: 'John smiliga', email: 'john@dummy.com', address: 'New city No.', key: '5'
            }
            return [...pre, newStudent]
        })
    }

    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: `Are you sure delete this student?`,
            okText: "Yes",
            okType: 'danger',
            cancelText: "No!",
            icon: <ExclamationCircleOutlined />,
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter((item) => { return item.id !== record.id })
                })
            }
        })
    }

    const editStudent = (record) => {
        setIsEditing(true)
        setEditingStudent({ ...record })

    }
    const resetEditing = () => {
        setEditingStudent(null);
        setIsEditing(false)
    }
    return (
        <div className='container'>

            <Button
                style={{
                    margin: '20px'
                }}
                onClick={onAddStudent}
            >Add a New Student</Button>
            <Table
                columns={columns}
                dataSource={dataSource}
            >


            </Table>
            <Modal
                title='Edit Student'
                // visible={isEditing}
                open={isEditing}
                // footer={null}
                // closable={true}
                // maskClosable={false}
                width="60%"
                okText='Save'
                // destroyOnClose={true}
                // afterClose={() => { setIsEditing(false) }}
                onCancel={() => {
                    resetEditing()

                }}
                onOk={() => {
                    setDataSource(pre => {
                        // let newData= [...pre];
                        // newData[newData.findIndex(item => item.id === editingStudent?.id)] = editingStudent;
                        // return newData; 

                        return pre.map(student => {
                            if (student.id === editingStudent.id) {
                                return editingStudent;
                            } else {
                                return student;
                            }
                        })

                    })
                    resetEditing()
                }}

            >
                <Input value={editingStudent?.name} onChange={(e) => {
                    setEditingStudent(pre => {
                        return { ...pre, name: e.target.value }
                    })
                }}></Input>
                <Input value={editingStudent?.email} onChange={(e) => {
                    setEditingStudent(pre => {
                        return { ...pre, email: e.target.value }
                    })
                }}></Input>
                <Input value={editingStudent?.address} onChange={(e) => {
                    setEditingStudent(pre => {
                        return { ...pre, address: e.target.value }
                    })
                }}></Input>

            </Modal>
        </div>
    )
}

export default AntCrudTable

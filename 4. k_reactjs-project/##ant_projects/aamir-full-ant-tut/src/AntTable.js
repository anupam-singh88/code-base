import React, { useEffect, useState } from 'react'
import { Table } from 'antd'

const AntTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [pageSize, setPagesize] = useState(5)
    const columns = [
        //sample key getting from api
        // {
        //     "userId": 1,
        //     "id": 1,
        //     "title": "delectus aut autem",
        //     "completed": false
        //   },
        {
            key: '1',
            title: 'ID',
            dataIndex: 'id',
        },
        {
            key: '2',
            title: 'User ID',
            dataIndex: 'userId',
            sorter: (record1, record2) => {
                return record1.userId - record2.userId;
            }
        },
        {
            key: '3',
            title: 'Status',
            dataIndex: 'completed',
            render: (completed) => {
                // console.log(payload)
                return <p>{completed ? 'Completed' : "In Progress"}</p>
            },
            filters: [
                { text: 'Complete', value: true },
                { text: 'In Progress', value: false }
            ],
            onFilter: (value, record) => {
                return record.completed === value
            }
        },
    ]

    useEffect(() => {
        setLoading(true)
        fetch('https://jsonplaceholder.typicode.com/todos').then(response => response.json()).then(data => {
            setDataSource(data)
        }).catch(err => console.log(err)).finally(() => {
            setLoading(false);
        })

    }, [])
    return <>
        <h1>Ant Design Table</h1>
        <Table
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            pagination={{
                current: page, //by default page starts from 3rd page
                pageSize: pageSize,
                // total: 500,
                onChange: (page, pageSize) => {
                    setPage(page);
                    setPagesize(pageSize)
                }
            }
            }

        ></Table>
    </>
}

export default AntTable

// const AntTable = () => {

//     const data = [
//         {
//             name: "Name 1",
//             age: 10,
//             address: "Address 1",
//             key: '1'
//         },
//         {
//             name: "Name 2",
//             age: 20,
//             address: "Address 2",
//             key: '2'
//         },
//         {
//             name: "Name 3",
//             age: 30,
//             address: "Address 3",
//             key: '3'
//         },
//         {
//             name: "Name 4",
//             age: 40,
//             address: "Address 4",
//             key: '4'
//         },
//     ]

//     const columns = [
//         {
//             title: "Name",
//             dataIndex: 'name',
//             key: 'key',
//             // render: name => {
//             //     return <a onClick={}>{name}</a>
//             // }
//         },
//         {
//             title: "Age",
//             dataIndex: 'age',
//             key: 'key',
//             sorter: (a, b) => a.age - b.age
//         },
//         {
//             title: "Address",
//             dataIndex: 'address',
//             key: 'key'
//         },
//         {
//             title: "Graduated",
//             // dataIndex: 'graduated',
//             key: 'key',
//             render: (payload) => {
//                 return <p>{payload.age > 20 ? 'True' : 'False'}</p>
//             }
//         },
//         // {
//         //     title: "Address",
//         //     dataIndex: 'address',
//         //     key: 'key'
//         // }
//     ]

//     return (
//         <div className='container'>
//             <Table
//                 dataSource={data}
//                 columns={columns}
//             // pagination='1'
//             ></Table>
//         </div>
//     )
// }
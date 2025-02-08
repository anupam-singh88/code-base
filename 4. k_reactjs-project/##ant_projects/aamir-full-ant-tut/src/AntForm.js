import React, { useState } from 'react'
import { Form, Input, Button, message, Alert, DatePicker, TimePicker, Select } from 'antd'
import './App.css'
const AntForm = () => {
    const [showAlert, setShowAlert] = useState(false);
    const gender = ['Male', 'Female', 'Transgender']
    const onFinish = (e) => {
        //e will get the all the form data as an objects
        console.log(e);
        setTimeout(() => {
            setShowAlert(true)
            message.success('Login Successful')
            // message.error('Login Successful')
            // message.warning('Login Successful')
        }, 1000);
    }
    return (
        <div className='container'>
            <h1>Ant form</h1>
            {
                showAlert && <Alert type='error' message='error' description='Some Error Occured While Processing' closable />
            }
            <Form onFinish={onFinish}>
                <Form.Item label='Username' name='username'>
                    <Input placeholder='Enter your username' allowClear required></Input>
                </Form.Item>

                <Form.Item label='Password' name='password' >
                    <Input.Password
                        placeholder='Enter your password'
                        // type='password'
                        required
                        allowClear>
                    </Input.Password>
                </Form.Item>
                <Form.Item label='Confirm Password' name='cpassword' >
                    <Input.Password
                        placeholder='Confirm your password'
                        // type='password'
                        required
                        allowClear>
                    </Input.Password>
                </Form.Item>
                <Form.Item label='Date' name='date' >
                    {/* <DatePicker picker='year' /> */}
                    <DatePicker.RangePicker picker='month' />
                </Form.Item>
                <Form.Item label='Time' name='time' >
                    <TimePicker />

                </Form.Item>
                <Form.Item label="Select Gender">
                    <Select
                        placeholder='Select Fruit'
                        style={{ width: '50%', margin: "20px" }}
                        mode='multiple'
                        maxTagCount={2}
                        allowClear
                    >
                        {gender.map((elm, index) => {
                            return <Select.Option key={index} value={elm}>{elm}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType='submit' block>Login</Button>
                </Form.Item>
                <Form.Item>
                    <Input type='checkbox'></Input>
                    <p>Agree to our Terms and Condition</p>
                </Form.Item>

            </Form>
        </div>
    )
}

export default AntForm

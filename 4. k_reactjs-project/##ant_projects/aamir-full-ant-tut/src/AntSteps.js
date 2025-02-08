import React, { useState } from 'react'
import { Divider, Space, Steps } from 'antd';

const { Step } = Steps;
const AntSteps = () => {
    const [current, setCurrent] = useState(1);
    return (
        <div>
            <Space direction='vertical'>
                <Steps current={1}>
                    <Step title='Finished'></Step>
                    <Step title='In Progress'></Step>
                    <Step title='Started'></Step>
                </Steps>
                <Divider />
                <Steps current={current} labelPlacement='vertical' onChange={(c) => {
                    setCurrent(c)
                }}>
                    <Step title='Finished'></Step>
                    <Step title='In Progress'></Step>
                    <Step title='Started'></Step>
                </Steps>
                <Divider />
                <Steps direction='vertical' current={current} labelPlacement='vertical' onChange={(c) => {
                    setCurrent(c)
                }} progressDot={true} percent={75} status='error'>
                    <Step title='Finished' ></Step>
                    <Step title='In Progress' subTitle='2 min'></Step>
                    <Step title='Started' description='initiate after step 2'></Step>
                </Steps>
            </Space>
        </div>
    )
}

export default AntSteps

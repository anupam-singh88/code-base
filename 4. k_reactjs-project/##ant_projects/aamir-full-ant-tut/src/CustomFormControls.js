import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'

function PlayerScore({ }) {
    let [playerScore, setPlayerScore] = useState(0);
    return <div style={{
        display: 'flex',
        width: '30%'
    }}>
        <Button
            onClick={(value) => {
                console.log(value)
                setPlayerScore(playerScore--)
            }}>
            -
        </Button>
        <Input
            value={playerScore}>

        </Input>
        <Button
            onClick={() => {
                setPlayerScore(playerScore++)
            }}
        >
            +
        </Button>
    </div>
}

const CustomFormControls = () => {
    return (
        <div>
            <Form

                onFinish={(values) => {
                    // console.log(values.playerName)
                    alert(values.playerName)
                }}
                onFinishFailed={(failedValues) => {
                    console.log({ failedValues })
                }}
            >
                <Form.Item
                    name={'playerName'}
                    label='Player Name'
                    required
                    rules={[{
                        required: true,
                        message: "Please enter your name"
                    }]}
                >
                    <Input></Input>

                </Form.Item>
                <Form.Item
                    name={'playerScore'}
                    label='Player Score'
                    required
                    rules={[{
                        required: true,
                        message: "Please enter your score "
                    }]}
                >
                    <PlayerScore />
                </Form.Item>
                <Button
                    htmlType='submit'
                    type='primary'
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CustomFormControls

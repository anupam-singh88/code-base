import './App.css';
import { Button, Input, Select } from 'antd';
import { useState } from 'react';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons'

function App() {
  const [loading, setLoading] = useState(false);
  const onButtonClick = (e) => {
    setLoading(true);
    // console.log(e);

    setTimeout(() => {
      setLoading(false)
    }, 2000);

  }

  const fruits = ['appple', 'mango', 'banana', 'cherry']
  return (
    <div className="App">
      <header className="App-header">
        {/* <Input.Search style={{ margin: '23px' }}></Input.Search> */}
        <Input
          placeholder='Enter Your Details'
          maxLength={30}
          type='text'
          prefix={<UserOutlined />}
          // suffix={}

          style={{ width: "50%", margin: "20px" }}
        // disabled={true}
        ></Input>
        <Select
          placeholder='Select Fruit'
          style={{ width: '50%', margin: "20px" }}
          mode='multiple'
          maxTagCount={2} //onlt two tags can be shown on screen rest as ...
          allowClear
        >
          {fruits.map((elm, index) => {
            return <Select.Option key={index} value={elm}>{elm}</Select.Option>
          })}
        </Select>


        <Button
          loading={loading}
          type='primary'
          // href='https://www.google.com' for adding a link to the button
          // block //for full width
          onClick={onButtonClick}
          icon={<PoweroffOutlined />}
          style={{ backgroundColor: 'red', fontSize: "23px", padding: '15px', textAlign: 'center', height: 'auto' }}
          className='custom-class'
        >
          First ATND Button
        </Button>
      </header>
    </div>
  );
}

export default App;

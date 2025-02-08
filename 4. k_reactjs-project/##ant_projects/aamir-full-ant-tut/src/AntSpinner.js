import { Spin, Button } from 'antd'
import React, { useState } from 'react'


//* most of the components in ant design has spinner but some component not there we can use this spin component
const AntSpinner = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className='container'>
      <h1>Spinner</h1>
      <Spin spinning={loading} >

        <p>My name is anthony</p>
      </Spin>
      <Button
        type='primary'
        style={{ margin: '20px' }}
        onClick={() => {
          setLoading(preValue => !preValue)
        }}
      >Toggle Spinning</Button>
    </div>
  )
}

export default AntSpinner

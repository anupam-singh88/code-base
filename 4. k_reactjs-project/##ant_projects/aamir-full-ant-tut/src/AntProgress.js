import { Progress } from 'antd'
import React from 'react'

const AntProgress = () => {
  return (
    <div className='container'>
      <h1>
        Progress baby
      </h1>

      <Progress percent={33} status='active' />
      <Progress percent={33} status='success' steps={3} type='line' />
      <Progress percent={33} type='circle' strokeColor='red' strokeWidth={20} />


      {/* some other status options are active circle success exception */}
    </div>
  )
}

export default AntProgress

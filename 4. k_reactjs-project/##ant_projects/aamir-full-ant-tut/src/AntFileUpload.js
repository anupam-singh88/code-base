import { Button, Spin, Upload } from 'antd'
import React from 'react'

const AntFileUpload = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            {/* <Upload action='<URLWEHRETOSAVEFILE>'> */}
            <Upload.Dragger
                multiple
                listType='picture'
                showUploadList={{ showRemoveIcon: false }}
                // accept='.png,.jpeg,.doc'
                beforeUpload={file => {
                    console.log(file.size)
                }}
                // fileList={}
                defaultFileList={[
                    {
                        uid: 'abc',
                        name: 'file.png',
                        url: 'https://www.google.com',
                        status: "uploading",
                        percent: 50
                    }
                ]}

                iconRender={() => {
                    return <Spin></Spin>
                }}
                // itemRender={(existingCom, file) => {
                //     return <p>{file.name}</p>
                // }}
                progress={{
                    strokeWidth: 3,
                    strokeColor: 'red'
                }}
            >
                Drag Files here or <br />
                <Button style={{ width: '100%', margin: '12px 0' }}>Upload</Button>
            </Upload.Dragger>
        </div>
    )
}

export default AntFileUpload

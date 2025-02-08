import { Skeleton } from 'antd'
import React from 'react'

const AntSkeletonLoader = () => {
    return (
        <div>
            <Skeleton
                loading={false}
                active
                avatar={{ shape: 'square' }}
                title={{ width: 200 }}
                paragraph={{
                    rows: 3,
                    // width: 100 //set the width of last row
                    width: [100, 200]
                }}

            >
                <h1>Data Available now</h1>
            </Skeleton>

            <Skeleton.Avatar active>Active</Skeleton.Avatar>
            <Skeleton.Button active></Skeleton.Button>
            <Skeleton.Image active></Skeleton.Image>
            <Skeleton.Node active> <h5>loading</h5></Skeleton.Node>
        </div>
    )
}

export default AntSkeletonLoader

import React, { useState } from 'react'
import { Space, Tabs } from 'antd'
import { ApiOutlined } from '@ant-design/icons'
const AntTab = () => {
    const [tabList, setTabList] = useState([
        {
            tab: 'tab1', key: '1'
        },
        {
            tab: 'tab2', key: '2'
        },
    ]);

    return (
        <div>

            {/* tabs on top */}
            <Space size={30} direction='vertical'>
                <Tabs defaultActiveKey='1'>
                    <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">Content ohttps://www.youtube.com/f Tab Pane 2</Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 3" key="3">Content of Tab Pane 3</Tabs.TabPane>

                </Tabs>

                {/* tabs on left */}
                <Tabs defaultActiveKey='1' tabPosition='left'>
                    <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
                    <Tabs.TabPane tab={
                        <span><ApiOutlined />Icon</span>
                    } key="3">Content of Tab Pane 3</Tabs.TabPane>

                </Tabs>

                {/* tabs with add or delete */}
                <Tabs defaultActiveKey='1' tabPosition='left'>
                    <Tabs.TabPane tab="Tab 1" key="1">Content of Tab Pane 1</Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">Content of Tab Pane 2</Tabs.TabPane>
                    <Tabs.TabPane tab={
                        <span><ApiOutlined />Icon</span>
                    } key="3">Content of Tab Pane 3</Tabs.TabPane>

                </Tabs>
                {/* tabs with add or delete */}
                <Tabs defaultActiveKey='1' tabPosition='left'>
                    {
                        tabList.map((tabInfo, index) => {
                            return <Tabs.TabPane tab={`Tab ${tabInfo.tab}`} key="1">Content of Tab Pane 1adasdfadsfsf</Tabs.TabPane>

                        })
                    }

                </Tabs>
            </Space>
        </div>
    )
}

export default AntTab



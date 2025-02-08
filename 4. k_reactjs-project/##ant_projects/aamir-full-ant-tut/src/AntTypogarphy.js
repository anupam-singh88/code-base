import React, { useState } from 'react'
import { Typography } from 'antd'
import { CheckCircleFilled, CopyFilled, SearchOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph, Link } = Typography;

const AntTypogarphy = () => {
    const [text, setText] = useState('code with aamir');
    return (
        <div>
            {/* by default h1 to change use level*/}
            <Title>Code with Anupam</Title>
            <Title level={5}>Code with Anupam</Title>

            <Text >Learn Ant Design</Text>
            <Text strong>Learn Ant Design</Text>
            <Text underline>Learn Ant Design</Text>
            <Text mark>Learn Ant Design</Text>
            <Text disabled>Learn Ant Design</Text>
            <Text type='danger'>Learn Ant Design</Text>
            <Link underline href='https://google.com'>Code with aamir</Link>

            <Paragraph
                strong
                editable={{
                    onChange: (value) => {
                        setText(value);
                    },
                    triggerType: "icon/text",
                    tooltip: 'click on the icon to edit',
                    icon: < SearchOutlined />,
                    enterIcon: <CheckCircleFilled />
                }}
                copyable={{
                    tooltips: 'tool to copy',
                    text: 'copy code',
                    icon: <CopyFilled />
                }}

                // ...
                ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: 'Show more'
                }}
            >
                {text}
            </Paragraph>


        </div >
    )
}

export default AntTypogarphy

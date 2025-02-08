// import { Collapse, Typography } from 'antd'
// import React from 'react'

// const AntAccordian = () => {
//     return (
//         <div>
//             <Collapse accordion={true}
//                 defaultActiveKey={['1']}
//                 expandIconPosition='right'
//                 bordered={false}
//                 ghost={true}>
//                 <Collapse.Panel header=
//                     "This is panel header 1" key="1">
//                     <Typography.Text>
//                         This is panel content 1
//                     </Typography.Text>
//                 </Collapse.Panel>
//                 <Collapse.Panel header=
//                     "This is panel header 2" key="2" disabled>
//                     <Typography.Text>
//                         This is panel content 2
//                     </Typography.Text>
//                 </Collapse.Panel>
//             </Collapse>
//         </div>
//     )
// }

// export default AntAccordian
import React from 'react';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
    },
];

const App = () => {
    const onChange = (key) => {
        console.log(key);
    };

    return (
        <Collapse
            defaultActiveKey={['1']}
            onChange={onChange}
            expandIconPosition="right"
        >
            {items.map(item => (
                <Collapse.Panel header={item.label} key={item.key}>
                    {item.children}
                </Collapse.Panel>
            ))}
        </Collapse>
    );
};

export default App;

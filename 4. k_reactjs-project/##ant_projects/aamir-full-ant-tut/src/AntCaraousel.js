// import React, { useRef } from 'react'
// import { Carousel, Button } from 'antd'
// const AntCaraousel = () => {
//     const ref = useRef();
//     const contentStyle = {
//         height: '250px',
//         color: '#fff',
//         lineHeight: '160px',
//         textAlign: 'center',
//         background: '#364d79',
//     };


//     // const MyCarousel = () => (
//     //     <Carousel dotPosition="bottom"
//     //         autoplay
//     //         dots={{
//     //             className: 'my-dots',
//     //         }}

//     //         pauseOnHover={true}
//     //         pauseOnDotsHover={true}
//     //     >
//     //         <div>
//     //             <h3 style={contentStyle}>1</h3>
//     //         </div>
//     //         <div>
//     //             <h3 style={contentStyle}>2</h3>
//     //         </div>
//     //         <div>
//     //             <h3 style={contentStyle}>3</h3>
//     //         </div>
//     //         <div>
//     //             <h3 style={contentStyle}>4</h3>
//     //         </div>
//     //     </Carousel >
//     // );

//     return (
//         <div>
//             <h1>Caraousel</h1>

//             <div >

//                 <Carousel
//                     autoplay
//                     dots={true}
//                     // dotPosition='bottom'
//                     // pauseOnHover={true}
//                     // pauseOnDotsHover={true}
//                     // draggable
//                     ref={ref}
//                     effect='fade'
//                 >
//                     <div><h3 style={contentStyle}>1</h3></div>

//                     <div><h3 style={contentStyle}>2</h3></div>

//                     <div><h3 style={contentStyle}>3</h3></div>

//                     <div><h3 style={contentStyle}>4</h3></div>

//                 </Carousel>

//                 <div>
//                     <Button
//                         onClick={() => {
//                             ref.current.prev();
//                         }}
//                     >Prev</Button>
//                     <Button onClick={() => {
//                         ref.current.goTo(0);
//                     }}>Reset</Button>
//                     <Button onClick={() => {
//                         ref.current.next();
//                     }}>Next</Button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AntCaraousel




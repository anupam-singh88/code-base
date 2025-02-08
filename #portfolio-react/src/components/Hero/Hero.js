import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Header from "../Header/Header";
// import './hero.css'
import { heroData } from '../../resumedata'

import { TypeAnimation } from 'react-type-animation';

import {
  HeroContainer,
  HeroWrapper,
  HeroLeft,
  HeroRight,
  Image,
  ScrollDown,
  ScrollLink,
} from "./HeroElements";


// console.log(heroDataa)
function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main>
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Header toggle={toggle} />
      <HeroContainer>
        <HeroWrapper>
          <HeroLeft>
            <h1>Hi, I'm {heroData.name}</h1>
            <h5>{heroData.type}</h5>
            {/* <p>
              I design and code beautifully simple things, and I love what I do.
            </p> */}
            <TypeAnimation
              sequence={heroData.autoText}
              wrapper="span"
              speed={50}
              style={{ fontSize: '17px', display: 'inline-block', color: 'white' }}
              repeat={Infinity}
            />
            {/* <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                heroData.autoText[0],
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                heroData.autoText[1],
                1000,
                heroData.autoText[2],
                1000,
                heroData.autoText[3],
                1000

                // heroData.map((elm)=>{
                //   return 
                // })
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: '17px', display: 'inline-block', color: 'white' }}
              repeat={Infinity}
            /> */}
          </HeroLeft>
          <HeroRight>
            <Image
              src={heroData.profileImgPath}
              alt="man-svgrepo" style={{
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(123,123,131,1) 47%, rgb(36 35 41) 100%)'
              }}
            />
          </HeroRight>
        </HeroWrapper>

        <div class="text"></div>
        <ScrollDown to="projects">
          <ScrollLink>
            Scroll down
            <img
              src="https://raw.githubusercontent.com/gurupawar/website/main/src/Assets/scroll-down.svg"
              alt="scroll-down"
            />
          </ScrollLink>
        </ScrollDown>
      </HeroContainer>
    </main>
  );
}

export default Hero;

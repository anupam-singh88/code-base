import React from "react";
import SocialIcon from "../SocialIcon/SocialIcon";
import { ContactWrapper, Email } from "./ContactElements";
import { socialLinks } from "../../resumedata";
function Contact() {
  return (
    <ContactWrapper id="contact">
      <div className="Container">
        <div className="SectionTitle">Get In Touch</div>
        <div className="BigCard">
          <Email>
            <span style={{ fontSize: "17px" }}>anupamsingh2389@gmail.com</span>
            {/* <img src="images/gmail.jpg" alt="" style={{
              height: '59px',
              width: '86px'
            }} /> */}
            <a href={`https://api.whatsapp.com/send/?phone=${socialLinks.whatsapp}&text&type=phone_number&app_absent=0`}><img src="images/whatsapp.png" alt="" style={{
              height: '50px',
              width: '50px',
              marginBottom: '8px'
            }} /></a>

            <a
              className="btn PrimaryBtn"
              href={`mailto:${socialLinks.emailId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send Mail
            </a>
          </Email>
        </div>
        <SocialIcon />
      </div>
    </ContactWrapper>
  );
}

export default Contact;

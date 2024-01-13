import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SocialFollow.css';


import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow(){
    return(
  <div>
      
      <a href="https://youtu.be/Bubb94PWO5w?si=j1PAHr3ZUVzif1wR"
        className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a href="https://www.facebook.com/groups/hikingforadventure"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>
      <a href="https://twitter.com/TheHikingGuide" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a href="https://www.instagram.com/hiking.guide/"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
      </div>
    );
}
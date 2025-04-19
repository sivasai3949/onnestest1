import React from 'react';
import { useState } from 'react';
import Div from '../Div';

export default function VideoModal({ videoSrc, bgUrl, variant }) {
  const [iframeSrc, setIframeSrc] = useState('about:blank');
  const [toggle, setToggle] = useState(false);

  const handelClick = () => {
    if (videoSrc) {
      let videoId = null;

      if (videoSrc.includes("youtube.com/watch?v=")) {
        // Extract video ID from "youtube.com/watch?v=" format
        videoId = videoSrc.split("?v=")[1].split("&")[0];
      } else if (videoSrc.includes("youtu.be/")) {
        // Extract video ID from "youtu.be" format
        videoId = videoSrc.split("youtu.be/")[1].split("?")[0];
      }

      if (videoId) {
        setIframeSrc(`https://www.youtube.com/embed/${videoId}`);
      } else {
        console.error("Could not extract video ID from:", videoSrc);
        setIframeSrc("about:blank");
      }
    } else {
      console.error("videoSrc is undefined");
      setIframeSrc("about:blank");
    }

    setToggle(!toggle);
  };

  const handelClose = () => {
    setIframeSrc('about:blank');
    setToggle(!toggle);
  };

  return (
    <>
      <Div
        className={`cs-video_block ${
          variant ? variant : 'cs-style1'
        } cs-video_open cs-bg`}
        style={{ backgroundImage: `url(${bgUrl})` }}
        onClick={handelClick}
      >
        <span className="cs-player_btn cs-accent_color">
          <span />
        </span>
      </Div>
      <Div className={toggle ? 'cs-video_popup active' : 'cs-video_popup'}>
        <Div className="cs-video_popup_overlay" />
        <Div className="cs-video_popup_content">
          <Div className="cs-video_popup_layer" />
          <Div className="cs-video_popup_container">
            <Div className="cs-video_popup_align">
              <Div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={iframeSrc}
                  title="video modal"
                />
              </Div>
            </Div>
            <Div className="cs-video_popup_close" onClick={handelClose} />
          </Div>
        </Div>
      </Div>
    </>
  );
}

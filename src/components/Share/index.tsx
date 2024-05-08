import React from "react";
// import "./styles.css";
import { FacebookShareButton, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function Share() {
  return (
    <div className="flex App gap-1">
      <FacebookShareButton
        url={"https://facebook.com/"}
        hashtag={"#listing"}
        description={"My Listing"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <br />
      <WhatsappShareButton
        url={"https://whatsapp.com/"}
        hashtag={"#listing"}
        description={"My Listing"}
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <br />
      <TwitterShareButton
        title={"My Listing"}
        url={"https://twitter.com/"}
        hashtags={["listing"]}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}

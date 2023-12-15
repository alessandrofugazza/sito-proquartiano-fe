import React from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

const FacebookShare = () => {
  const shareUrl = "https://example.com"; // URL you want to share
  const title = "Check out this amazing page"; // Optional title for the shared content

  return (
    <div>
      <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default FacebookShare;

import React from "react";
import { Button } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon } from "react-share";

const FacebookShare = ({ shareUrl }: { shareUrl: string }) => {
  return (
    <div>
      <FacebookShareButton url={shareUrl} className="Demo__some-network__share-button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
  );
};

export default FacebookShare;

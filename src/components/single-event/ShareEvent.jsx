import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share';

const ShareEvent = () => {
  const getCurrentPageUrl = () => {
    return window.location.href;
  };
  return (
    <div className="flex flex-col gap-3">
      <FacebookShareButton url={getCurrentPageUrl()}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={getCurrentPageUrl()}>
        <FacebookMessengerIcon size={32} round={true} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton url={getCurrentPageUrl()}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
      <LinkedinShareButton url={getCurrentPageUrl()}>
        <LinkedinIcon size={32} round={true} />
      </LinkedinShareButton>
      <EmailShareButton url={getCurrentPageUrl()}>
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
      <TwitterShareButton url={getCurrentPageUrl()}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <TelegramShareButton url={getCurrentPageUrl()}>
        <TelegramIcon size={32} round={true} />
      </TelegramShareButton>
    </div>
  );
};

export default ShareEvent;

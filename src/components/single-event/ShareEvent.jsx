import React, { useState } from 'react';
import { MdShare } from 'react-icons/md';
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
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  TEModal,
  TEModalContent,
  TEModalDialog,
  TERipple
} from 'tw-elements-react';

const ShareEvent = ({ urlToShare }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <TERipple rippleColor="white">
        <button
          type="button"
          className="flex items-center justify-center gap-2 p-3 py-2 text-white bg-blue-500 border-2 border-white border-opacity-50 focus:outline-none"
          onClick={() => setIsOpen(true)}
        >
          <MdShare />
          Share
        </button>
      </TERipple>

      <TEModal show={isOpen} setShow={setIsOpen} scrollable>
        <TEModalDialog centered>
          <TEModalContent>
            <div className="flex flex-wrap items-center justify-center w-full gap-3 p-4 mx-auto shadow bg-gray-50 md:p-10 lg:p-16 rounded-xl">
              <FacebookShareButton url={urlToShare}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <FacebookMessengerShareButton url={urlToShare}>
                <FacebookMessengerIcon size={32} round={true} />
              </FacebookMessengerShareButton>
              <WhatsappShareButton url={urlToShare}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <LinkedinShareButton url={urlToShare}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
              <EmailShareButton url={urlToShare}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
              <TwitterShareButton url={urlToShare}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <TelegramShareButton url={urlToShare}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <CopyToClipboard text={urlToShare} onCopy={handleCopy}>
                <button className="flex items-center justify-center gap-2 p-3 py-2 mt-2 text-white bg-blue-500 border-2 border-white border-opacity-50 focus:outline-none">
                  {isCopied ? 'Copied' : 'Copy Link'}
                </button>
              </CopyToClipboard>
            </div>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
};

export default ShareEvent;

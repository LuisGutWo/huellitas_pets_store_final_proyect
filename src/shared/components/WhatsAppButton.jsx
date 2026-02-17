import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const WhatsAppButton = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Hola. En que te podemos ayudar?
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <a
          rel=""
          href="https://api.whatsapp.com/send?phone=56920390272&text=Hola, bienvenido a Huellitas. En que podemos ayudarte...😀"
          className="btn-wsp"
          target="_blank"
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/login-huellitas.appspot.com/o/wa_chat_icon.png?alt=media&token=ce6cb743-6822-4223-9279-0bdd5efe6677"
            alt=""
            className="wsp-image"
          />
        </a>
      </OverlayTrigger>
    </>
  );
};

export default WhatsAppButton;

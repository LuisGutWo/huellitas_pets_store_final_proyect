import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import type { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./WhatsAppButton.scss";

const WhatsAppButton: React.FC = () => {
  const renderTooltip = (props: OverlayInjectedProps) => (
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
          rel="noopener noreferrer"
          href="https://api.whatsapp.com/send?phone=56920390272&text=Hola, bienvenido a Huellitas. En que podemos ayudarte...😀"
          className="btn-wsp"
          target="_blank"
          title="Contáctanos por WhatsApp"
        >
          <WhatsAppIcon className="wsp-image" aria-hidden="true" />
        </a>
      </OverlayTrigger>
    </>
  );
};

export default WhatsAppButton;

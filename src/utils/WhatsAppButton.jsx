import React from "react";

const WhatsAppButton = () => {
  return (
    <div>
      <section>
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
      </section>
    </div>
  );
};

export default WhatsAppButton;

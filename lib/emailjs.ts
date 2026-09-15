import emailjs from "@emailjs/browser";

const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE;
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

/** Sin credenciales el formulario lo dice en vez de fingir un envío. */
export const isEmailConfigured = Boolean(SERVICE && TEMPLATE && PUBLIC_KEY);

export const sendContactEmail = (form: HTMLFormElement) => {
  if (!isEmailConfigured) {
    return Promise.reject(new Error("email/not-configured"));
  }

  return emailjs.sendForm(SERVICE!, TEMPLATE!, form, { publicKey: PUBLIC_KEY! });
};

import emailjs from "@emailjs/browser";

type SendEmailOptions = {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
};

export const sendContactEmail = (
  form: HTMLFormElement,
  options: SendEmailOptions = {}
) => {
  const serviceId = options.serviceId ?? import.meta.env.VITE_SERVICE_EMAILJS;
  const templateId = options.templateId ?? import.meta.env.VITE_TEMPLATE_EMAILJS;
  const publicKey = options.publicKey ?? import.meta.env.VITE_FORM_CURRENT;

  return emailjs.sendForm(serviceId, templateId, form, publicKey);
};

/**
 * Datos de contacto del local.
 *
 * El teléfono vive en una variable de entorno para que el número real no
 * quede en el repositorio. Si no está configurada, el sitio no inventa uno:
 * las filas de teléfono y WhatsApp simplemente no se renderizan, y el correo
 * y el formulario quedan como canal. Misma degradación que Firebase y EmailJS.
 */

const raw = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
const digits = raw ? raw.replace(/\D/g, "") : "";

/** "+56911112222" → "+569 1111 2222". Otros formatos se muestran tal cual. */
const display = (value: string, onlyDigits: string): string => {
  const chileanMobile = /^569(\d{4})(\d{4})$/.exec(onlyDigits);
  if (chileanMobile) {
    return `+569 ${chileanMobile[1]} ${chileanMobile[2]}`;
  }
  return value;
};

export type ContactPhone = {
  /** Para mostrar: "+569 1111 2222". */
  label: string;
  /** Para href="tel:": "+56911112222". */
  tel: string;
  /** Para wa.me: "56911112222". */
  whatsapp: string;
};

export const phone: ContactPhone | null =
  raw && digits.length >= 8
    ? {
        label: display(raw, digits),
        tel: `+${digits}`,
        whatsapp: digits,
      }
    : null;

export const whatsappLink = (message?: string): string | null => {
  if (!phone) return null;
  const base = `https://wa.me/${phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Dato de demostración del proyecto académico, no un local operativo. */
export const address = {
  line1: "San Pablo 3610, local 2",
  line2: "Quinta Normal, Santiago",
  full: "San Pablo 3610, local 2 · Quinta Normal, Santiago",
};

export const email = "agutierrezwong@gmail.com";

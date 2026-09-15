import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
} from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * La tienda se navega entera sin cuenta. Si las credenciales no están
 * configuradas, las pantallas de cuenta lo dicen en vez de reventar: un
 * catálogo caído por una variable de entorno ausente no es aceptable.
 */
export const isAuthConfigured = Boolean(config.apiKey && config.projectId);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;

const getFirebaseAuth = (): Auth => {
  if (!isAuthConfigured) {
    throw new Error("auth/not-configured");
  }

  if (!app) {
    app = getApps()[0] ?? initializeApp(config as Required<typeof config>);
  }

  if (!authInstance) {
    authInstance = getAuth(app);
  }

  return authInstance;
};

/** Devuelve null cuando no hay configuración, para que el provider no falle. */
export const tryGetFirebaseAuth = (): Auth | null =>
  isAuthConfigured ? getFirebaseAuth() : null;

type Credentials = { email: string; password: string };

export const signIn = ({ email, password }: Credentials) =>
  signInWithEmailAndPassword(getFirebaseAuth(), email, password);

export const signUp = ({ email, password }: Credentials) =>
  createUserWithEmailAndPassword(getFirebaseAuth(), email, password);

export const signOutUser = () => signOut(getFirebaseAuth());

export const sendRecoveryEmail = (email: string) =>
  sendPasswordResetEmail(getFirebaseAuth(), email);

/** Mensajes en la lengua del producto: nombran el problema y la salida. */
export const authErrorMessage = (error: unknown): string => {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : "";

  switch (code) {
    case "auth/not-configured":
      return "El acceso con cuenta no está configurado en este despliegue. Puedes seguir comprando como invitado.";
    case "auth/invalid-email":
      return "Ese correo no tiene un formato válido. Revisa que lleve @ y dominio.";
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese correo. Ingresa en vez de crear una nueva.";
    case "auth/weak-password":
      return "La contraseña necesita al menos 6 caracteres.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos. Vuelve a intentar o recupera tu contraseña.";
    case "auth/too-many-requests":
      return "Demasiados intentos seguidos. Espera unos minutos y vuelve a probar.";
    case "auth/network-request-failed":
      return "Se cortó la conexión. Revisa tu red y vuelve a intentar.";
    default:
      return "No pudimos completar la operación. Vuelve a intentar en unos segundos.";
  }
};

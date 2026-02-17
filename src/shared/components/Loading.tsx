import Spinner from "./Spinner";

const Loading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" role="status" aria-live="polite">
      <Spinner size="lg" variant="primary" />
      <span className="visually-hidden">Cargando...</span>
    </div>
  );
};

export default Loading;

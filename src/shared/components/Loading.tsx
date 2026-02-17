import Spinner from "react-bootstrap/Spinner";

const Loading: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {/* The Spinner component is used with "border" animation for a circular loading effect 
          and "info" variant to match the theme's color scheme */}
    </div>
  );
};

export default Loading;

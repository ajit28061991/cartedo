import PropTypes from "prop-types";

const Loader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]}`}
        style={{ borderColor: "currentColor" }}
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default Loader;

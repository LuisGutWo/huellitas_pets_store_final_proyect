import React from "react";
import "./spinner.scss";

/**
 * Spinner Component
 * Displays rotating loading spinner with smooth animation
 *
 * Props:
 * - size: 'sm' | 'md' | 'lg' (default: 'md')
 * - variant: 'primary' | 'secondary' | 'success' | 'light' (default: 'primary')
 * - fullscreen: boolean (default: false) - Shows centered spinner over full screen
 */

const Spinner = ({
  size = "md",
  variant = "primary",
  fullscreen = false,
  overlay = true,
}) => {
  if (fullscreen) {
    return (
      <div className={`spinner-fullscreen ${overlay ? "with-overlay" : ""}`}>
        <div className={`spinner spinner-${size} spinner-${variant}`} />
      </div>
    );
  }

  return <div className={`spinner spinner-${size} spinner-${variant}`} />;
};

export default Spinner;

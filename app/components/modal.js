// components/Modal.js
import React from "react";
import PropTypes from "prop-types";

const Modal = ({ show, onClose, type }) => {
  if (!show) return null;

  return (
    <div className="flex justify-center">
      <div className="success-modal paper">
        <h2 className="font-bold text-2xl">{type}</h2>
        {type === "Errors" && (
          <span className="close" onClick={onClose}>
            &times;
          </span>
        )}
      </div>
      {/* <hr /> */}
      <ul className="text-white text-center text-xl py-2">
        Successfully Submitted Data
      </ul>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

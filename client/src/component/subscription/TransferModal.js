import React, { useState } from "react";
import Modal from "react-modal";
import "./TransferModal.css";

const TransferModal = ({ isOpen, onRequestClose, onTransfer }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();
    onTransfer(amount, description);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="transfer-modal"
    >
      <div className="form-container">
        <h2>Transfer Details</h2>
        <form onSubmit={handleTransfer}>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className="transfer-btn">
            Make Transfer
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default TransferModal;

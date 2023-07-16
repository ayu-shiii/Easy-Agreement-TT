import React, { useState, useEffect } from "react";
import axios from "axios";
import TransferModal from "./TransferModal";
import "./Transactions.css";

const Transactions = () => {
  const [transfers, setTransfers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    fetchData();
    checkButtonDisabled();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://api.nessieisreal.com/accounts/64b234989683f20dd5187cd6/transfers?type=payee&key=50ec4d029df0a5b1867e44cbcfc7a175"
      );
      setTransfers(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const checkButtonDisabled = () => {
    const lastRenewalTime = localStorage.getItem("lastRenewalTime");
    if (
      lastRenewalTime &&
      Date.now() - parseInt(lastRenewalTime) < thirtyDays
    ) {
      setIsButtonDisabled(true);
    }
  };

  const handleTransfer = async (amount, description) => {
    try {
      const transferData = {
        medium: "balance",
        payee_id: "64b234989683f20dd5187cd6",
        transaction_date: new Date().toISOString().split("T")[0],
        status: "pending",
        description,
        amount: parseFloat(amount),
      };

      setIsButtonDisabled(true);
      await axios.post(
        "http://api.nessieisreal.com/accounts/64b234989683f20dd5187cd6/transfers?key=50ec4d029df0a5b1867e44cbcfc7a175",
        transferData
      );

      fetchData();
    } catch (error) {
      console.log("Error making transfer:", error);
    } finally {
      closeModal();
      localStorage.setItem("lastRenewalTime", Date.now());
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, thirtyDays);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="transfer-heading">Transfer Details</h1>
      <button
        className="renew-btn"
        onClick={openModal}
        disabled={isButtonDisabled}
      >
        Renew Subscription
      </button>
      <TransferModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onTransfer={handleTransfer}
      />
      {transfers.map((transfer) => (
        <div key={transfer._id} className="single-transaction">
          <h3>Transfer ID: {transfer._id}</h3>
          <p>Amount: {transfer.amount}</p>
          <p>Description: {transfer.description}</p>
          <p>Type: {transfer.type}</p>
          <p>Transaction Date: {transfer.transaction_date}</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;

import React from "react";

const defaultStyles = {
  outline: "none",
  backgroundColor: "#0021f5",
  color: "#fff",
  padding: "16px 24px",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
  border: "1px solid #0021f5",
  transition: "all ease 0.4s",
};

const Button = ({ text, chainInfo, style = {} }) => {
  const handleClick = () => {
    if (!chainInfo) {
      throw Error("Chain info in required");
    }

    try {
      if (window.keplr) {
        window.keplr.experimentalSuggestChain(chainInfo);
      } else {
        throw Error(
          "Keplr wallet is not installed. Please install it to continue."
        );
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <button
      style={{ ...defaultStyles, ...style }}
      onClick={handleClick}
      className="add-chain-keplr-btn"
    >
      {text}
    </button>
  );
};

export default Button;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyModal.css";

const QUESTION = "我喜欢怎么称呼你?";
const ANSWER = "小画家";

const VerifyModal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === ANSWER) {
      navigate("/letter");
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="verify-overlay" onClick={onClose}>
      <div
        className={`verify-modal ${shaking ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="verify-close" onClick={onClose}>
          &times;
        </button>
        <div className="verify-icon">&#128274;</div>
        <p className="verify-question">{QUESTION}</p>
        <form onSubmit={handleSubmit}>
          <input
            className={`verify-input ${error ? "verify-input-error" : ""}`}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="请输入答案..."
            autoFocus
          />
          {error && <p className="verify-error">答案不对哦，再想想？</p>}
          <button className="verify-submit" type="submit">
            开启
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyModal;

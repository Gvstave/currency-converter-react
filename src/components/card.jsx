import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ id, avatar, fullName, email }) {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    // Increment count locally
    setCount((prev) => prev + 1);

    // Navigate to the user details (ExtendedCard) page
    navigate(`/user/${id}`);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
    >
      <div>
        <img src={avatar} alt={fullName} />
      </div>
      <div>
        <h3>{fullName}</h3>
        <p>{email}</p>
        <p>clicks: {count}</p>
      </div>
    </div>
  );
}

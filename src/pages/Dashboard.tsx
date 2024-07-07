import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/masuk");
    }
  });

  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Dashboard</h1>
    </div>
  );
}

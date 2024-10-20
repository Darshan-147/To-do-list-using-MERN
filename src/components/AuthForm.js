import { useState } from "react";

const AuthForm = ({ onSubmit, type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input
        type="email"
        placeholder="Provide your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{type === "login" ? "Log In" : "Sign Up"}</button>
    </form>
  );
};

export default AuthForm;

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User, Lock, Mail } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const TABS = ["Login", "Signup"];

export default function LoginSignup() {
  const [tab, setTab] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (tab === "Signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const endpoint = tab === "Signup" ? "register" : "login";
      const body = tab === "Signup"
        ? JSON.stringify({ name, email, password, address })
        : JSON.stringify({ email, password });
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      if (data.token) {
        login(data.token);
        setSuccess(tab === "Signup" ? "Signup successful! Redirecting..." : "Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/shop");
        }, 1000);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-900 dark:to-zinc-800">
      <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 w-full max-w-md" style={{ minHeight: 'auto', height: 'auto', marginTop: '60px', marginBottom: '60px' }}>
        <div className="flex mb-8 border-b border-gray-200 dark:border-zinc-700">
          {TABS.map((t) => (
            <button
              key={t}
              className={`flex-1 py-2 text-lg font-semibold transition-colors duration-200 focus:outline-none ${tab === t ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"}`}
              onClick={() => { setTab(t); setError(""); }}
            >
              {t}
            </button>
          ))}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {tab === "Signup" && (
            <>
              <div>
                <Label htmlFor="signup-name">Name</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <User size={18} />
                  </span>
                  <Input id="signup-name" type="text" placeholder="Enter your name" className="pl-10" autoComplete="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="signup-address">Address (optional)</Label>
                <div className="relative mt-1">
                  <Input id="signup-address" type="text" placeholder="Enter your address" autoComplete="address" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
              </div>
            </>
          )}
          <div>
            <Label htmlFor="login-email">Email</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={18} />
              </span>
              <Input id="login-email" type="email" placeholder="Enter your email" className="pl-10" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="login-password">Password</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <Input id="login-password" type="password" placeholder="Enter your password" className="pl-10" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          {tab === "Signup" && (
            <div>
              <Label htmlFor="signup-password-confirm">Confirm Password</Label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock size={18} />
                </span>
                <Input id="signup-password-confirm" type="password" placeholder="Confirm your password" className="pl-10" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>
            </div>
          )}
          {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
          {success && <div className="text-green-600 text-sm font-semibold">{success}</div>}
          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold text-lg shadow-input hover:bg-blue-700 transition-colors duration-200">
            {tab === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
} 
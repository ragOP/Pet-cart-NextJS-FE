"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/app/apis/loginUser";
import { setCookie } from "@/utils/cookies/setCookie";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Login = ({ onSuccess, showTitle = true }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.token) {
        setCookie("token", data.token, 7);
      }
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => setError(err?.message || "Login failed"),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ data: form });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl p-8 flex flex-col gap-6">
      {showTitle && <h2 className="text-2xl font-bold text-[#F59A11] mb-2 text-center">Login to PetCaart</h2>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}Email
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11] w-full pr-10"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="border text-white cursor-pointer border-[#F59A11] bg-[#F59A11] rounded-lg px-4 py-2 font-semibold hover:bg-[#d87f0c] hover:text-white transition-colors"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="text-center text-sm mt-2 text-gray-600">
        Don't have an account?{' '}
        <Link href="/auth/register" className="text-[#F59A11] hover:underline font-semibold">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;

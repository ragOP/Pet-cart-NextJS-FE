"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/apis/registerUser";

const Register = ({ onSuccess, showTitle = true }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError: (err) => setError(err?.message || "Registration failed"),
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
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6">
      {showTitle && <h2 className="text-2xl font-bold text-[#F59A11] mb-2">Create your PetCaart Account</h2>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#F59A11]"
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-[#F59A11] text-white rounded-lg px-4 py-2 font-semibold hover:bg-[#E58A00] transition-colors"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;

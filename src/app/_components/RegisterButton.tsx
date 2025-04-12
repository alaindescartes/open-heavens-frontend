'use client';

import React, { useState } from "react";

export default function RegisterButton({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch("http://localhost:8000/event/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        setSubmitted(true);
        setStep(3); // show confirmation
      } else {
        const data = await res.json();
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-center mb-4">
          {step < 3 ? "Register" : "Success 🎉"}
        </h2>

        {step < 3 && (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full mb-4 p-3 border rounded"
                  required
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full mb-4 p-3 border rounded"
                  required
                />
              </>
            )}

            {step === 2 && (
              <>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mb-4 p-3 border rounded"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mb-4 p-3 border rounded"
                  required
                />
                <input
                  name="tickets"
                  type="number"
                  min={1}
                  placeholder="Number of Tickets"
                  value={formData.tickets}
                  onChange={handleChange}
                  className="w-full mb-4 p-3 border rounded"
                  required
                />
              </>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-600 hover:text-black"
                >
                  ← Back
                </button>
              ) : (
                <span></span>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        )}

        {step === 3 && submitted && (
          <div className="text-center mt-6">
            <p className="text-lg text-green-600 font-semibold">
              ✅ Your ticket has been emailed to you!
            </p>
            <button
              onClick={onClose}
              className="mt-6 bg-yellow-500 text-black font-bold px-4 py-2 rounded hover:bg-yellow-600"
            >
              Close
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-red-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

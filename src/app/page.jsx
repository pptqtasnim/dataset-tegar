"use client";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [instruction, setInstruction] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: Pastikan semua field diisi
    if (!instruction || !question || !answer) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Semua field harus diisi ya tegar 😆",
      });
      return;
    }

    setLoading(true); // Set loading state

    try {
      const response = await fetch("/api/saveData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instruction, question, answer }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Data saved successfully!",
          text: "Data telah disimpan 😎",
        });
        // Reset form fields
        setInstruction("");
        setQuestion("");
        setAnswer("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to save data.",
          text: "Terjadi kesalahan saat menyimpan data.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat menghubungi server.",
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Form Dataset</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="instruction"
              className="block text-sm font-medium text-gray-700"
            >
              Instruction
            </label>
            <input
              type="text"
              name="instruction"
              id="instruction"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700"
            >
              Question
            </label>
            <input
              type="text"
              name="question"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="answer"
              className="block text-sm font-medium text-gray-700"
            >
              Answer
            </label>
            <input
              type="text"
              name="answer"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-indigo-600"
            } text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
          >
            {loading ? "Loading..." : "Submit"}{" "}
            {/* Change button text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [checkInCount, setCheckInCount] = useState(1);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        fetchRegistrations(data.token);
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Something went wrong.");
    }
  };

  const fetchRegistrations = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8000/admin/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const sorted = data.sort((a: any, b: any) =>
          a.firstName.localeCompare(b.firstName)
        );
        setRegistrations(sorted);
        setFiltered(sorted);
      } else {
        setError(data.message || "Failed to fetch");
      }
    } catch {
      setError("Error fetching data");
    }
  };

  const handleExport = () => {
    const exportData = filtered.map((r) => ({
      Name: `${r.firstName} ${r.lastName}`,
      Email: r.email,
      Phone: r.phone,
      Tickets: r.tickets,
      TicketID: r.ticketId,
      CheckedIn: r.checkedIn ? "Yes" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "OpenHeavens_Registrations.xlsx");
  };

  const checkedInCount = registrations.reduce(
    (total, r) => total + (r.checkedInCount || 0),
    0
  );

  const handleCheckIn = async (ticket: any, count: number) => {
    try {
      const res = await fetch(`http://localhost:8000/admin/checkin/${ticket.ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ checkedIn: true, count }),
      });

      if (res.ok) {
        const updated = registrations.map((r) =>
          r.ticketId === ticket.ticketId
            ? { ...r, checkedIn: true, checkedInCount: count }
            : r
        );
        setRegistrations(updated);
        filterSearch(search, updated);
        setShowModal(false);
      }
    } catch (err) {
      console.error("Check-in failed", err);
    }
  };

  const handleUncheck = async (ticketId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/admin/checkin/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ checkedIn: false, count: 0 }),
      });

      if (res.ok) {
        const updated = registrations.map((r) =>
          r.ticketId === ticketId
            ? { ...r, checkedIn: false, checkedInCount: 0 }
            : r
        );
        setRegistrations(updated);
        filterSearch(search, updated);
      }
    } catch (err) {
      console.error("Uncheck-in failed", err);
    }
  };

  const filterSearch = (term: string, list = registrations) => {
    const lower = term.toLowerCase();
    const filtered = list.filter(
      (r) =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(lower) ||
        r.ticketId.toLowerCase().includes(lower)
    );
    setFiltered(filtered);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${!token ? "flex items-center justify-center" : "p-8"}`}>
      {!token ? (
        <div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 px-4 py-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 px-4 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4">🎫 Registered Participants</h2>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <p className="text-green-700 font-semibold">
                ✅ Checked In: {checkedInCount}
              </p>
              <div className="flex gap-4">
                <button onClick={handlePrint} className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">🖨️ Print</button>
                <button onClick={handleExport} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">📁 Export</button>
              </div>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by name or ticket ID"
            className="w-full max-w-md mb-4 px-4 py-2 border rounded"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filterSearch(e.target.value);
            }}
          />

          <div className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="table-auto w-full text-left border print:text-sm">
              <thead className="bg-yellow-200 print:bg-white">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Tickets</th>
                  <th className="p-2 border">Ticket ID</th>
                  <th className="p-2 border">Check In</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{r.firstName} {r.lastName}</td>
                    <td className="p-2 border">{r.email}</td>
                    <td className="p-2 border">{r.phone}</td>
                    <td className="p-2 border">{r.tickets}</td>
                    <td className="p-2 border">{r.ticketId}</td>
                    <td className="p-2 border text-center">
                      {!r.checkedIn ? (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                          onClick={() => {
                            setSelectedTicket(r);
                            setCheckInCount(r.tickets);
                            setShowModal(true);
                          }}
                        >
                          Check In
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-green-600 text-lg">✅</span>
                          <button
                            className="text-red-500 hover:text-red-700 text-sm underline"
                            onClick={() => handleUncheck(r.ticketId)}
                          >
                            Uncheck In
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODAL */}
          {showModal && selectedTicket && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-xl animate-in fade-in slide-in-from-bottom duration-300">
                <h3 className="text-xl font-bold mb-4 text-center">Check In Guest</h3>
                <p className="mb-2 text-center">
                  {selectedTicket.firstName} {selectedTicket.lastName} has{" "}
                  <strong>{selectedTicket.tickets}</strong> ticket(s)
                </p>
                <input
                  type="number"
                  min={1}
                  max={selectedTicket.tickets}
                  value={checkInCount}
                  onChange={(e) => setCheckInCount(parseInt(e.target.value))}
                  className="w-full p-2 mb-4 border rounded"
                />
                <div className="flex justify-between">
                  <button
                    className="text-gray-500 hover:text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleCheckIn(selectedTicket, checkInCount)}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

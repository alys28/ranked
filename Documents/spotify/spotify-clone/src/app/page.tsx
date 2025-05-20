"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [operation, setOperation] = useState<"insert" | "select" | "delete">("insert");

  // Insert user
  const handleInsert = async () => {
    if (!userId || !name || !age) {
      setResult("Please fill all fields.");
      return;
    }
    const { error } = await supabase.from("users").insert({ userid: userId, name, age: Number(age) });
    if (error) setResult(`Insert error: ${error.message}`);
    else setResult("User inserted!");
  };

  // Delete user
  const handleDelete = async () => {
    if (!userId) {
      setResult("Please enter a userId to delete.");
      return;
    }
    const { error } = await supabase.from("users").delete().eq("userid", userId);
    if (error) setResult(`Delete error: ${error.message}`);
    else setResult("User deleted (if existed).");
  };

  // Select user
  const handleSelect = async () => {
    if (!userId) {
      setResult("Please enter a userId to fetch.");
      return;
    }
    const { data, error } = await supabase.from("users").select("name, age").eq("userid", userId).single();
    if (error) {
      setResult("User doesn't exist");
    } else if (data) {
      setResult(`Name: ${data.name}, Age: ${data.age}`);
    }
  };

  const renderFields = () => {
    switch (operation) {
      case "insert":
        return (
          <>
            <input
              className="border p-2 rounded"
              placeholder="User ID"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <input
              className="border p-2 rounded"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="border p-2 rounded"
              placeholder="Age"
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleInsert}>Insert</button>
          </>
        );
      case "select":
        return (
          <>
            <input
              className="border p-2 rounded"
              placeholder="User ID"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSelect}>Select</button>
          </>
        );
      case "delete":
        return (
          <>
            <input
              className="border p-2 rounded"
              placeholder="User ID"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
      <h1 className="text-2xl font-bold mb-4">Spotify Database Manager</h1>
      
      {/* Operation Selector */}
      <div className="flex gap-2 mb-4">
        <button 
          className={`px-4 py-2 rounded transition-all ${
            operation === 'insert' 
              ? 'bg-blue-500 text-white border-2 border-white' 
              : 'bg-blue-500 text-white opacity-50'
          }`}
          onClick={() => setOperation('insert')}
        >
          Insert
        </button>
        <button 
          className={`px-4 py-2 rounded transition-all ${
            operation === 'select' 
              ? 'bg-green-500 text-white border-2 border-white' 
              : 'bg-green-500 text-white opacity-50'
          }`}
          onClick={() => setOperation('select')}
        >
          Select
        </button>
        <button 
          className={`px-4 py-2 rounded transition-all ${
            operation === 'delete' 
              ? 'bg-red-500 text-white border-2 border-white' 
              : 'bg-red-500 text-white opacity-50'
          }`}
          onClick={() => setOperation('delete')}
        >
          Delete
        </button>
      </div>

      {/* Dynamic Fields */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {renderFields()}
      </div>

      {/* Result Display */}
      {result && <div className="mt-4 p-2 border rounded bg-gray-50 text-black">{result}</div>}
    </div>
  );
}

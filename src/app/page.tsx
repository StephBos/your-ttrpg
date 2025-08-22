"use client"
import Image from "next/image";
import React, { useState, useEffect} from "react";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-cover bg-center" style={{ backgroundImage: "url('background1.jpg')"}}>
      <main className="flex flex-col row-start-2 items-center sm:items-start bg-gray-900/90 p-6 rounded gap-2">
        <h1 className="text-3xl font-bold">Login</h1>
        <input type="text" name="username" className="bg-gray-800 rounded p-1 w-64" placeholder="Username"/>
        <input type="text" name="password" className="bg-gray-800 rounded p-1 w-64" placeholder="Password"/>
        <button className="bg-indigo-950 hover:bg-indigo-900 w-64 rounded">Login</button>
        <a>Forgot your password?</a>
        <a>Create Account</a>
      </main>
    </div>
  );
}

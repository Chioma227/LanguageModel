'use client'
import { useEffect, useState } from "react";
import Detector from "./components/Detector";
import NotAvailable from "./components/not-available/NotAvailable";


export default function Home() {
  const [notAvailable, setNotAvailable] = useState(false);

  useEffect(() => {
    if (!window.ai) {
      setNotAvailable(true)
      console.error("AI API not available.");
      return;
    }
  }, [])
  return (
    <div>
      {notAvailable ? <NotAvailable /> : <Detector />}
    </div>
  );
}

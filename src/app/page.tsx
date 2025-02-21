'use client'
import { useEffect } from "react";
import Detector from "./components/Detector";

export default function Home() {
  useEffect(()=>{
    localStorage.clear()
  }, [])
  return  <Detector />;
}

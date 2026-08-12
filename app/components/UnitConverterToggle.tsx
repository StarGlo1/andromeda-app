"use client";

import { useEffect, useState } from "react";
import UnitConverter from "./UnitConverter";

export default function UnitConverterToggle() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("showConverter");
      // If never set, default to true (show it)
      setShow(saved === null || saved === "true");
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return <UnitConverter />;
}
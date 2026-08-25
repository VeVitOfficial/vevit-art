"use client";

import { useState } from "react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [label, setLabel] = useState(email);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setLabel("Zkopírováno! ✓");
    setTimeout(() => setLabel(email), 2000);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      style={{
        color: "#10B981",
        fontWeight: 500,
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
      }}
    >
      {label}
    </button>
  );
}
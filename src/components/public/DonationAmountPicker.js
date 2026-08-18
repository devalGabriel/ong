"use client";

import { useState } from "react";
import styles from "./DonationAmountPicker.module.css";

const PRESET_AMOUNTS = [50, 100, 200, 500, 1000, 2000];

export default function DonationAmountPicker() {
  const [donationType, setDonationType] = useState("once");
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");

  function selectPreset(value) {
    setAmount(value);
    setCustomAmount("");
  }

  function handleCustomChange(event) {
    const value = event.target.value;
    setCustomAmount(value);
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  }

  return (
    <div>
      <div className={styles.typeToggle} role="group" aria-label="Tip donație">
        <button type="button" className={styles.typeBtn} aria-pressed={donationType === "once"} onClick={() => setDonationType("once")}>
          Donație unică
        </button>
        <button type="button" className={styles.typeBtn} aria-pressed={donationType === "recurring"} onClick={() => setDonationType("recurring")}>
          Donație recurentă
        </button>
      </div>

      <div className={styles.amountGrid} role="group" aria-label="Alege suma">
        {PRESET_AMOUNTS.map((value) => (
          <button key={value} type="button" className={styles.amountBtn} aria-pressed={customAmount === "" && amount === value} onClick={() => selectPreset(value)}>
            {value} lei
          </button>
        ))}
      </div>

      <div className={styles.customRow}>
        <label htmlFor="custom-amount" className="sr-only" style={{ display: "none" }}>
          Altă sumă
        </label>
        <input id="custom-amount" type="number" min={1} placeholder="Altă sumă (lei)" value={customAmount} onChange={handleCustomChange} />
      </div>

      <p className={styles.summary}>
        Ai ales o donație {donationType === "recurring" ? "recurentă" : "unică"} de <strong>{amount || 0} lei</strong>. Poți folosi această sumă ca referință atunci când alegi metoda de plată mai jos.
      </p>
    </div>
  );
}

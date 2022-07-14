import { useState } from "react";
import { CONFIG } from "../config";
import './../style/style.css';

export default function ActionButtons({ status, gameId, socketId }) {
  const [copy, setCopy] = useState("Lien");

  /** copier le lien pour rejoindre la partie */
  const CopyLink = () => {
    navigator.clipboard.writeText(`${CONFIG.CLIENT_URL}/join/${gameId}`);
    setCopy("Copié");
    setTimeout(() => {
      setCopy('Lien')
    }, 2000)
  };

  /** appel le lancement de la partie */
  const startCall = () => {
    fetch(`${CONFIG.SERVER_URL}/start/${gameId}/${socketId}`);
  };

  if (status === "master") {
    return (
      <div id="action-buttons">
        <button onClick={CopyLink}>{copy}</button>
        <button onClick={startCall}>Démarrer</button>
      </div>
    );
  }
}

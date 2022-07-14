import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBeforeunload } from "react-beforeunload";
import ActionButtons from './../components/ActionButtons';
import LobbyPlayersList from './../components/LobbyPlayersList';
import Rules from './../components/Rules';
import "./../style/style.css";

export default function Lobby({ socket }) {

  const navigate = useNavigate();

  /** récupérer le state passé dans le navigate */
  const { state } = useLocation();

  /** extraire les variables du state */
  const { actualPlayerName, masterName, playersList, gameId, status } = state;

  
  /** tableau des pseudos des joueurs présent dans la file d'attente */
  const [players, setPlayers] = useState([...playersList]);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.error(`connect_error due to ${err.message}`);
    });
    socket.on("new-player", (data) => addPlayer(data));
    socket.on("player-left-lobby", (data) => removePlayer(data));
    socket.on("start", (data) => start(data));

    return () => {
      socket.removeAllListeners()
    };
  });

  /** evenement joueur quitte la file d'attente */
  useBeforeunload((event) => {
    socket.disconnect();
  });

  /** ajouter un joueur dans la liste  */
  const addPlayer = (player) => {
    setPlayers(previousPlayers => [...previousPlayers, player]);
  };

  /** retire un joueur de la liste */
  const removePlayer = (player) => {
    setPlayers(previousPlayers => previousPlayers.filter(p => p !== player));
  };

  /** lancement de la partie */
  const start = (data) => {
    navigate(`/course/${gameId}`, {
      state: {
        grid: JSON.parse(data),
        actualPlayerName: actualPlayerName,
        playersList: players,
        masterName: masterName
      },
    });
  };

  return (
    <>
      <h1>Bienvenue dans la course <span>{actualPlayerName}</span></h1>
      <ActionButtons status={status} gameId={gameId} socketId={socket.id}/>
      <main id="lobby-main-container">
        <LobbyPlayersList players={players} masterName={masterName} actualPlayerName={actualPlayerName}/>
        <Rules />
      </main>
    </>
  );
}

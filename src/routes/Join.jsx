import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import Player from "../class/Player";
import "./../style/style.css";

export default function Join({ socket }) {

  const navigate = useNavigate();
  const { gameId } = useParams();

  const Join = () => {
    const pseudo = document.getElementById("playerName").value;
    const player = new Player(pseudo);
    if (player.isValidName()) {
      fetch(`${CONFIG.SERVER_URL}/course/${gameId}/${socket.id}/${pseudo}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("problème fetch Join.jsx");
        })
        .then((data) => handleNavigate(data))
        .catch((err) => navigate(`/course/error/`));
    } else {
      alert(
        `mauvais format du pseudo, minimum ${CONFIG.PLAYER.PSEUDO.MINLENGTH} lettres/chiffres, maxime ${CONFIG.PLAYER.PSEUDO.MAXLENGTH}`
      );
    }
  };

  const handleNavigate = (data) => {
    navigate(`/course/lobby/${data.gameId}`, {
      state: {
        masterName: data.masterName,
        actualPlayerName: data.pseudo,
        playersList: data.playersList,
        status: "player",
        gameId: data.gameId
      },
    });
  };

  return (
    <>
      <p>entrez un pseudo pour rejoindre</p>
      <input
        type="text"
        id="playerName"
        placeholder="enter a name"
        autoComplete="off"
      />
      <button onClick={Join}>Rejoindre</button>
    </>
  );
}



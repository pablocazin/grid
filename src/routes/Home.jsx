import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";
import Rules from "./../components/Rules";
import Player from "../class/Player";
import "./../style/style.css";

export default function Home({ socket }) {
  const navigate = useNavigate();

  /** ajoouter la verification du statut de la reponse */
  const Create = () => {
    const pseudo = document.getElementById("creatorName").value;
    const player = new Player(pseudo);
    if (player.isValidName()) {
      fetch(`${CONFIG.SERVER_URL}/course/new/${pseudo}/${socket.id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err))
        .then((data) =>
          navigate(`/course/lobby/${data.gameId}`, {
            state: {
              gameId: data.gameId,
              status: data.status,
              masterName: data.masterName,
              actualPlayerName: data.masterName,
              playersList: [data.masterName],
            },
          })
        );
    } else {
      alert("le format du pseudo doit etre compris entre 3 et 10 caractères");
    }
  };

  return (
    <>
      <h1>GridRace</h1>
      <div style={{display: 'flex', gap: '10px'}} id="home-action-buttons">
        <input
          type="text"
          id="creatorName"
          placeholder="pseudo"
          autoComplete="off"
        />
        <button onClick={Create}>Créer</button>
      </div>
      <Rules />
    </>
  );
}

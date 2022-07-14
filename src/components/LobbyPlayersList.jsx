import PlayerIcon from './../assets/images/player-icon.png';
import { CONFIG } from './../../config';

export default function LobbyPlayersList({ players, masterName, actualPlayerName }) {

  const maxPlayers = CONFIG.MODS.NORMAL.MAXPLAYERS;

  const PlayersList = () => {
    let playersJsx = []
    for(let i = 0; i < maxPlayers; i++) {
      playersJsx.push(
        <li key={i} className="lobby-players-item">
          <img src={PlayerIcon} alt="player icon"/>
          <p style={{color: players[i] === actualPlayerName ? 'yellow' : 'white'}}>{players[i]}</p>
          {players[i] === masterName ? " 👑" : ""}
        </li>
      )
    }
    return playersJsx;
  }

  return (
    <ul id="lobby-players-list">
      <PlayersList />
    </ul>
  );
}

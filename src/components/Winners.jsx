export default function Winnerw({ length, winners }) {

        let winnersJsx = [];
        for (let i = 0; i < length; i++) {
          winnersJsx.push(<li key={i}>{winners[i] || ""}</li>);
        }
        
        return (<ul id="winners">{winnersJsx}</ul>)
}
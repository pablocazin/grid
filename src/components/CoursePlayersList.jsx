import blue from "./../assets/images/cars/blue.png";
import green from "./../assets/images/cars/green.png";
import pink from "./../assets/images/cars/pink.png";
import red from "./../assets/images/cars/red.png";

export default function CoursePlayersLis({ players }) {
  const colors = [blue, green, pink, red];

  const playersListJsx = [];
  for (const [index, value] of players.entries()) {
    playersListJsx.push(
      <div key={index} className="player-box">
        {value}
        <img src={colors[index]} alt="car" className="playersListCars" />
      </div>
    );
  }
  return <div id="course-playersList">{playersListJsx}</div>;
}

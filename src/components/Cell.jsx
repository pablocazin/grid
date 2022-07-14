import Car from "./Car";
import Wall from "./../assets/images/textures/Mur2-64px.jpg";
import Dirt from "./../assets/images/textures/Dirt-64px.jpg";
import Goudron from "./../assets/images/textures/Goudron-64px.jpg";
import Finish from "./../assets/images/textures/Finish-64px.jpg";

export default function Cell({ cell, radius }) {
  return (
    <div
      className={`case flex justify-center align-center ${radius.join(',').replaceAll(",", " ")}`}
      key={cell.uuid}
    >
      {cell.cars[0]
        ? cell.cars.map((car) => (
            <Car
              orientation={car.orientation}
              color={car.color}
              key={car.player.socketId}
            />
          ))
        : ""}
      <img
        className="texture"
        src={
          cell.code === 0
            ? Goudron
            : cell.code === 1
            ? Wall
            : cell.code === 2
            ? Dirt
            : Finish
        }
        alt="texture"
      />
    </div>
  );
}

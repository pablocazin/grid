import blue from "./../assets/images/cars/blue.png";
import green from "./../assets/images/cars/green.png";
import pink from "./../assets/images/cars/pink.png";
import red from "./../assets/images/cars/red.png";

export default function Car({ orientation, color }) {

  return (
    <img
      src={
        color === "blue"
          ? blue
          : color === "green"
          ? green
          : color === "pink"
          ? pink
          : red
      }
      alt="car"
      className={`car ${
        orientation[0] === '"' && orientation[orientation.length - 1] === '"'
          ? orientation.slice(1, -1)
          : orientation
      }`}
    />
  );
}

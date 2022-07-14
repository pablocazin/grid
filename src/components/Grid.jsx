import "./../style/style.css";
import Cell from "./Cell";

export default function Grid({ grid }) {
  const makeCells = () => {
    let cellsJsx = [];

    let rowCount = 0;
    for (let row of grid) {
      let colCount = 0;
      for (let cell of row) {
        let radius = [];
        if (rowCount !== 0 && rowCount !== grid.length - 1) {
          if (colCount !== 0 && colCount !== grid[0].length - 1) {
            if (cell.code === 1) {
              if (
                grid[rowCount + 1][colCount].code === 0 &&
                grid[rowCount][colCount + 1].code === 0
              ) {
                radius.push("bottom-right");
              }
              if (
                grid[rowCount + 1][colCount].code === 0 &&
                grid[rowCount][colCount - 1].code === 0
              ) {
                radius.push("bottom-left");
              }
              if (
                grid[rowCount][colCount + 1].code === 0 &&
                grid[rowCount - 1][colCount].code === 0
              ) {
                radius.push("top-right");
              }
              if (
                grid[rowCount][colCount - 1].code === 0 &&
                grid[rowCount - 1][colCount].code === 0
              ) {
                radius.push("top-left");
              }
              radius.push(grid[rowCount][colCount].code);
            }
          }
        }
        cellsJsx.push(<Cell cell={cell} key={cell.uuid} radius={radius} />);
        colCount++;
      }
      rowCount++;
    }
    return cellsJsx;
  };

  return (
    <div id="grid">
      {makeCells()}
    </div>
  );
}

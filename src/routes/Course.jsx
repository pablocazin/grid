import React, { useState, useEffect, useCallback } from "react";
import { CONFIG } from "../config";
import { useLocation } from "react-router-dom";

import CoursePlayersList from "../components/CoursePlayersList";
import CourseButtonsContainer from "../components/CourseButtonsContainer";
import Winners from "../components/Winners";

import "./../style/style.css";

export default function Course({ socket }) {
  // récupérer le state passé dans le navigate
  const { state } = useLocation();

  // extraire les variables du state
  const { grid, playersList, masterName, actualPlayerName } = state;

  // tableau des pseudos des joueurs présent dans la file d'attente
  const [players, setPlayers] = useState([...playersList]);

  // la valeur du decompte
  const [winners, setWinners] = useState([]);
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [instructionsToBack, setInstructionsToBack] = useState([]);
  const [gridToCells, setGrid] = useState(grid);
  const [gridReady, setGridReady] = useState(true);
  const [win, setWin] = useState(false);

  // ajoute une instruction
  const addInstruction = useCallback((e) => {
    if (instructionsArray.length < CONFIG.MOD.NORMAL.MAX_INSTRUCTIONS) {
      setInstructionsArray((previousInstructionsArray) => [
        ...previousInstructionsArray,
        e.target.innerHTML,
      ]);
      setInstructionsToBack((previousInstructionsToBack) => [
        ...previousInstructionsToBack,
        e.target.getAttribute("value"),
      ]);
    }

    if (instructionsArray.length === 3) {
      socket.emit("instruction-ready", {
        playerName: actualPlayerName,
        instructions: [...instructionsToBack, e.target.getAttribute("value")],
      });

      waitingNewGrid();
    }
  }, [actualPlayerName, socket, instructionsToBack, instructionsArray.length]);

  // éffectue les instructions recues par du server
  const newGrid = useCallback(
    (instructions) => {
      let history = [];
      let updatedGrid = structuredClone(gridToCells);

      for (let instr of instructions) {
        if (instr.type === undefined) throw new Error("No type in instruction");

        if (instr.type === "move") {
          moveCar(instr, updatedGrid);
        }

        if (instr.type === "turn") {
          turnCar(instr, updatedGrid);
        }

        history.push(structuredClone(updatedGrid));
      }

      let count = 0;
      const interval = setInterval(() => {
        setGrid(history[count]);
        count++;
        if (count > history.length - 1) clearInterval(interval);
      }, 700);

      setGridReady(true);
    },
    [gridToCells]
  );

  useEffect(() => {
    let boxArray = document.getElementsByClassName("instruction-box");
    for (let box of boxArray) {
      box.addEventListener("click", addInstruction);
    }

    socket.on("new-grid", (instructions) => {
      console.log(JSON.stringify(instructions));
      newGrid(instructions);
      console.log("new-grid");
    });

    socket.on("new-instruction", () => {
      console.log("new-instruction");
    });

    socket.on("new-winner", (data) => {
      setWinners((previousWinners) => [...previousWinners, data.userName]);
      if (socket.id === data.socketId) {
        setWin(true);
        console.log("tu as gagné");
      }
    });

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      for (let box of boxArray) {
        box.removeEventListener("click", addInstruction);
      }
      socket.removeEventListener();
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [addInstruction, newGrid, socket]);

  const handleKeyPress = (e) => {
    switch (e.keyCode) {
      case 38:
        document.getElementById("forward").click();
        break;

      case 40:
        document.getElementById("backward").click();
        break;

      case 37:
        document.getElementById("turn-left").click();
        break;

      case 39:
        document.getElementById("turn-right").click();
        break;

      default:
        throw new Error("KeyPress not working.");
    }
  };

  // vide les tableaux d'instructions et attend la prochaine grille
  const waitingNewGrid = () => {
    setInstructionsToBack([]);
    setInstructionsArray([]);
    setGridReady(false);
  };

  // effectue l'instruction move
  const moveCar = (instr, newGrid) => {
    const from = instr.from;
    const to = instr.to;

    // je récupere le joueur, modifie sa position et update son orientation pour backToStart
    let saveCar = newGrid[from.row][from.col].cars[0];
    saveCar.position = { row: to.row, col: to.col };
    saveCar.orientation = instr.orientation;

    // je retire le joueur de la case from
    newGrid[from.row][from.col].cars.shift();

    // j'ajoute le joueur a la nouvelle case
    newGrid[to.row][to.col].cars.push(saveCar);

    return newGrid;
  };

  // effectue l'instruction turn
  const turnCar = (instr, newGrid) => {
    const orientation = instr.orientation;

    const row = instr.car.position.row;
    const col = instr.car.position.col;

    newGrid[row][col].cars[0].orientation = orientation;

    return newGrid;
  };

  return (
    <>
      <CoursePlayersList players={players} />
      <main id="course-main-container">
        <Winners length={playersList.length} winners={winners} />
        <CourseButtonsContainer
          gridToCells={gridToCells}
          gridReady={gridReady}
          win={win}
          instructionsArray={instructionsArray}
        />
      </main>
    </>
  );
}

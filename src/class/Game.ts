import { Cell } from './../../Types';
import Player from "./Player";
import Grid from "./Grid";

export default class Game {

    private grid: Grid;
    private players: Player[]

    /** remplacer par la création d'une instance de grille dans laquelle je passe la grille */
    setGrid(grid: Cell[][]){
        if(this.grid === undefined) {
            this.grid = new Grid(grid)
        }
    }

    setPlayers(players: Player[]){
        if(this.players === undefined) {
            this.players = players
        }
    }
}

/* this.gameId = gameData.gameId;
this.masterName = gameData.masterName;
this.masterSocketId = gameData.masterSocketId;
this.status = gameData.status;
this.mod = gameData.mod;
this.maxPlayers = gameData.maxPlayers;
this.createdAt = gameData.createdAt;
this.playersList = gameData.playersList;
this.remaining = gameData.remaining;
this.grid = gameData.grid[0];

private gameId: string;
    private masterName: string;
    private masterSocketId: string;
    private status: number;
    private mod: string;
    private maxPlayers: number;
    private createdAt: Date;
    private playersList: Player[];
    private remaining: number;

    private grid: Grid; */
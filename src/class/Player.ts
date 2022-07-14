import { CONFIG} from '../config';

export default class Player {

    private name : string | undefined;
    private minLength : number = CONFIG.PLAYER.PSEUDO.MINLENGTH - 1
    private maxLength : number = CONFIG.PLAYER.PSEUDO.MAXLENGTH + 1

    constructor(name: string) {
        this.name = (name.length > this.minLength && name.length < this.maxLength) ? name : undefined;
    }

    isValidName() {
        if(this.name === undefined)
            return false
        return true
    }
}
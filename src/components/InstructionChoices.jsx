import './../style/style.css';

export default function InstructionChoices({ instructionsArray }){
    return (
        <div className="instruction-containers">
            <div className="instruction-box flex justify-center align-center">{instructionsArray[0]}</div>
            <div className="instruction-box flex justify-center align-center">{instructionsArray[1]}</div>
            <div className="instruction-box flex justify-center align-center">{instructionsArray[2]}</div>
            <div className="instruction-box flex justify-center align-center">{instructionsArray[3]}</div>
        </div>
    )
}
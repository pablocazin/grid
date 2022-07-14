import './../style/style.css';

export default function InstructionSelect() {
  return (
    <div className="instruction-containers">
      <div className="instruction-box flex justify-center align-center" value="forward" id="forward">
        &#8593;
      </div>
      <div className="instruction-box flex justify-center align-center" value="backward" id="backward">
        &#8595;
      </div>
      <div className="instruction-box flex justify-center align-center" value="turn-left" id="turn-left">
        &#8592;
      </div>
      <div className="instruction-box flex justify-center align-center" value="turn-right" id="turn-right">
        &#8594;
      </div>
    </div>
  );
}

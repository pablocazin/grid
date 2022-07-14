import InstructionSelect from "../components/InstructionSelect";
import InstructionChoices from "../components/InstructionChoices";

export default function Instructions({ gridReady, instructionsArray }) {
    return (
      <>
        <InstructionSelect />
        <InstructionChoices instructionsArray={instructionsArray} />
      </>
    )
}

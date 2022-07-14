import Grid from "../components/Grid";
import Instructions from "../components/Instructions";

export default function CourseButtonsContainer({ gridToCells, gridReady, win, instructionsArray}) {

    return (
        <div id="course-container">
          <Grid grid={gridToCells} />
          {win ? null : (
            <div id="instructions-container">
              {!gridReady ? (
                <p>en attente des aures joueurs...</p>
              ) : (
                <Instructions instructionsArray={instructionsArray} />
              )}
            </div>
          )}
        </div>
    )
}
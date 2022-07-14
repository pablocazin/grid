import './../style/style.css';

export default function Rules() {
  return (
    <div id="rules-container">
      <h2>GridRace, c'est quoi ?</h2>
      <p>
        GridRace est un jeu de stratégie basé sur les déplacements de voitures
        sur une grille.
      </p>

      <h3>Comment jouer ?</h3>

      <h4>Les flèches</h4>
      <p>
        Déplacez-vous avez les flèches, au clavier ou en cliquant sur ces
        dernières, les mouvements s'éffectuent dans le sens de la voiture,
      </p>

      <h4>Les obstacles</h4>
      <p>Un joueur ne peut pas rentrer dans un obstacle volontairement, cependant lorsqu'un joueur entre dans la case d'un autre, ce dernier est poussé dans le sens de l'impacte, si la nouvelle case est un obstacle, le joueur retourne au départ.</p>

      <h4>La grille</h4>
      <p>Une fois que tous les joueurs ont rempli les flèches, la nouvelle grille est calculée dans l'ordre des instructions, puis les joueurs voient la nouvelle grille.</p>
    </div>
  );
}

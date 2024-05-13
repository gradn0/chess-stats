export type Colour = "white" | "black";
export type Winner = "white" | "black" | "none";

export interface Game {
  colour: Colour,
  moves: string[],
  winner: Winner,
}

export const parsePGNs = (pgns: string[], username:string) => {
  let parsedGames: any[] = [];

  pgns.forEach(pgn => {
    const colour = (pgn.split("\n")[4] === `[White \"${username}\"]`) ? "white" : "black";

    const resultPGN = pgn.split("\n")[6];
    let winner;
    if ((resultPGN === "[Result \"1-0\"]")) {
      winner = "white";
    } else if (resultPGN === "[Result \"1/2-1/2\"]") {
      winner = "none"
    } else {
      winner = "black"
    }
    const moves = pgn.split('\n')[22].split(/{\[%clk\s[0-9]:[0-5][0-9]:[0-5][0-9]\.?[0-5]?[0-9]?\]}/);
    if (moves.length > 1) {
      moves.length = 20;

      parsedGames.push({
        colour: colour,
        winner: winner,
        moves: moves,
      })
    }
  });

  return parsedGames;
}
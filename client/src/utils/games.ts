export type Colour = "white" | "black";
export type Result = "win" | "lose" | "draw";

export interface Game {
  colour: Colour,
  moves: string[],
  result: Result,
}

export const parsePGNs = (pgns: string[], username:string) => {
  let parsedGames: any[] = [];

  pgns.forEach(pgn => {
    const colour = (pgn.split("\n")[4] === `[White \"${username}\"]`) ? "white" : "black";

    const resultPGN = pgn.split("\n")[6];
    let result;
    if ((colour === "white" && resultPGN === "[Result \"1-0\"]") || (colour === "black" && resultPGN === "[Result \"0-1\"]")) {
      result = "win";
    } else if (resultPGN === "[Result \"1/2-1/2\"]") {
      result = "draw";
    } else {
      result = "lose";
    }

    const moves = pgn.split('\n')[22].split(/{\[%clk\s[0-9]:[0-5][0-9]:[0-5][0-9]\.?[0-5]?[0-9]?\]}/);
    moves.length = 20;

    parsedGames.push({
      colour: colour,
      result: result,
      moves: moves,
    })
  });

  return parsedGames;
}
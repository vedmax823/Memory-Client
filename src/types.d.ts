type Game = {
    id: string;
    maxPlayersCount: number;
    cardsCount: number;
};

type GameFull = {
  rows : number,
  cols : number,
  field : Card[],
  users : User[],
  turnUser : string,
  isStarted : boolean
} & Game

type Card = {
  id : string,
  row : number
  col : number,
  isOpen : boolean,
  link : string
}

type User = {
  id : string,
  name : string
}
import type { NextPage } from "next";
import { useState } from "react";
import Dice from "../components/Dice";
import { Button } from "@mantine/core";

const Home: NextPage = () => {
  let turnNum = 3;
  let heldArray = [0, 0, 0, 0, 0];
  let diceArray = [0, 0, 0, 0, 0];
  let scoreSheetRaw = {
    aces: {
      selected: false,
      score: 0,
    },
    twos: {
      selected: false,
      value: 0,
    },
    threes: {
      selected: false,
      value: 0,
    },
    fours: {
      selected: false,
      value: 0,
    },
    fives: {
      selected: false,
      value: 0,
    },
    sixes: {
      selected: false,
      value: 0,
    },
    threeOfAKind: {
      selected: false,
      value: 0,
    },
    fourOfAKind: {
      selected: false,
      value: 0,
    },
    fullHouse: {
      selected: false,
      value: 0,
    },
    smallStraight: {
      selected: false,
      value: 0,
    },
    largeStraight: {
      selected: false,
      value: 0,
    },
    yahtzee: {
      selected: false,
      value: 0,
    },
    chance: {
      selected: false,
      value: 0,
    },
    total: 0,
  };
  let [dice, setDice] = useState(diceArray);
  let [held, setHeld] = useState(heldArray);
  let [turn, setTurn] = useState(turnNum);
  let [scoreSheet, setScoreSheet] = useState(scoreSheetRaw);
  let [held2, setHeld2] = useState([true, true, true, true , true]); // FOR VISUALS

  return (
    <>
      <div>
        <h1 className="flex pt-20 justify-center minimum:hidden">{"Landscape Only (660px)"}</h1>
        <div className="hidden minimum:flex minimum:justify-center pb-4 pt-20">
          <Dice className="px-3" number={dice[0]} onClick={() => {
            let newHeld = hold(held, dice[0], 1, turn)
            let newHeld2: boolean[] = [];
            newHeld.forEach(element => newHeld2.push(element === 0 ? true : false));
            setHeld(newHeld);
            setHeld2(newHeld2);
          }} held={held2[0]} />
          <Dice className="px-3" number={dice[1]} onClick={() => {
            let newHeld = hold(held, dice[1], 2, turn)
            let newHeld2: boolean[] = [];
            newHeld.forEach(element => newHeld2.push(element === 0 ? true : false));
            setHeld(newHeld);
            setHeld2(newHeld2);
          }} held={held2[1]}/>
          <Dice className="px-3" number={dice[2]} onClick={() => {
            let newHeld = hold(held, dice[2], 3, turn)
            let newHeld2: boolean[] = [];
            newHeld.forEach(element => newHeld2.push(element === 0 ? true : false));
            setHeld(newHeld);
            setHeld2(newHeld2);
          }} held={held2[2]}/>
          <Dice className="px-3" number={dice[3]} onClick={() => {
            let newHeld = hold(held, dice[3], 4, turn)
            let newHeld2: boolean[] = [];
            newHeld.forEach(element => newHeld2.push(element === 0 ? true : false));
            setHeld(newHeld);
            setHeld2(newHeld2);
          }} held={held2[3]}/>
          <Dice className="px-3" number={dice[4]} onClick={() => {
            let newHeld = hold(held, dice[4], 5, turn)
            let newHeld2: boolean[] = [];
            newHeld.forEach(element => newHeld2.push(element === 0 ? true : false));
            setHeld(newHeld);
            setHeld2(newHeld2);
          }} held={held2[4]}/>
        </div>
        <div className="hidden minimum:flex minimum:justify-center pb-2">
          <Button className="bg-blue-600 hover:bg-blue-500" radius="lg" size="xl" disabled={turn === 0} onClick={async () => {
            setTurn(turn -= 1);
            let data = await fetch(`/api/roll?held=${held.join("")}`);
            let json = await data.json();
            setDice(json.result);
          }}>
            Roll [Turns left: {turn}]
          </Button>
        </div>
        <div className="flex justify-center">
        </div>
      </div>
    </>
  );
};

function hold(heldDice: number[], dice: number, index: number, turn: number): number[] {
  if (turn === 3) return heldDice;
  heldDice.splice(
    index - 1,
    1,
    heldDice[index - 1] !== 0 && turn !== 3 ? 0 : dice
  );
  return heldDice;
}

export default Home;
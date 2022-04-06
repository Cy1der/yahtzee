import { useState } from "react";
import Dice from "../components/Dice";
import { Button } from "@mantine/core";
import { $fetch } from "ohmyfetch";
import number from "../functions/logic/number";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const Home: NextPage = (props) => {
  const router = useRouter();
  let turnNum = 3;
  let heldArray = [0, 0, 0, 0, 0];
  let diceArray = [0, 0, 0, 0, 0];
  let [upperScore, setUpperScore] = useState(0);
  let [dice, setDice] = useState(diceArray);
  let [held, setHeld] = useState(heldArray);
  let [turn, setTurn] = useState(turnNum);
  let [held2, setHeld2] = useState([true, true, true, true, true]); // FOR VISUALS
  let [total, setTotal] = useState(0);
  let [count, setCount] = useState(0);
  let [claimed, setClaimed] = useState(false);

  let acesScore = {
    selected: false,
    score: 0,
  };
  let twosScore = {
    selected: false,
    score: 0,
  };
  let threesScore = {
    selected: false,
    score: 0,
  };
  let foursScore = {
    selected: false,
    score: 0,
  };
  let fivesScore = {
    selected: false,
    score: 0,
  };
  let sixesScore = {
    selected: false,
    score: 0,
  };
  let threeOfAKindScore = {
    selected: false,
    score: 0,
  };
  let fourOfAKindScore = {
    selected: false,
    score: 0,
  };
  let fullHouseScore = {
    selected: false,
    score: 0,
  };
  let smallStraightScore = {
    selected: false,
    score: 0,
  };
  let largeStraightScore = {
    selected: false,
    score: 0,
  };
  let yahtzeeScore = {
    selected: false,
    score: 0,
  };
  let chanceScore = {
    selected: false,
    score: 0,
  };
  let bonusScore = {
    selected: false,
    score: 0,
  };

  let [aces, setAces] = useState(acesScore);
  let [twos, setTwos] = useState(twosScore);
  let [threes, setThrees] = useState(threesScore);
  let [fours, setFours] = useState(foursScore);
  let [fives, setFives] = useState(fivesScore);
  let [sixes, setSixes] = useState(sixesScore);
  let [threeOfAKind, setThreeOfAKind] = useState(threeOfAKindScore);
  let [fourOfAKind, setFourOfAKind] = useState(fourOfAKindScore);
  let [fullHouse, setFullHouse] = useState(fullHouseScore);
  let [smallStraight, setSmallStraight] = useState(smallStraightScore);
  let [largeStraight, setLargeStraight] = useState(largeStraightScore);
  let [yahtzee, setYahtzee] = useState(yahtzeeScore);
  let [chance, setChance] = useState(chanceScore);
  let [bonus, setBonus] = useState(bonusScore);

  return (
    <>
      <div className="hidden minimum:flex minimum:justify-center pt-5 pb-6">
        <h1 className="text-6xl">Yahtzee</h1>
      </div>
      <div>
        <h1 className="flex pt-20 justify-center minimum:hidden">
          {"Landscape Only (660px)"}
        </h1>
        <div className="hidden minimum:flex minimum:justify-center pb-4 pt-10">
          <Dice
            className="px-3"
            number={dice[0]}
            onClick={() => {
              let newHeld = hold(held, dice[0], 1, turn);
              let newHeld2: boolean[] = [];
              newHeld.forEach((element) =>
                newHeld2.push(element === 0 ? true : false)
              );
              setHeld(newHeld);
              setHeld2(newHeld2);
            }}
            held={held2[0]}
          />
          <Dice
            className="px-3"
            number={dice[1]}
            onClick={() => {
              let newHeld = hold(held, dice[1], 2, turn);
              let newHeld2: boolean[] = [];
              newHeld.forEach((element) =>
                newHeld2.push(element === 0 ? true : false)
              );
              setHeld(newHeld);
              setHeld2(newHeld2);
            }}
            held={held2[1]}
          />
          <Dice
            className="px-3"
            number={dice[2]}
            onClick={() => {
              let newHeld = hold(held, dice[2], 3, turn);
              let newHeld2: boolean[] = [];
              newHeld.forEach((element) =>
                newHeld2.push(element === 0 ? true : false)
              );
              setHeld(newHeld);
              setHeld2(newHeld2);
            }}
            held={held2[2]}
          />
          <Dice
            className="px-3"
            number={dice[3]}
            onClick={() => {
              let newHeld = hold(held, dice[3], 4, turn);
              let newHeld2: boolean[] = [];
              newHeld.forEach((element) =>
                newHeld2.push(element === 0 ? true : false)
              );
              setHeld(newHeld);
              setHeld2(newHeld2);
            }}
            held={held2[3]}
          />
          <Dice
            className="px-3"
            number={dice[4]}
            onClick={() => {
              let newHeld = hold(held, dice[4], 5, turn);
              let newHeld2: boolean[] = [];
              newHeld.forEach((element) =>
                newHeld2.push(element === 0 ? true : false)
              );
              setHeld(newHeld);
              setHeld2(newHeld2);
            }}
            held={held2[4]}
          />
        </div>
        <div className="hidden minimum:flex minimum:justify-center pb-2 py-10">
          <Button
            className="bg-blue-600 hover:bg-blue-500 shadow-2xl"
            radius="lg"
            size="xl"
            disabled={turn === 0}
            onClick={async () => {
              setTurn((turn -= 1));
              let { result } = await $fetch(`/api/roll?held=${held.join("")}`);
              setDice(result);

              setAces({
                selected: aces.selected,
                score: aces.selected ? aces.score : number(1, result),
              });
              setTwos({
                selected: twos.selected,
                score: twos.selected ? twos.score : number(2, result),
              });
              setThrees({
                selected: threes.selected,
                score: threes.selected ? threes.score : number(3, result),
              });
              setFours({
                selected: fours.selected,
                score: fours.selected ? fours.score : number(4, result),
              });
              setFives({
                selected: fives.selected,
                score: fives.selected ? fives.score : number(5, result),
              });
              setSixes({
                selected: sixes.selected,
                score: sixes.selected ? sixes.score : number(6, result),
              });
              setThreeOfAKind({
                selected: threeOfAKind.selected,
                score: threeOfAKind.selected
                  ? threeOfAKind.score
                  : await $fetch(`/api/3ofakind?dice=${result.join("")}`).then(
                      (res) => res.result
                    ),
              });
              setFourOfAKind({
                selected: fourOfAKind.selected,
                score: fourOfAKind.selected
                  ? fourOfAKind.score
                  : await $fetch(`/api/4ofakind?dice=${result.join("")}`).then(
                      (res) => res.result
                    ),
              });
              setFullHouse({
                selected: fullHouse.selected,
                score: fullHouse.selected
                  ? fullHouse.score
                  : await $fetch(`/api/fullhouse?dice=${result.join("")}`).then(
                      (res) => res.result
                    ),
              });
              setSmallStraight({
                selected: smallStraight.selected,
                score: smallStraight.selected
                  ? smallStraight.score
                  : await $fetch(
                      `/api/smstraight?dice=${result.join("")}`
                    ).then((res) => res.result),
              });
              setLargeStraight({
                selected: largeStraight.selected,
                score: largeStraight.selected
                  ? largeStraight.score
                  : await $fetch(
                      `/api/lgstraight?dice=${result.join("")}`
                    ).then((res) => res.result),
              });
              setYahtzee({
                selected: yahtzee.selected,
                score: yahtzee.selected
                  ? yahtzee.score
                  : await $fetch(`/api/yahtzee?dice=${result.join("")}`).then(
                      (res) => res.result
                    ),
              });
              setChance({
                selected: chance.selected,
                score: chance.selected
                  ? chance.score
                  : await $fetch(`/api/chance?dice=${result.join("")}`).then(
                      (res) => res.result
                    ),
              });
              setBonus({
                selected: bonus.selected,
                score: upperScore >= 63 ? 35 : 0,
              });

              if (
                yahtzee.selected &&
                (await $fetch(`/api/yahtzee?dice=${result.join("")}`).then(
                  (res) => res.result
                )) !== 0 &&
                !claimed &&
                yahtzee.score !== 0
              ) {
                setClaimed(true);
                setTotal((total += 100));
                showNotification({
                  title: "Bonus Yahtzee!",
                  message:
                    "You have been given 100 points for getting another Yahtzee!",
                  color: "indigo",
                  radius: "lg",
                });
              }
            }}
          >
            Roll [Turns left: {turn}]
          </Button>
        </div>
        {/* <div className="hidden minimum:flex minimum:justify-center pb-2 py-10">
          <Button
            className="bg-blue-600 hover:bg-blue-500 shadow-2xl"
            radius="lg"
            size="xl"
            disabled={!isConnected}
            onClick={() => {console.log("hello")}}
          >
            Save Game
          </Button>
        </div> */}
        <div className="hidden minimum:flex minimum:justify-center pt-10 pb-6">
          <p className="px-6 py-4 text-white bg-blue-600 shadow-2xl rounded-2xl">
            Score: {total}
          </p>
        </div>
        <div className="hidden minimum:flex minimum:justify-center py-10">
          <table className="text-center rounded-2xl shadow-2xl ">
            <thead className="uppercase text-white bg-blue-600 shadow-2xl">
              <tr>
                <td className="px-6 py-3">Select</td>
                <td className="px-6 py-3">Name</td>
                <td className="px-6 py-3">Value</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={aces.selected || turn === 3}
                    onClick={() => {
                      setAces({
                        selected: true,
                        score: aces.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setUpperScore((upperScore += aces.score));
                      setTotal((total += aces.score));

                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });

                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Aces</td>
                <td className="px-3 py-2">{aces.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={twos.selected || turn === 3}
                    onClick={() => {
                      setTwos({
                        selected: true,
                        score: twos.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setCount((count += 1));
                      setUpperScore((upperScore += twos.score));
                      setTotal((total += twos.score));
                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Twos</td>
                <td className="px-3 py-2">{twos.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={threes.selected || turn === 3}
                    onClick={() => {
                      setThrees({
                        selected: true,
                        score: threes.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setUpperScore((upperScore += threes.score));
                      setTotal((total += threes.score));
                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Threes</td>
                <td className="px-3 py-2">{threes.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={fours.selected || turn === 3}
                    onClick={() => {
                      setFours({
                        selected: true,
                        score: fours.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setUpperScore((upperScore += fours.score));
                      setTotal((total += fours.score));
                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Fours</td>
                <td className="px-3 py-2">{fours.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={fives.selected || turn === 3}
                    onClick={() => {
                      setFives({
                        selected: true,
                        score: fives.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setUpperScore((upperScore += fives.score));
                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });
                      setTotal((total += fives.score));
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Fives</td>
                <td className="px-3 py-2">{fives.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={sixes.selected || turn === 3}
                    onClick={() => {
                      setSixes({
                        selected: true,
                        score: sixes.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setUpperScore((upperScore += sixes.score));
                      if (upperScore >= 63 && !bonus.selected)
                        showNotification({
                          title: "Bonus available!",
                          message: "Claim the bonus and earn 35 points!",
                          autoClose: false,
                          radius: "lg",
                          color: "blue",
                        });
                      setTotal((total += sixes.score));
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Sixes</td>
                <td className="px-3 py-2">{sixes.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={bonus.selected || turn === 3 || upperScore < 63}
                    onClick={() => {
                      setBonus({
                        selected: true,
                        score: bonus.score,
                      });
                      setTotal((total += bonus.score));
                    }}
                  >
                    {upperScore >= 63 ? "Bonus" : `${upperScore}/63`}
                  </Button>
                </td>
                <td className="px-3 py-2">Bonus</td>
                <td className="px-3 py-2">{bonus.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={threeOfAKind.selected || turn === 3}
                    onClick={() => {
                      setThreeOfAKind({
                        selected: true,
                        score: threeOfAKind.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));

                      setTotal((total += threeOfAKind.score));
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Three of a Kind</td>
                <td className="px-3 py-2">{threeOfAKind.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={fourOfAKind.selected || turn === 3}
                    onClick={() => {
                      setFourOfAKind({
                        selected: true,
                        score: fourOfAKind.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setTotal((total += fourOfAKind.score));

                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Four of a Kind</td>
                <td className="px-3 py-2">{fourOfAKind.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={fullHouse.selected || turn === 3}
                    onClick={() => {
                      setFullHouse({
                        selected: true,
                        score: fullHouse.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setTotal((total += fullHouse.score));

                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Full House</td>
                <td className="px-3 py-2">{fullHouse.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={smallStraight.selected || turn === 3}
                    onClick={() => {
                      setSmallStraight({
                        selected: true,
                        score: smallStraight.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setTotal((total += smallStraight.score));

                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Small Straight</td>
                <td className="px-3 py-2">{smallStraight.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={largeStraight.selected || turn === 3}
                    onClick={() => {
                      setLargeStraight({
                        selected: true,
                        score: largeStraight.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));
                      setTotal((total += largeStraight.score));

                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Large Straight</td>
                <td className="px-3 py-2">{largeStraight.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={yahtzee.selected || turn === 3}
                    onClick={() => {
                      setYahtzee({
                        selected: true,
                        score: yahtzee.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));

                      setTotal((total += yahtzee.score));
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Yahtzee</td>
                <td className="px-3 py-2">{yahtzee.score}</td>
              </tr>
              <tr>
                <td className="px-3 py-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    radius="md"
                    size="sm"
                    disabled={chance.selected || turn === 3}
                    onClick={() => {
                      setChance({
                        selected: true,
                        score: chance.score,
                      });
                      setTurn(3);
                      setClaimed(false);
                      setHeld([0, 0, 0, 0, 0]);
                      setHeld2([true, true, true, true, true]);
                      setDice([0, 0, 0, 0, 0]);
                      setCount((count += 1));

                      setTotal((total += chance.score));
                      if (count === 13)
                        showNotification({
                          title: "Congratulations! 🎉",
                          message: `You finished the game with ${total} points! Press the X button to play again.`,
                          autoClose: false,
                          radius: "lg",
                          color: "green",
                          onClose: () => router.reload(),
                        });
                    }}
                  >
                    Select
                  </Button>
                </td>
                <td className="px-3 py-2">Chance</td>
                <td className="px-3 py-2">{chance.score}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

function hold(
  heldDice: number[],
  dice: number,
  index: number,
  turn: number
): number[] {
  if (turn === 3) return heldDice;
  heldDice.splice(
    index - 1,
    1,
    heldDice[index - 1] !== 0 && turn !== 3 ? 0 : dice
  );
  return heldDice;
}

export default Home;

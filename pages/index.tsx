import type { NextPage } from "next";
import Dice from "../components/Dice";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex justify-center">
        <Dice className="px-3" number={0}/>
        <Dice className="px-3" number={0}/>
        <Dice className="px-3" number={0}/>
        <Dice className="px-3" number={0}/>
        <Dice className="px-3" number={0}/>
      </div>
    </>
  );
};

export default Home;

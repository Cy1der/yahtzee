import Image from "next/image";

export default function Dice({ number, className, onClick, held }: { number: number, className?: string, onClick?: () => any, held: boolean }) {
  let pulse = "animate-pulse";
  return number === 0 ? (
    <div className={className}>
      <Image
        layout="raw"
        className={`hover:scale-[1.1] ${held ? "" : pulse}`}
        src={"/dicefaces/1.png"}
        width={128}
        height={128}
        alt={`Dice # 1`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
        onClick={onClick}
      />
    </div>
  ) : number >= 1 && number <= 6 ? (
    <div className={className}>
      <Image
        layout="raw"
        className={`hover:scale-[1.1] ${held ? "" : pulse}`}
        src={`/dicefaces/${number}.png`}
        width={128}
        height={128}
        alt={`Dice # ${number}`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
        onClick={onClick}
      />
    </div>
  ) : (
    <div className={className}>
      <Image
        layout="raw"
        className={`hover:scale-[1.1] ${held ? "" : pulse}`}
        src={"/dicefaces/1.png"}
        width={128}
        height={128}
        alt={`Dice # 1`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
        onClick={onClick}
      />
    </div>
  );
}

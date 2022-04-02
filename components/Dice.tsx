import Image from "next/image";

export default function Dice({ number, className }: { number: number, className?: string }) {
  return number === 0 ? (
    <div className={className}>
      <Image
        layout="raw"
        src={"/dicefaces/1.png"}
        width={128}
        height={128}
        alt={`Dice # 1`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
      />
    </div>
  ) : number >= 1 && number <= 6 ? (
    <div className={className}>
      <Image
        layout="raw"
        src={`/dicefaces/${number}.png`}
        width={128}
        height={128}
        alt={`Dice # ${number}`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
      />
    </div>
  ) : (
    <div className={className}>
      <Image
        layout="raw"
        src={"/dicefaces/1.png"}
        width={128}
        height={128}
        alt={`Dice # 1`}
        placeholder="blur"
        blurDataURL="/dicefaces/dice-blur.png"
      />
    </div>
  );
}

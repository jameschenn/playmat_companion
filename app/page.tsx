import Image from "next/image";
import DiceRoll from "../components/playmat/DiceRoll";

export default function Home() {
  return (
    <>
    <main>
      <h1>Your Playmat Companion for playing the One Piece TCG coming soon</h1>
    </main>
    <div>
      <DiceRoll />
    </div>
    </>
  );
}

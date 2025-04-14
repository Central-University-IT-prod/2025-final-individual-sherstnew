import coinIcon from "../static/icons/coin.svg";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCoins } from "../utils/coins";

export function Header() {
  const location = useLocation();
  const [coins, setCoins] = useState<number>(getCoins());

  useEffect(() => {
    const onStorage = () => {
      setCoins(getCoins());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <header className="flex flex-wrap md:flex-nowrap justify-between p-10 pb-0 w-full gap-5 md:gap-0">
      <Link to='/' className="text-2xl">PROD:Тренировки</Link>
      <nav className="flex gap-3 w-full md:w-auto md:gap-10 text-lg flex-wrap md:flex-nowrap" style={{display: location.pathname.includes("runner") ? 'none' : 'flex'}}>
        <Link to="/" className="w-full md:w-auto">
          Упражнения
        </Link>
        <Link to="/trainings" className="w-full md:w-auto">
          Тренировки
        </Link>
        <Link to="/character" className="w-full md:w-auto">
          Персонаж
        </Link>
      </nav>
      <div className="flex gap-3" style={{display: location.pathname.includes("runner") ? 'none' : 'flex'}}>
        <span className="text-xl font-bold">{coins}</span>
        <img src={coinIcon} alt="Монета" className="w-7 h-7" />
      </div>
    </header>
  );
}

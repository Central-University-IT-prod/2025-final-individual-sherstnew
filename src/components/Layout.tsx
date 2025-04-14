import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import plusIcon from "../static/icons/plus.svg";
import {
  deleteCallAchievement,
  getCallAchievement,
} from "../utils/achievements";

export function Layout({ children }: { children: ReactNode }) {
  const [achievement, setAchievement] = useState<string>("");

  const [achievementVisible, setAchievementVisible] = useState<boolean>(false);

  useEffect(() => {
    const onStorage = () => {
      if (getCallAchievement() !== "") {
        setAchievement(getCallAchievement());
        setAchievementVisible(true);
        setTimeout(() => {
          setAchievementVisible(false);
          setTimeout(() => {
            setAchievement("");
            deleteCallAchievement();
          }, 1000);
        }, 5000);
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <>
      <div
        className={`flex gap-3 items-center justify-between min-w-32 md:min-w-64 fixed rounded-b-xl top-0 md:top-10 z-10 text-white bg-stone-950 md:rounded-xl cursor-pointer px-5 py-3 ${
          !achievementVisible ? "right-[-100%]" : "right-0 md:right-10"
        }`}
        style={{ transition: "1s" }}
        onClick={() => setAchievement("")}
      >
        <span className="text-xl">Новое достижение: {achievement}</span>
        <img src={plusIcon} alt="Плюс" className="w-7 h-7 rotate-45 invert" />
      </div>
      <div className="flex flex-wrap w-full text-gray-900 pb-24 items-start content-start">
        <Header />
        <main className="flex flex-wrap content-start gap-5 w-full h-full p-10">
          {children}
        </main>
      </div>
    </>
  );
}

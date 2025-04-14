import { useEffect, useRef, useState } from "react";
import { Layout } from "../components/Layout";
import { getPersonal, updatePersonal } from "../utils/personal";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { Application } from "@splinetool/runtime";
import {
  clothesByCategories,
  clothes,
  defaultClothes,
} from "../static/data/clothes";
import coinIcon from "../static/icons/coin.svg";
import arrowDownIcon from "../static/icons/arrow-down.svg";
import {
  appendCloth,
  buyCloth,
  getAppendClothes,
  getBuyedClothes,
  removeCloth,
  replaceAppendCloth,
} from "../utils/clothes";
import { getCoins, spendCoins } from "../utils/coins";
import { getGoal, getTrainingsStatistics, setGoal } from "../utils/trainings";
import { callAchievement, getAchievements } from "../utils/achievements";
import { achievements } from "../static/data/achievements";
import { Personal } from "../static/types/Personal";
import { getNoun } from "../utils/getNoun";

export function Character() {
  const splineRef = useRef<Application>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [buyedClothes, setBuyedClothes] = useState(getBuyedClothes());
  const [appendClothes, setAppendClothes] = useState(getAppendClothes());

  const [personal, setPersonal] = useState<Personal>(getPersonal());
  const [weight, setWeight] = useState<number>(getPersonal().weight);
  const [height, setHeight] = useState<number>(getPersonal().weight);

  const [opened, setOpened] = useState<string[]>([]);

  useEffect(() => {
    if (getAppendClothes().length === 0) {
      defaultClothes.forEach((cloth) => {
        appendCloth(cloth);
      });
    }
  }, []);

  function renderFace() {
    if (splineRef.current) {
      const trainingsCount = getTrainingsStatistics();
      const face = splineRef.current.findObjectById(
        "f40e9524-6ace-426c-83ff-deeab56c9add"
      );

      if (face) {
        // maxFacePixels - 35 pixels by x
        const maxTrainings = getGoal();
        const maxFacePixels = 35;

        if (trainingsCount <= maxTrainings) {
          const pixelsByTraining = maxFacePixels / maxTrainings;
          const scale = 1 - (pixelsByTraining * trainingsCount) / maxFacePixels;
          face.scale.x = scale > 0.65 ? scale : 0.65;
        }
      }
    }
  }

  function renderScene() {
    const appendClothes = getAppendClothes();
    clothes.forEach((cloth) => {
      if (appendClothes.includes(cloth.id)) {
        const obj = splineRef.current?.findObjectByName(cloth.splineName);
        if (obj) {
          obj.visible = true;
        }
      } else {
        const obj = splineRef.current?.findObjectByName(cloth.splineName);
        if (obj) {
          obj.visible = false;
        }
      }
    });
    renderFace();
  }

  return (
    <>
      {loading ? (
        <div className="w-full h-[100vh] backdrop-blur-sm fixed z-10 flex flex-wrap gap-5 justify-center content-center items-center">
          <span className="w-full text-center text-3xl text-gray-900">
            Загружаем персонажа, подождите...
          </span>
          <Link
            to="/"
            className="block w-auto rounded-xl bg-gray-200 px-5 py-3 text-2xl text-gray-900"
          >
            Домой
          </Link>
        </div>
      ) : (
        ""
      )}
      <Layout>
        <div className="w-full text-3xl">Личные данные</div>
        <div className="flex flex-wrap md:flex-nowrap gap-5 items-end">
          <div className="flex flex-wrap gap-3">
            <label className="w-full text-xl" htmlFor="weight">
              Ваш вес (кг)
            </label>
            <input
              type="number"
              id="weight"
              placeholder="Введите свой вес (кг)"
              className="w-auto rounded-xl bg-gray-200 px-5 py-3"
              defaultValue={personal.weight}
              onChange={(evt) => {
                if (!isNaN(Number(evt.target.value))) {
                  setWeight(Number(evt.target.value));
                }
              }}
              min={40}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="w-full text-xl" htmlFor="height">
              Ваш рост (см)
            </label>
            <input
              type="number"
              id="height"
              placeholder="Введите свой рост (см)"
              className="w-auto rounded-xl bg-gray-200 px-5 py-3"
              defaultValue={personal.height}
              onChange={(evt) => {
                if (!isNaN(Number(evt.target.value))) {
                  setHeight(Number(evt.target.value));
                }
              }}
              min={140}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <label className="w-full text-xl" htmlFor="goal">
              Ваша цель (тренировок):
            </label>
            <input
              type="number"
              id="goal"
              placeholder="Введите кол-во тренировок"
              className="w-auto rounded-xl bg-gray-200 px-5 py-3"
              defaultValue={getGoal()}
              onChange={(evt) => {
                if (
                  !isNaN(Number(evt.target.value)) &&
                  Number(evt.target.value) >= 0
                ) {
                  setGoal(Number(evt.target.value));
                  renderFace();
                }
              }}
              min={0}
            />
          </div>
          <button
            className="w-auto px-5 py-4 rounded-xl cursor-pointer bg-gray-200"
            onClick={() => {
              updatePersonal("weight", weight);
              updatePersonal("height", height);
              setPersonal(getPersonal());
            }}
          >
            Сохранить
          </button>
        </div>
        <div className="w-full text-gray-500">
          У вас пройдено {getTrainingsStatistics()}{" "}
          {getNoun(
            getTrainingsStatistics(),
            "тренировка",
            "тренировки",
            "тренировок"
          )}
          ! Чем ближе к цели - тем худее лицо у персонажа
        </div>
        <div className="w-full text-3xl">Персонаж</div>
        <div className="w-full flex justify-center">
          <div className="w-full h-[100vh] md:w-3/4 md:h-auto rounded-xl">
            <Spline
              scene="https://prod.spline.design/A2tiBeLedrDnYdf7/scene.splinecode"
              onLoad={(spline) => {
                setLoading(false);
                splineRef.current = spline;
                renderScene();
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-5">
          {Object.values(clothesByCategories).map((category, index) => (
            <div className="w-full flex flex-wrap gap-5" key={index}>
              <div
                className="w-full text-2xl flex items-center gap-3 cursor-pointer"
                onClick={() =>
                  setOpened((opened) =>
                    opened.includes(category.name)
                      ? opened.filter((name) => name !== category.name)
                      : [...opened, category.name]
                  )
                }
              >
                <span>{category.name}</span>
                <img
                  src={arrowDownIcon}
                  alt=""
                  className="w-7 h-7 mt-1 transition"
                  style={{
                    transform: `rotate(${
                      opened.includes(category.name) ? "0" : "-90"
                    }deg)`,
                  }}
                />
              </div>
              {/* {opened.includes(category.name) ? ( */}
                <div className={`w-full flex flex-wrap gap-5 transition ${opened.includes(category.name) ? "max-h-[1000vh] opacity-100" : "max-h-0 opacity-0"}`}>
                  {category.items
                    .map((clothId) =>
                      clothes.find((cloth) => cloth.id === clothId)
                    )
                    .map((cloth, index) =>
                      cloth ? (
                        <div
                          className="flex flex-wrap gap-3 w-64 bg-gray-200 rounded-xl"
                          key={index}
                        >
                          <img
                            src={cloth.image}
                            alt={cloth.name}
                            className="w-full h-32 object-cover rounded-t-xl"
                          />
                          <div className="w-full p-5 flex flex-wrap gap-3">
                            <span className="w-full text-2xl">
                              {cloth.name}
                            </span>
                            <span className="flex items-center w-full text-2xl font-bold">
                              <span>{cloth.price}</span>
                              <img
                                src={coinIcon}
                                alt="Монета"
                                className="w-7 h-7"
                              />
                            </span>
                            {buyedClothes.includes(cloth.id) ? (
                              <button
                                className="flex items-center justify-center w-full rounded-xl bg-gray-100 px-5 py-3 cursor-pointer"
                                onClick={() => {
                                  if (appendClothes.includes(cloth.id)) {
                                    const category = Object.values(
                                      clothesByCategories
                                    )
                                      .map((category) => category.items)
                                      .find((category) =>
                                        category.includes(cloth.id)
                                      );
                                    removeCloth(cloth.id);
                                    if (category) {
                                      appendCloth(category[0]);
                                    }
                                  } else {
                                    const category = Object.values(
                                      clothesByCategories
                                    ).find((category) =>
                                      category.items.includes(cloth.id)
                                    );
                                    if (category) {
                                      const appended = appendClothes.find(
                                        (appendCloth) =>
                                          category.items.includes(appendCloth)
                                      );
                                      if (
                                        appended &&
                                        category.name !== "Аксессуары"
                                      ) {
                                        replaceAppendCloth(appended, cloth.id);
                                      } else {
                                        appendCloth(cloth.id);
                                      }
                                    } else {
                                      appendCloth(cloth.id);
                                    }
                                  }
                                  renderScene();
                                  setAppendClothes(getAppendClothes());
                                }}
                              >
                                {appendClothes.includes(cloth.id)
                                  ? "Снять"
                                  : "Надеть"}
                              </button>
                            ) : (
                              <button
                                className="flex items-center justify-center w-full rounded-xl bg-gray-100 px-5 py-3 cursor-pointer"
                                onClick={() => {
                                  if (getCoins() >= cloth.price) {
                                    if (
                                      getBuyedClothes().length === 4 ||
                                      getBuyedClothes().length === 0
                                    ) {
                                      callAchievement("Первая покупка!");
                                    }
                                    spendCoins(cloth.price);
                                    buyCloth(cloth.id);
                                    setBuyedClothes(getBuyedClothes());
                                    if (
                                      getBuyedClothes().length ===
                                      clothes.length
                                    ) {
                                      callAchievement("Богач - купил все вещи");
                                    }
                                  }
                                }}
                              >
                                Купить
                              </button>
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    )}
                </div>
              {/* ) : (
                ""
              )} */}
            </div>
          ))}
        </div>
        <div className="w-full text-gray-500">
          <Link
            to="https://app.spline.design/community/file/17d40bff-3b3e-4585-a81d-f2e139571c4f"
            target="_blank"
          >
            3D models from Spline Community
          </Link>
        </div>
        <div className="w-full flex flex-wrap gap-5">
          <header className="w-full text-2xl">Достижения:</header>
          {getAchievements().map((achievement, index) => (
            <div className="w-full text-xl" key={index}>
              {achievement}
            </div>
          ))}
          {achievements
            .filter((achievement) => !getAchievements().includes(achievement))
            .map((achievement, index) => (
              <div className="w-full text-xl text-gray-400" key={index}>
                {achievement}
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}

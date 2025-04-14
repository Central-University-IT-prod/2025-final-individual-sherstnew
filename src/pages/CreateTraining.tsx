import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Catalog } from "../components/Catalog";
import { Training } from "../static/types/Training";
import {
  getCurrentTraining,
  updateCurrentTraining,
} from "../utils/currentTraining";
import { getExercises } from "../utils/exercises";
import { GoalType } from "../static/types/GoalType";
import { Link, useNavigate } from "react-router-dom";
import { initialCurrentTraining } from "../static/data/initial";
import { createTraining } from "../utils/trainings";
import { getRandomId } from "../utils/getRandomId";
import { getPersonal } from "../utils/personal";
import externalIcon from "../static/icons/external.svg";
import arrowUpIcon from "../static/icons/arrow-up.svg";
import arrowDownIcon from "../static/icons/arrow-down.svg";
import warnIcon from "../static/icons/warn.svg";
import starsIcon from "../static/icons/stars.svg";
import { getPersonalGoal } from "../utils/getPersonalGoal";

export function CreateTraining() {
  const navigate = useNavigate();

  const exercises = getExercises();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [currentTraining, setCurrentTraining] = useState<Training>(
    getCurrentTraining()
  );

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [restTime, setRestTime] = useState<number>(0);

  useEffect(() => {
    if (currentStep === 1) {
      setCurrentTraining(getCurrentTraining());
    }
  }, [currentStep]);

  return (
    <Layout>
      <header className="w-full text-2xl">Создание тренировки</header>
      {currentStep === 0 ? (
        <div className="flex flex-wrap gap-5">
          <div className="w-full text-xl">Шаг 1: выберите упражнения</div>
          <Catalog selectable={true} />
          <button
            className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
            onClick={() => {
              if (getCurrentTraining().exercises.length > 0) {
                setCurrentStep(1);
              }
            }}
          >
            Далее
          </button>
        </div>
      ) : currentStep === 1 ? (
        <div className="flex flex-wrap gap-5">
          <div className="w-full text-xl">Шаг 2: расставьте цели</div>
          <div className="w-full flex flex-wrap gap-10">
            {currentTraining.exercises.map((exercise_ct, index) => (
              <div className="w-full flex flex-wrap gap-5" key={index}>
                <div className="w-full text-2xl flex-wrap md:flex-nowrap flex items-center gap-5">
                  <div className="flex flex-col">
                    <img
                      src={arrowUpIcon}
                      alt="Вверх"
                      className="w-7 h-7 cursor-pointer"
                      onClick={() => {
                        if (index !== 0) {
                          const exercises = currentTraining.exercises;
                          const currentExercise =
                            currentTraining.exercises[index];
                          const previousExercise =
                            currentTraining.exercises[index - 1];
                          exercises[index] = previousExercise;
                          exercises[index - 1] = currentExercise;
                          updateCurrentTraining({
                            ...currentTraining,
                            exercises: exercises,
                          });
                          setCurrentTraining(getCurrentTraining());
                        }
                      }}
                    />
                    <img
                      src={arrowDownIcon}
                      alt="Вниз"
                      className="w-7 h-7 cursor-pointer"
                      onClick={() => {
                        if (index !== currentTraining.exercises.length - 1) {
                          const exercises = currentTraining.exercises;
                          const currentExercise =
                            currentTraining.exercises[index];
                          const nextExercise =
                            currentTraining.exercises[index + 1];
                          exercises[index] = nextExercise;
                          exercises[index + 1] = currentExercise;
                          updateCurrentTraining({
                            ...currentTraining,
                            exercises: exercises,
                          });
                          setCurrentTraining(getCurrentTraining());
                        }
                      }}
                    />
                  </div>
                  <span>
                    {
                      exercises.find((exercise) => exercise.id === exercise_ct)
                        ?.name
                    }
                  </span>
                  <Link
                    to={`/exercise/${exercise_ct}`}
                    target="_blank"
                    className="block rounded-xl cursor-pointer py-2 px-3 bg-gray-200"
                  >
                    <img src={externalIcon} className="w-5 h-6" alt="Открыть в новой вкладке" />
                  </Link>
                </div>
                <div className="w-full flex gap-5 items-center flex-wrap md:flex-nowrap">
                  <input
                    type="text"
                    className="w-auto rounded-xl bg-gray-200 px-5 py-3"
                    value={
                      currentTraining.goals.find(
                        (goal) => goal.exerciseId === exercise_ct
                      )?.goal ?? ""
                    }
                    placeholder={
                      exercises.find((exercise) => exercise.id === exercise_ct)
                        ?.goalType === GoalType.COUNT
                        ? "Кол-во раз (20 раз)"
                        : exercises.find(
                            (exercise) => exercise.id === exercise_ct
                          )?.goalType === GoalType.TIME
                        ? "Время (10 секунд)"
                        : "Цель (8 кг)"
                    }
                    onChange={(evt) => {
                      if (exercises.find(
                        (exercise) => exercise.id === exercise_ct
                      )?.goalType === GoalType.OTHER || (!isNaN(Number(evt.target.value)) && Number(evt.target.value) >= 0)) {
                        if (
                          currentTraining.goals
                            .map((goal) => goal.exerciseId)
                            .includes(exercise_ct)
                        ) {
                          updateCurrentTraining({
                            ...currentTraining,
                            goals: [
                              ...currentTraining.goals.map((goal) => {
                                if (goal.exerciseId === exercise_ct) {
                                  return {
                                    ...goal,
                                    goal:
                                      exercises.find(
                                        (exercise) => exercise.id === exercise_ct
                                      )?.goalType === GoalType.OTHER
                                        ? evt.target.value
                                        : Number(evt.target.value),
                                  };
                                }
                                return goal;
                              }),
                            ],
                          });
                          setCurrentTraining(getCurrentTraining());
                        } else {
                          updateCurrentTraining({
                            ...currentTraining,
                            goals: [
                              ...currentTraining.goals,
                              {
                                exerciseId: exercise_ct,
                                goal:
                                  exercises.find(
                                    (exercise) => exercise.id === exercise_ct
                                  )?.goalType === GoalType.OTHER
                                    ? evt.target.value
                                    : Number(evt.target.value),
                              },
                            ],
                          });
                          setCurrentTraining(getCurrentTraining());
                        }
                      }
                    }}
                  />
                  <span>
                    {exercises.find((exercise) => exercise.id === exercise_ct)
                      ?.goalType === GoalType.COUNT
                      ? "раз"
                      : exercises.find(
                          (exercise) => exercise.id === exercise_ct
                        )?.goalType === GoalType.TIME
                      ? "сек."
                      : "(с единицей измерения)"}
                  </span>
                  {exercises.find((exercise) => exercise.id === exercise_ct)
                    ?.goalType !== GoalType.OTHER ? (
                    <button
                      className="flex items-center gap-3 rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
                      onClick={() => {
                        const goalType = exercises.find(
                          (exercise) => exercise.id === exercise_ct
                        )?.goalType;
                        if (goalType !== undefined) {
                          if (
                            currentTraining.goals
                              .map((goal) => goal.exerciseId)
                              .includes(exercise_ct)
                          ) {
                            updateCurrentTraining({
                              ...currentTraining,
                              goals: [
                                ...currentTraining.goals.map((goal) => {
                                  if (goal.exerciseId === exercise_ct) {
                                    return {
                                      ...goal,
                                      goal: getPersonalGoal(
                                        goalType,
                                        getPersonal()
                                      ),
                                    };
                                  }
                                  return goal;
                                }),
                              ],
                            });
                            setCurrentTraining(getCurrentTraining());
                          } else {
                            updateCurrentTraining({
                              ...currentTraining,
                              goals: [
                                ...currentTraining.goals,
                                {
                                  exerciseId: exercise_ct,
                                  goal: getPersonalGoal(
                                    goalType,
                                    getPersonal()
                                  ),
                                },
                              ],
                            });
                            setCurrentTraining(getCurrentTraining());
                          }
                        }
                      }}
                    >
                      <img src={starsIcon} alt="Звездочки" className="w-6 h-6" />
                      <span className="text-lg">Подобрать цель</span>
                    </button>
                  ) : (
                    ""
                  )}
                  <span>
                    {exercises.find((exercise) => exercise.id === exercise_ct)
                      ?.goalType === GoalType.TIME ? (
                      Number(
                        currentTraining.goals.find(
                          (goal) => goal.exerciseId === exercise_ct
                        )?.goal
                      ) > 600 ? (
                        <div className="flex  items-center gap-3">
                          <img src={warnIcon} alt="Предупреждение" className="w-6 h-6" />
                          <span className="text-lg">
                            Осторожно! Введены большие значения ({">"}600)
                          </span>
                        </div>
                      ) : (
                        ""
                      )
                    ) : exercises.find(
                        (exercise) => exercise.id === exercise_ct
                      )?.goalType === GoalType.COUNT ? (
                      Number(
                        currentTraining.goals.find(
                          (goal) => goal.exerciseId === exercise_ct
                        )?.goal
                      ) > 80 ? (
                        <div className="flex  items-center gap-3">
                          <img src={warnIcon} alt="Предупреждение" className="w-6 h-6" />
                          <span className="text-lg">
                            Осторожно! Введены большие значения ({">"}80)
                          </span>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
            onClick={() => {
              const currentTraining = getCurrentTraining();
              if (
                currentTraining.goals.length ===
                  currentTraining.exercises.length &&
                currentTraining.goals
                  .map((goal) => goal.goal)
                  .every((goal) => goal)
              ) {
                setCurrentTraining(currentTraining);
                setCurrentStep(2);
              }
            }}
          >
            Далее
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-5">
          <div className="w-full text-xl">
            Шаг 3: настройте тренировку и запустите её
          </div>
          <div className="w-full flex flex-wrap gap-3">
            <label htmlFor="name" className="w-full">
              Введите название:
            </label>
            <input
              type="text"
              className="w-auto rounded-xl bg-gray-200 px-5 py-3"
              id="name"
              placeholder="Название..."
              onChange={(evt) => {
                setName(evt.target.value);
              }}
            />
          </div>
          <div className="w-full flex flex-wrap gap-3">
            <label htmlFor="description" className="w-full">
              Введите описание:
            </label>
            <textarea
              className="w-auto rounded-xl bg-gray-200 px-5 py-3 resize-none min-h-32 min-w-64 md:min-w-128"
              id="description"
              placeholder="Описание..."
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
            />
          </div>
          <div className="w-full flex flex-wrap gap-3">
            <label htmlFor="rest" className="w-full">
              Отдых между подходами (сек.):
            </label>
            <input
              type="number"
              className="w-auto rounded-xl bg-gray-200 px-5 py-3"
              id="rest"
              placeholder="Время отдыха (сек.)..."
              value={restTime === 0 ? '' : restTime}
              onChange={(evt) => {
                if (evt.target.value === "") {
                  setRestTime(0);
                } else if (!isNaN(Number(evt.target.value)) && Number(evt.target.value) >= 0) {
                  setRestTime(Number(evt.target.value));
                }
              }}
            />
          </div>
          <div className="w-full flex gap-5 flex-wrap">
            <button
              className="w-full md:w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
              onClick={() => {
                if (name && description && !isNaN(Number(restTime))) {
                  const id = getRandomId(10);
                  const currentTraining = getCurrentTraining();
                  createTraining({
                    ...currentTraining,
                    id: id,
                    name: name,
                    description: description,
                    restTime: restTime,
                  });
                  updateCurrentTraining(initialCurrentTraining);
                  navigate(`/runner?trainingId=${id}`);
                }
              }}
            >
              Сохранить и запустить
            </button>
            <button
              className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
              onClick={() => {
                if (name && description && !isNaN(Number(restTime))) {
                  const currentTraining = getCurrentTraining();
                  const id = getRandomId(10);
                  createTraining({
                    ...currentTraining,
                    id: id,
                    name: name,
                    description: description,
                    restTime: restTime,
                  });
                  updateCurrentTraining(initialCurrentTraining);
                  navigate("/trainings");
                }
              }}
            >
              Сохранить и выйти
            </button>
            <button
              className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
              onClick={() => {
                if (name && description && !isNaN(Number(restTime))) {
                  const currentTraining = getCurrentTraining();
                  const id = getRandomId(10);
                  createTraining({
                    ...currentTraining,
                    id: id,
                    name: name,
                    description: description,
                    restTime: restTime,
                  });
                  updateCurrentTraining(initialCurrentTraining);
                  navigate(`/runner?trainingId=${id}&deleteAfterRun=${id}`);
                }
              }}
            >
              Запустить (без сохранения)
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

import { Layout } from "../components/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteTraining,
  getTrainingById,
  increaseTrainingsStatistics,
} from "../utils/trainings";
import { useEffect, useState } from "react";
import { getExercises } from "../utils/exercises";
import { Exercise } from "../static/types/Exercise";
import { GoalType } from "../static/types/GoalType";
import { pad } from "../utils/pad";
import { Link } from "react-router-dom";
import { difficulties } from "../static/data/difficulties";
import { earnCoins } from "../utils/coins";
import { getNoun } from "../utils/getNoun";
import { audios } from "../static/data/audios";
import playIcon from "../static/icons/play.svg";
import pauseIcon from "../static/icons/pause.svg";
import clockIcon from "../static/icons/clock.svg";
import externalIcon from "../static/icons/external.svg";
import noteIcon from "../static/icons/note.svg";

export function Runner() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const exercises = getExercises();
  const training = getTrainingById(searchParams.get("trainingId") ?? "");

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(-1);
  const [currentExercise, setCurrentExercise] = useState<Exercise>();

  const [isOver, setIsOver] = useState<boolean>(false);

  const [paused, setPaused] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [timerInterval, setTimerInterval] = useState<number>(0);

  const [exerciseTimerPaused, setExerciseTimerPaused] = useState<boolean>(true);
  const [exerciseTimer, setExerciseTimer] = useState<number>(0);
  const [exerciseTimerInterval, setExerciseTimerInterval] = useState<number>(0);

  const [restActive, setRestActive] = useState<boolean>(false);
  const [restTime, setRestTime] = useState<number>(training?.restTime ?? -1);

  const [audioPermission, setAudioPermission] = useState<boolean>(false);

  const [currentAudio, setCurrentAudio] = useState<string>();

  function previousExercise() {
    setCurrentExerciseIndex((currentExerciseIndex) => currentExerciseIndex - 1);
  }

  function playAudio(currentAudio: string) {
    const targetAudio = audios.find((audio) => audio.id === currentAudio);
    if (targetAudio) {
      targetAudio.audio.play();
    }
  }

  function pauseAudio(currentAudio: string) {
    const targetAudio = audios.find((audio) => audio.id === currentAudio);
    if (targetAudio) {
      targetAudio.audio.pause();
    }
  }

  function nextExercise() {
    if (training) {
      if (currentExerciseIndex + 1 > training.exercises.length - 1) {
        clearInterval(timerInterval);
        setExerciseTimerPaused(true);
        setTimerInterval(0);
        setIsOver(true);
        pauseAudio(currentAudio ?? "");
      } else {
        setCurrentExerciseIndex(
          (currentExerciseIndex) => currentExerciseIndex + 1
        );
        // rest start
        setRestActive(true);
        setRestTime(training.restTime);
        const restInterval = setInterval(() => {
          setRestTime((restTime) => {
            if (restTime - 1 > 0) {
              return restTime - 1;
            } else {
              clearInterval(restInterval);
              setRestActive(false);
              return -1;
            }
          });
        }, 1000);
      }
    }
  }

  useEffect(() => {
    if (training && restTime === -1) {
      setRestTime(training.restTime);
    }
  }, [training]);

  useEffect(() => {
    setCurrentExercise(
      exercises.find(
        (exercise) => exercise.id === training?.exercises[currentExerciseIndex]
      )
    );
  }, [currentExerciseIndex]);

  useEffect(() => {
    if (
      currentExercise &&
      training &&
      currentExercise.goalType === GoalType.TIME
    ) {
      setExerciseTimerPaused(true);
      setExerciseTimer(
        Number(
          training.goals.find((goal) => goal.exerciseId === currentExercise.id)
            ?.goal ?? 0
        )
      );
    }
  }, [currentExercise]);

  useEffect(() => {
    if (currentExerciseIndex > -1) {
      if (paused) {
        pauseAudio(currentAudio ?? "");
        clearInterval(timerInterval);
        setExerciseTimerPaused(true);
        setTimerInterval(0);
      } else {
        playAudio(currentAudio ?? "");
        const timerInterval = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
        setTimerInterval(timerInterval);
      }
    }
  }, [paused]);

  useEffect(() => {
    if (
      training &&
      currentExerciseIndex > -1 &&
      currentExercise?.goalType === GoalType.TIME
    ) {
      if (exerciseTimerPaused) {
        clearInterval(exerciseTimerInterval);
        setExerciseTimerInterval(0);
      } else {
        const exerciseTimerInverval = setInterval(() => {
          setExerciseTimer((exerciseTimer) => {
            if (exerciseTimer - 1 > 0) {
              return exerciseTimer - 1;
            } else {
              setExerciseTimerPaused(true);
              nextExercise();
              return 0;
            }
          });
        }, 1000);
        setExerciseTimerInterval(exerciseTimerInverval);
        setPaused(false);
      }
    }
  }, [exerciseTimerPaused]);

  useEffect(() => {
    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then(() => {
          setAudioPermission(true);
        })
        .catch(() => {
          setAudioPermission(false);
        });
    }
  }, []);

  useEffect(() => {
    if (currentAudio && audioPermission) {
      playAudio(currentAudio);
      return () => {
        audios.forEach((audio) => {
          audio.audio.pause();
        });
      };
    }
  }, [currentAudio]);

  return (
    <Layout>
      {training ? (
        isOver ? (
          <div className="w-full flex flex-wrap justify-center items-start content-start h-full gap-5">
            <div className="w-full text-center text-2xl">
              Тренировка завершена: {training.name}
            </div>
            <div className="w-full text-center text-xl">
              Длительность: {pad(timer)}
            </div>
            <div className="w-full text-center text-xl">
              Упражнений выполнено: {training.exercises.length}
            </div>
            <div className="w-full text-center text-xl">
              Всего повторений было сделано:{" "}
              {training.exercises
                .filter(
                  (exerciseId) =>
                    exercises.find((exercise) => exercise.id === exerciseId)
                      ?.goalType === GoalType.COUNT
                )
                .map(
                  (exercise) =>
                    training.goals.find((goal) => goal.exerciseId === exercise)
                      ?.goal
                )
                .reduce(
                  (accumulator, currentValue) =>
                    Number(accumulator ?? 0) + Number(currentValue ?? 0),
                  0
                )}
            </div>
            <div className="w-full text-xl text-center">
              + {training.exercises.length}{" "}
              {getNoun(training.exercises.length, "монета", "монеты", "монет")}
            </div>
            <button
              className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
              onClick={() => {
                // add stars
                if (searchParams.get("deleteAfterRun")) {
                  deleteTraining(searchParams.get("deleteAfterRun") ?? "");
                }
                const moneyEarned = training.exercises.length;
                increaseTrainingsStatistics();
                earnCoins(moneyEarned);
                navigate("/trainings");
              }}
            >
              Завершить
            </button>
          </div>
        ) : restActive ? (
          <div className="w-full flex flex-wrap justify-center items-start content-start h-full gap-5">
            <div className="w-full text-xl text-center">
              Общее время: {pad(timer)}
            </div>
            <div className="w-full text-center text-3xl">Отдых</div>
            <div className="w-full text-center text-xl">
              Осталось: {pad(restTime)}
            </div>
            <div className="w-full flex justify-center gap-5">
              <button
                className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
                onClick={() => {
                  setRestTime((restTime) => {
                    if (restTime - 10 > 0) {
                      return restTime - 10;
                    } else {
                      return 0;
                    }
                  });
                }}
              >
                -10 секунд
              </button>
              <button
                className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
                onClick={() => {
                  setRestTime((restTime) => restTime + 10);
                }}
              >
                +10 секунд
              </button>
            </div>
            {currentExercise ? (
              <div className="mt-14 flex justify-center flex-wrap gap-3">
                <div className="w-full text-center text-2xl flex justify-center items-center gap-3">
                  <span>Следующее упражнение: {currentExercise.name}</span>
                  <Link
                    to={`/exercise/${currentExercise.id}`}
                    target="_blank"
                    className="block rounded-xl cursor-pointer py-2 px-3 bg-gray-200"
                  >
                    <img
                      src={externalIcon}
                      className="w-5 h-6"
                      alt="Открыть в новой вкладке"
                    />
                  </Link>
                </div>
                <div className="w-3/5 text-center text-xl">
                  {currentExercise.instruction}
                </div>
                <div className="w-full text-center text-xl">
                  Оборудование: {currentExercise.equipment.join(", ")}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : currentExerciseIndex === -1 ? (
          <div className="w-full flex flex-wrap justify-center items-center content-center h-full gap-5">
            <span className="w-full text-center text-5xl font-bold">
              {training.name}
            </span>
            <span className="w-full text-center text-xl break-words">
              {training.description}
            </span>
            {audioPermission ? (
              <div className="w-full flex justify-center items-center gap-3">
                <img src={noteIcon} alt="Нота" className="w-7 h-7" />
                <select
                  className="w-auto rounded-xl bg-gray-200 px-5 py-4 cursor-pointer flex gap-3 items-center"
                  onChange={(evt) => {
                    setCurrentAudio(
                      evt.target.value === "none" ? undefined : evt.target.value
                    );
                  }}
                >
                  <option value={"none"}>Музыка не выбрана</option>
                  {audios.map((audio, index) => (
                    <option value={audio.id} key={index}>
                      {audio.name}
                    </option>
                  ))}
                </select>
                <img src={noteIcon} alt="Нота" className="w-7 h-7" />
              </div>
            ) : (
              navigator.mediaDevices
              ?
              <div className="w-full text-center">
                Выдайте необходимые разрешения и добавьте в тренировку немного
                музыки!
              </div>
              :
              ''
            )}
            <button
              className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer flex gap-3 items-center"
              onClick={() => {
                setTimer(0);
                const timerInterval = setInterval(() => {
                  setTimer((timer) => timer + 1);
                }, 1000);
                setTimerInterval(timerInterval);
                setCurrentExerciseIndex(0);
              }}
            >
              <span className="text-xl">Запустить</span>
              <img src={playIcon} alt="Запустить" className="w-7 h-7" />
            </button>
          </div>
        ) : currentExercise ? (
          <div className="w-full flex flex-wrap justify-center items-start content-start h-full gap-5">
            <div className="w-full text-xl text-center">
              Общее время: {pad(timer)}
            </div>
            <header className="flex justify-center items-center gap-3 text-3xl w-full text-center">
              <span>{currentExercise.name}</span>
              <Link
                to={`/exercise/${currentExercise.id}`}
                target="_blank"
                className="block rounded-xl cursor-pointer py-2 px-3 bg-gray-200"
              >
                <img
                  src={externalIcon}
                  className="w-5 h-6"
                  alt="Открыть в новой вкладке"
                />
              </Link>
            </header>
            <div className="text-xl w-4/5 text-center">
              {currentExercise.instruction} / Оборудование:{" "}
              {currentExercise.equipment.join(", ")} / Сложность:{" "}
              <span
                style={{
                  color: difficulties[currentExercise.difficulty].color,
                }}
              >
                {difficulties[currentExercise.difficulty].text}
              </span>
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-5 justify-center w-full text-xl text-center">
              <span>
                {currentExercise.goalType === GoalType.TIME
                  ? pad(exerciseTimer)
                  : training.goals.find(
                      (goal) => goal.exerciseId === currentExercise.id
                    )?.goal ?? ""}{" "}
                {exercises.find(
                  (exercise) => exercise.id === currentExercise.id
                )?.goalType === GoalType.COUNT
                  ? "раз"
                  : ""}
              </span>
              {currentExercise.goalType === GoalType.TIME ? (
                <button
                  className="w-auto flex gap-3 items-center rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
                  onClick={() => {
                    if (exerciseTimer > 0) {
                      setExerciseTimerPaused(
                        (exerciseTimerPaused) => !exerciseTimerPaused
                      );
                    }
                  }}
                >
                  <img src={clockIcon} alt="Часы" className="w-7 h-7" />
                  <span>
                    {exerciseTimerPaused
                      ? "Запустить таймер"
                      : "Остановить таймер"}
                  </span>
                </button>
              ) : (
                ""
              )}
            </div>
            <div className="flex w-full overflow-x-auto gap-5 h-64">
              {currentExercise.images.map((image, index) => (
                <img
                  src={image}
                  alt={currentExercise.name}
                  key={"i" + index}
                  className="rounded-xl w-auto h-full"
                />
              ))}
              {currentExercise.videos.map((video, index) => (
                <video
                  src={video}
                  key={"v" + index}
                  controls
                  className="rounded-xl w-auto h-full"
                ></video>
              ))}
            </div>
            <div className="flex justify-center items-center gap-5 fixed bottom-0 backdrop-blur-md p-5 rounded-xl">
              <button
                className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
                onClick={previousExercise}
              >
                Назад
              </button>
              <button
                className="p-5 rounded-[50%] bg-gray-200 cursor-pointer"
                onClick={() => {
                  setPaused((paused) => !paused);
                }}
              >
                <img
                  src={paused ? playIcon : pauseIcon}
                  alt="Пауза/Старт"
                  className="w-10 h-10"
                />
              </button>
              <button
                className="w-auto rounded-xl bg-gray-200 px-5 py-3 cursor-pointer"
                onClick={nextExercise}
              >
                Вперед
              </button>
            </div>
          </div>
        ) : (
          ""
        )
      ) : (
        "Тренировка не найдена"
      )}
    </Layout>
  );
}

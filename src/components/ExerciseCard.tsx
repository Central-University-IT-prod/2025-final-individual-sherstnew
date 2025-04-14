import { Exercise } from "../static/types/Exercise";
import { Link, useNavigate } from "react-router-dom";
import { difficulties } from "../static/data/difficulties";
import { goals } from "../static/data/goals";
import { deleteExercise } from "../utils/exercises";
import {
  getCurrentTraining,
  updateCurrentTraining,
} from "../utils/currentTraining";
import { useState } from 'react';
import { Training } from '../static/types/Training';

export function ExerciseCard({
  exercise,
  selectable,
}: {
  exercise: Exercise;
  selectable: boolean;
}) {
  const navigate = useNavigate();

  const [currentTraining, setCurrentTraining] = useState<Training>(getCurrentTraining());

  return (
    <div className="w-64 flex content-start flex-wrap items-stretch rounded-xl bg-gray-200">
      <Link
        to={`/exercise/${exercise.id}`}
        className="w-full h-48 object-cover rounded-t-xl flex justify-center items-center"
      >
        <img
          src={exercise.images[0]}
          alt={exercise.name}
          className="w-full h-48 object-cover rounded-t-xl flex justify-center items-center"
        />
      </Link>
      <div className="flex content-start flex-wrap gap-3 p-5 w-full">
        <Link to={`/exercise/${exercise.id}`} className="w-full text-xl">
          {exercise.name}
        </Link>
        <div
          className="w-full text-lg"
          style={{ color: difficulties[exercise.difficulty].color }}
        >
          {difficulties[exercise.difficulty].text}
        </div>
        <div className="text-lg w-full">{goals[exercise.goalType]}</div>
        <div className="w-full text-lg">{exercise.equipment.join(", ")}</div>
        <div className="flex flex-wrap gap-2 w-full">
          {exercise.attributes.map((attribute, index) => (
            <Link
            to={`/?attribute=${attribute}`}
              className="px-5 py-3 bg-gray-100 rounded-xl cursor-pointer"
              key={index}
            >
              {attribute}
            </Link>
          ))}
        </div>
        {selectable ? (
          <button
            className="flex justify-center items-center rounded-xl cursor-pointer py-2 px-4 bg-gray-100"
            onClick={() => {
              const currentTraining = getCurrentTraining();
              if (currentTraining.exercises.includes(exercise.id)) {
                updateCurrentTraining({
                  ...currentTraining,
                  exercises: currentTraining.exercises.filter(
                    (exercise_ct) => exercise_ct !== exercise.id
                  ),
                });
              } else {
                updateCurrentTraining({
                  ...currentTraining,
                  exercises: [...currentTraining.exercises, exercise.id],
                });
              }
              setCurrentTraining(getCurrentTraining());
            }}
          >
            {currentTraining.exercises.includes(exercise.id)
              ? "Убрать из тренировки"
              : "Добавить в тренировку"}
          </button>
        ) : (
          ""
        )}
        <Link
          to={`/edit_exercise/${exercise.id}`}
          className="flex justify-center items-center rounded-xl cursor-pointer py-2 px-4 bg-gray-100"
        >
          Редактировать
        </Link>
        <button
          className="flex justify-center items-center rounded-xl cursor-pointer py-2 px-4 bg-gray-100"
          onClick={() => {
            deleteExercise(exercise.id);
            navigate(0);
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}

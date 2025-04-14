import { useEffect, useState } from "react";
import { getExercises } from "../utils/exercises";
import { Exercise } from "../static/types/Exercise";
import { ExerciseCard } from "../components/ExerciseCard";
import { Difficulty } from "../static/types/Difficulty";
import { difficulties } from "../static/data/difficulties";
import plusIcon from "../static/icons/plus.svg";
import {
  getCurrentTraining,
  updateCurrentTraining,
} from "../utils/currentTraining";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Catalog({ selectable }: { selectable: boolean }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [exercises] = useState<Exercise[]>(getExercises());
  const [filteredExcercises, setFilteredExercises] = useState(getExercises());

  const [attributes, setAttributes] = useState<(string | null)[]>([null]);
  const [equipment, setEquipment] = useState<string>();
  const [difficulty, setDifficulty] = useState<Difficulty>();

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (searchParams.get("attribute")) {
      setAttributes([searchParams.get("attribute") ?? null]);
    }
  }, [searchParams]);

  useEffect(() => {
    let newExercises = [...exercises];

    if (equipment !== undefined) {
      newExercises = newExercises.filter((exercise) =>
        exercise.equipment.includes(equipment)
      );
    }

    if (difficulty !== undefined) {
      newExercises = newExercises.filter(
        (exercise) => exercise.difficulty === difficulty
      );
    }

    newExercises = newExercises.filter((exercise) =>
      attributes.every((attribute) =>
        attribute ? exercise.attributes.includes(attribute) : true
      )
    );

    if (search) {
      newExercises = newExercises.filter(
        (exercise) =>
          exercise.name.includes(search) ||
          exercise.instruction.includes(search) ||
          exercise.equipment.join(", ").includes(search)
      );
    }

    setFilteredExercises(newExercises);
  }, [attributes, equipment, difficulty, exercises, searchParams, search]);

  return (
    <div className="w-full flex flex-wrap gap-5">
      {selectable ? (
        <>
          <button
            className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
            onClick={() => {
              const currentTraining = getCurrentTraining();
              updateCurrentTraining({
                ...currentTraining,
                exercises: Array.from(
                  new Set([
                    ...currentTraining.exercises,
                    ...filteredExcercises.map((exercise) => exercise.id),
                  ])
                ),
              });
              navigate(0);
            }}
          >
            Выбрать все
          </button>
          <button
            className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
            onClick={() => {
              const currentTraining = getCurrentTraining();
              updateCurrentTraining({
                ...currentTraining,
                exercises: [],
              });
              navigate(0);
            }}
          >
            Очистить выбор
          </button>
        </>
      ) : (
        ""
      )}
      <div className="w-full flex flex-wrap gap-5">
        <div className="text-xl w-full">Фильтры</div>
        <div className="w-full">
          <input
            type="text"
            className="w-full md:w-1/2 rounded-xl bg-gray-200 px-5 py-3"
            placeholder="Поиск по названию, инструкции, оборудованию..."
            onChange={(evt) => {
              setSearch(evt.target.value);
            }}
          />
        </div>
        <select
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          onChange={(evt) => {
            if (evt.target.value !== "none") {
              setDifficulty(Number(evt.target.value));
            } else {
              setDifficulty(undefined);
            }
          }}
        >
          <option value="none">Не выбрано</option>
          {Object.entries(difficulties).map((entry, index) => (
            <option value={entry[0]} key={index}>
              {entry[1].text}
            </option>
          ))}
        </select>
        <select
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          onChange={(evt) => {
            if (evt.target.value !== "none") {
              setEquipment(evt.target.value);
            } else {
              setEquipment(undefined);
            }
          }}
        >
          <option value="none">Не выбрано</option>
          {Array.from(
            new Set(exercises.map((exercise) => exercise.equipment).flat())
          ).map((equipment, index) => (
            <option value={equipment} key={index}>
              {equipment}
            </option>
          ))}
        </select>

        {attributes.map((attribute, index) => (
          <select
            value={attribute ?? "none"}
            className="w-auto rounded-xl bg-gray-200 px-5 py-3"
            onChange={(evt) => {
              if (evt.target.value !== "none") {
                setAttributes((attributes) =>
                  attributes.map((attribute, ai) => {
                    if (ai === index) {
                      return evt.target.value;
                    }
                    return attribute;
                  })
                );
              } else {
                setAttributes((attributes) =>
                  attributes.map((attribute, ai) => {
                    if (ai === index) {
                      return null;
                    }
                    return attribute;
                  })
                );
              }
            }}
            key={index}
          >
            <option value="none">Не выбрано</option>
            {Array.from(
              new Set(exercises.map((exercise) => exercise.attributes).flat())
            ).map((equipment, index) => (
              <option value={equipment} key={index}>
                {equipment}
              </option>
            ))}
          </select>
        ))}
        <button
          className="text-3xl rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
          onClick={() => {
            setAttributes((attributes) => [...attributes, null]);
          }}
        >
          <img src={plusIcon} alt="Плюс" className="w-5 h-8" />
        </button>
      </div>
      <div className="flex flex-wrap w-full gap-5">
        {filteredExcercises.map((exercise, index) => (
          <ExerciseCard
            exercise={exercise}
            selectable={selectable}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Layout } from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import { Exercise as IExercise } from "../static/types/Exercise";
import { getExerciseById } from "../utils/exercises";
import { difficulties } from "../static/data/difficulties";
import { goals } from "../static/data/goals";

export function Exercise() {
  const { id } = useParams();

  const [exercise] = useState<IExercise | undefined>(getExerciseById(id ?? ""));

  return (
    <Layout>
      {exercise ? (
        <div className="flex flex-wrap gap-5">
          <header className="text-4xl w-full">{exercise.name}</header>
          <div className="flex w-full overflow-x-auto gap-5 max-h-96">
            {exercise.images.map((image, index) => (
              <img
                src={image}
                alt={exercise.name}
                key={"i" + index}
                className="rounded-xl w-auto h-full"
              />
            ))}
            {exercise.videos.map((video, index) => (
              <video
                src={video}
                key={"v" + index}
                controls
                className="rounded-xl w-auto h-full"
              ></video>
            ))}
          </div>
          <div className="w-full text-xl/7">
            Инструкция: {exercise.instruction}
          </div>
          <div className="w-full text-lg">
            Оборудование: {exercise.equipment.join(", ")}
          </div>
          <div
            className="w-full text-xl"
            style={{ color: difficulties[exercise.difficulty].color }}
          >
            {difficulties[exercise.difficulty].text}
          </div>
          <div className="text-lg w-full">{goals[exercise.goalType]}</div>
          <div className="flex flex-wrap gap-5 w-full">
            {exercise.attributes.map((attribute, index) => (
              <Link
                to={`/?attribute=${attribute}`}
                className="px-5 py-3 bg-gray-200 rounded-xl cursor-pointer"
                key={index}
              >
                {attribute}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        "Упражнение не найдено :("
      )}
    </Layout>
  );
}

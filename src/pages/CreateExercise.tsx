import { useState } from "react";
import { Layout } from "../components/Layout";
import { difficulties } from "../static/data/difficulties";
import { Difficulty } from "../static/types/Difficulty";
import { GoalType } from "../static/types/GoalType";
import { goals } from "../static/data/goals";
import { createExercise } from "../utils/exercises";
import { getRandomId } from "../utils/getRandomId";
import { useNavigate } from "react-router-dom";
import plusIcon from "../static/icons/plus.svg";
import binIcon from "../static/icons/bin.svg";

export function CreateExercise() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [instruction, setInstruction] = useState<string>("");
  const [difficulty, setDifficulty] = useState<Difficulty>(0);
  const [goal, setGoal] = useState<GoalType>(0);

  const [equipment, setEquipment] = useState<string[]>([]);
  const [attributes, setAttributes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  const [currentEquipment, setCurrentEquipment] = useState<string>("");
  const [currentAttribute, setCurrentAttribute] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");
  const [currentVideo, setCurrentVideo] = useState<string>("");

  return (
    <Layout>
      <header className="text-2xl">Создать упражнение</header>
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
        <label htmlFor="instruction" className="w-full">
          Введите инструкцию:
        </label>
        <textarea
          className="w-auto rounded-xl bg-gray-200 px-5 py-3 resize-none min-w-64 md:min-w-128 min-h-32"
          id="instruction"
          placeholder="Инструкция..."
          onChange={(evt) => {
            setInstruction(evt.target.value);
          }}
        />
      </div>

      <label className="w-full">
        Добавьте картинки/видео (URL на внешний ресурс)
      </label>
      <div className="w-full flex flex-wrap gap-3">
        <div className="w-full flex gap-3 flex-wrap items-stretch">
          {images.map((image, index) => (
            <div className="relative h-32">
              <img src={image} alt="Картинка упражнения" key={index} className="h-32 rounded-xl" />
              <button
                className="absolute bottom-3 right-3 p-3 bg-gray-100 rounded-xl cursor-pointer"
                onClick={() => {
                  setImages((images) => images.filter((_v, i) => i !== index));
                }}
              >
                <img src={binIcon} alt="Корзина" className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          placeholder="URL на картинку..."
          value={currentImage}
          onChange={(evt) => {
            setCurrentImage(evt.target.value);
          }}
        />
        <button
          className="text-3xl rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
          onClick={() => {
            setImages((images) => {
              if (currentImage) {
                setCurrentImage("");
                return [...images, currentImage];
              }
              return images;
            });
          }}
        >
          <img src={plusIcon} alt="Плюс" className="w-5 h-8" />
        </button>
      </div>

      <div className="w-full flex flex-wrap items-start gap-3">
        <div className="w-full flex gap-3 flex-wrap items-stretch">
          {videos.map((video, index) => (
            <div className="relative h-32">
              <video
                src={video}
                controls
                className="h-32 rounded-xl"
                key={index}
              ></video>
              <button
                className="absolute bottom-3 right-3 p-3 bg-gray-100 rounded-xl cursor-pointer"
                onClick={() => {
                  setVideos((videos) => videos.filter((_v, i) => i !== index));
                }}
              >
                <img src={binIcon} alt="Корзина" className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          placeholder="URL на видео..."
          value={currentVideo}
          onChange={(evt) => {
            setCurrentVideo(evt.target.value);
          }}
        />
        <button
          className="text-3xl rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
          onClick={() => {
            setVideos((videos) => {
              if (currentVideo) {
                setCurrentVideo("");
                return [...videos, currentVideo];
              }
              return videos;
            });
          }}
        >
          <img src={plusIcon} alt="Плюс" className="w-5 h-8" />
        </button>
      </div>

      <div className="w-full flex flex-wrap gap-3">
        <label htmlFor="difficulty" className="w-full">
          Выберите сложность:
        </label>
        <select
          id="difficulty"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          onChange={(evt) => {
            setDifficulty(Number(evt.target.value));
          }}
        >
          {Object.entries(difficulties).map((entry, index) => (
            <option value={entry[0]} key={index}>
              {entry[1].text}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex flex-wrap gap-3">
        <label htmlFor="goal" className="w-full">
          Выберите тип цели:
        </label>
        <select
          id="goal"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          onChange={(evt) => {
            setGoal(Number(evt.target.value));
          }}
        >
          {Object.entries(goals).map((entry, index) => (
            <option value={entry[0]} key={index}>
              {entry[1]}
            </option>
          ))}
        </select>
      </div>
      <label className="w-full">Добавьте необходимое оборудование</label>
      <div className="w-full flex flex-wrap gap-3">
        {equipment.map((equip, index) => (
          <div
            className="px-5 py-3 bg-gray-200 rounded-xl cursor-pointer"
            key={index}
          >
            {equip}
          </div>
        ))}
        <input
          type="text"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          placeholder="Новое оборудование..."
          value={currentEquipment}
          onChange={(evt) => {
            setCurrentEquipment(evt.target.value);
          }}
        />
        <button
          className="text-3xl rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
          onClick={() => {
            setEquipment((equipment) => {
              if (currentEquipment) {
                setCurrentEquipment("");
                return [...equipment, currentEquipment];
              }
              return equipment;
            });
          }}
        >
          <img src={plusIcon} alt="Плюс" className="w-5 h-8" />
        </button>
      </div>
      <label className="w-full">Добавьте теги-атрибуты</label>
      <div className="w-full flex flex-wrap gap-3">
        {attributes.map((attribute, index) => (
          <div
            className="px-5 py-3 bg-gray-200 rounded-xl cursor-pointer"
            key={index}
          >
            {attribute}
          </div>
        ))}
        <input
          type="text"
          className="w-auto rounded-xl bg-gray-200 px-5 py-3"
          placeholder="Новый атрибут..."
          value={currentAttribute}
          onChange={(evt) => {
            setCurrentAttribute(evt.target.value);
          }}
        />
        <button
          className="text-3xl rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
          onClick={() => {
            setAttributes((attributes) => {
              if (currentAttribute) {
                setCurrentAttribute("");
                return [...attributes, currentAttribute];
              }
              return attributes;
            });
          }}
        >
          <img src={plusIcon} alt="Плюс" className="w-5 h-8" />
        </button>
      </div>
      <button
        className="text-lg rounded-xl cursor-pointer py-2 px-4 bg-gray-200"
        onClick={() => {
          if (
            name &&
            instruction &&
            equipment.length > 0 &&
            attributes.length > 0 &&
            images.length > 0
          ) {
            createExercise({
              id: getRandomId(10),
              name: name,
              instruction: instruction,
              difficulty: difficulty,
              goalType: goal,
              images: images,
              videos: videos,
              equipment: equipment,
              attributes: attributes,
            });
            navigate("/");
          }
        }}
      >
        Создать
      </button>
    </Layout>
  );
}

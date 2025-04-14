import rain from "../audio/rain.mp3";
import birds from "../audio/birds.mp3";
import night from "../audio/night.mp3";
import calm from "../audio/calm.mp3";

export const audios = [
  {
    id: "e06aa6aa-10de-5a6f-9f3c-7c3e84be8cf5",
    name: "Дождь",
    audio: new Audio(rain),
  },
  {
    id: "69ad7a15-f1ac-56af-a1d3-3c4c9a88c963",
    name: "Птички",
    audio: new Audio(birds),
  },
  {
    id: "1dcd7601-bb54-5755-8364-5f48abef6429",
    name: "Ночь",
    audio: new Audio(night),
  },
  {
    id: "4b5ccb0d-a181-50cc-b9c9-653da9cba01a",
    name: "Спокойствие",
    audio: new Audio(calm),
  },
];

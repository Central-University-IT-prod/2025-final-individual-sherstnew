import { Exercise } from "../types/Exercise";
import { Training } from "../types/Training";
import { Difficulty } from "../types/Difficulty";
import { GoalType } from "../types/GoalType";
import { getRandomId } from "../../utils/getRandomId";

// 15 exercises
export const initialExercises: Exercise[] = [
  {
    id: "7c4bd8e6-ff93-567b-9879-06785af7bcdf",
    instruction:
      "Лягте ровно, поднимите руки вверх и хорошенько потянитесь, теперь закиньте руки за голову и сцепите их в замок. Поднимите ноги вверх, согнув их в коленях. Представьте, что едете на велосипеде, поочерёдно перемещайте ноги, как будто крутите педали.",
    name: "Велосипед",
    images: [
      "https://img.championat.com/i/b/i/1661512985266938171.jpg",
      "https://img.freepik.com/free-photo/woman-lying-floor-while-doing-sit-ups_1163-885.jpg?semt=ais_hybrid",
    ],
    videos: [
     "https://videocdn.cdnpk.net/videos/2768ed06-1010-52eb-a0fa-16a87f89e431/horizontal/previews/watermarked/small.mp4"
    ],
    difficulty: Difficulty.EASY,
    equipment: ["коврик"],
    attributes: ["для ног", "для пресса"],
    goalType: GoalType.TIME,
  },
  {
    id: "0ab77917-f110-5577-bd92-4ad847859bec",
    instruction:
      "Сядьте на кровати по-турецки.Потянитесь руками вперёд, положив их перед собой. Задержитесь в этом положении ненадолго.Вернитесь в исходное положение.",
    name: "Растяжка спины",
    images: ["https://img.freepik.com/free-photo/pretty-attractive-girl-doing-yoga-bright-room_78826-3267.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/50fb1499-0ff8-5821-854c-bb43830cc6c5/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.MEDIUM,
    equipment: ["коврик"],
    attributes: ["для спины"],
    goalType: GoalType.OTHER,
  },
  {
    id: "d588bafc-532c-508a-8645-54ca10e645be",
    instruction:
      "Сядьте на край кровати, поставьте ноги на пол, правую ногу – на носок. Повращайте стопой сначала по часовой стрелке, а затем против. Повторите упражнение на левую ногу.",
    name: "Повороты стопы",
    images: ["https://img.freepik.com/free-photo/close-up-female-dancer-feet_23-2148004027.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/da981fec-4c29-40f3-a0d0-40ff546f16df/horizontal/previews/watermarked/small.mp4", "https://videocdn.cdnpk.net/videos/8ca6329b-dac4-4d58-82d4-45b3e461a6de/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.EASY,
    equipment: ["кровать"],
    attributes: ["для ног"],
    goalType: GoalType.COUNT,
  },
  {
    id: "48f3ce11-e788-581a-809b-a5192857a035",
    instruction:
      "Встаньте прямо, ноги на ширине плеч. При повороте старайтесь максимально наклонять голову, делайте это упражнение в медленном темпе для лучшего растяжения мышц.",
    name: "Вращения головой",
    images: ["https://img.championat.com/i/d/s/1661513636454700432.jpg"],
    videos: [],
    difficulty: Difficulty.EASY,
    equipment: ["коврик"],
    attributes: ["для шеи"],
    goalType: GoalType.COUNT,
  },
  {
    id: "cf4a7098-276e-5a4b-a4e9-261903c636d7",
    instruction:
      "Возьмите в руки гантели, ноги поставьте на ширине плеч. Ладони разверните вперед, корпус держите прямо. Плавно согните руку в локте. Задержите гантель в верхней точке и медленно верните руку в исходное положение. Повторите упражнение другой рукой.",
    name: "Сгибания рук с гантелями",
    images: ["https://img.freepik.com/free-photo/front-view-female-hand-holding-red-dumbbell-white_140725-18133.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.HARD,
    equipment: ["гантели", "скакалка"],
    attributes: ["для ног", "для груди"],
    goalType: GoalType.OTHER,
  },
  {
    id: "0603d57e-e29f-5da2-8a29-fc1e44594c42",
    instruction:
      "Возьмите гантели прямым хватом и поднимите руки вверх до уровня плеч. Можно выполнять это упражнение сидя. Локти согните под прямым углом и выжмите гантели вверх, полностью выпрямляя руки. Вернитесь обратно, но не опускайте локти слишком низко, предплечья должны быть почти параллельны полу. Базовое упражнение с гантелями для мужчин не только прокачает дельтоиды, но также укрепит плечи, помогая развить мощную мускулатуру в верхней части тела.",
    name: "Жим вверх",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/05/Zhim_ganteley_stoya_2.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.HARD,
    equipment: ["гантели"],
    attributes: ["для груди", "для рук"],
    goalType: GoalType.OTHER,
  },
  {
    id: "3a29dccf-b96c-5140-ae49-aa37b36e4b6b",
    instruction:
      "Сядьте на лавку или (останьтесь стоять) и возьмите гантели обратным хватом. Сведите локти на уровне груди, а затем разведите руки в стороны. В крайней точке движения выполните жим гантелей вверх, а затем опустите руки и снова сведите локти в стороны. Комбинированное упражнение с гантелями для мужчин задействует все пучки дельтовидных мышц, акцентируя внимания на передних и средних, которые формируют рельеф плеч.",
    name: "Жим Арнольда",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/04/Zhim_arnolda_sidya.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.EASY,
    equipment: ["гантели", "лавка"],
    attributes: ["для рук", "для груди"],
    goalType: GoalType.COUNT,
  },
  {
    id: "80cb5e88-4b87-5667-9199-0e791d161bd0",
    instruction:
      "Поставьте ноги на ширине плеч и возьмите гантели прямым хватом на вытянутых вниз руках. Держите локти немного согнутыми, чтобы снизить нагрузку на суставы. Поднимите одну руку вверх до параллели с полом, выполняя движение от плеча. Затем опустите и поднимите другую. Изолированное упражнение на передние дельты укрепляет плечи, косвенно задействуя руки, в частности предплечья.",
    name: "Подъем гантелей на прямых руках",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/04/Podemy_ruk_pered_soboj_poperemenno_2.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.MEDIUM,
    equipment: ["гантели"],
    attributes: ["для груди"],
    goalType: GoalType.COUNT,
  },
  {
    id: "31cd804a-7db2-58b7-a8c3-5c5e1a15e761",
    instruction:
      "Стоя прямо, возьмите гантели нейтральным хватом и опустите руки вниз перед бедрами. Локти немного согните, а затем разведите руки в стороны до параллели с полом. При разведениях задействуйте плечи, не помогая себе корпусом и руками. Изолированное силовое упражнение с гантелями для мужчин включает в работу передние и средние дельтоиды, а также задействует мышцы груди, укрепляя верх корпуса.",
    name: "Разводка рук через стороны",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/05/Tyaga_gentelej_k_podborodku_2.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.HARD,
    equipment: ["гантели"],
    attributes: ["для рук", "для груди"],
    goalType: GoalType.TIME,
  },
  {
    id: "c87a899b-5f3f-5fe9-a7dc-f5a7213913a8",
    instruction:
      "Поставьте ноги на ширине плеч, возьмите одну гантель обратным хватом и поднимите руку к груди. Другую руку выпрямите и отведите в сторону. Гантель выжмите вверх, поворачивая кисть во время движения. Особенностью этого упражнения из тренировки с гантелями для мужчин является супинация, которая позволяет задействовать все пучки дельт, качественно прокачивая плечевой пояс.",
    name: "Жим одной гантели вверх с супинацией",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/05/Zhim_na_plechi_odnoj_rukoj.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.HARD,
    equipment: ["гантели"],
    attributes: ["для рук"],
    goalType: GoalType.COUNT,
  },
  {
    id: "bcbe9ac7-4e7f-55c5-bfe3-00d9a0d5b46f",
    instruction:
      "Встаньте прямо, ноги на ширине плеч, возьмите гантели нейтральным хватом и положите их на плечи. Выжмите гантели вверх с полной амплитудой, нагружая плечи и верх спины. Базовое упражнение задействует дельтоиды, в частности средние пучки, а также подключает мышцы плечевого пояса, помогая сформировать мощный рельеф верхней части тела.",
    name: "Жим вверх нейтральным хватом",
    images: ["https://goodlooker.ru/wp-content/uploads/2021/04/Zhim_ganteley_stoya_neutral_2.gif"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.HARD,
    equipment: ["гантели", "коврик"],
    attributes: ["для ног", "для рук", "для груди"],
    goalType: GoalType.COUNT,
  },
  {
    id: "3cd0c78f-bf00-5887-a034-9ef8be675cb5",
    instruction:
      "Скакать долго долго чтобы устал",
    name: "Скакалка",
    images: ["https://img.freepik.com/free-photo/young-woman-doing-fitness-outdoor_624325-1997.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.MEDIUM,
    equipment: ["гантели", "скакалка"],
    attributes: ["для ног", "для груди"],
    goalType: GoalType.TIME,
  },
  {
    id: "6af2442a-c132-52b7-a218-e21dbb1949c2",
    instruction:
      "Жим штанги лежа, что тут еще написать то",
    name: "Жим штанги лежа",
    images: ["https://img.freepik.com/free-photo/man-lifting-weights-chest_1048-2409.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.MEDIUM,
    equipment: ["штанга", "лавка"],
    attributes: ["для рук", "для груди"],
    goalType: GoalType.OTHER,
  },
  {
    id: "19ce0d56-731b-5557-9c3c-2f67f5516ced",
    instruction:
      "Бегит прыгит устават",
    name: "Бег",
    images: ["https://img.freepik.com/free-photo/healthy-man-doing-sport_1098-123.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.EASY,
    equipment: ["гантели", "скакалка"],
    attributes: ["для ног", "для груди"],
    goalType: GoalType.TIME,
  },
  {
    id: "a5939ee1-5c8e-5019-aa8e-fd0a94e04168",
    instruction:
      "Пресс качат сильно сильно",
    name: "Пресс качат",
    images: ["https://img.freepik.com/premium-photo/beautiful-sporty-woman-doing-exercise-floor_380164-33943.jpg?semt=ais_hybrid"],
    videos: ["https://videocdn.cdnpk.net/videos/b9ef8846-b917-489f-86f7-b890a7c57b0e/horizontal/previews/watermarked/small.mp4"],
    difficulty: Difficulty.EASY,
    equipment: ["коврик"],
    attributes: ["для пресса"],
    goalType: GoalType.COUNT,
  },
];

// 3 trainings
export const initialTrainings: Training[] = [
  {
    id: "929ef47b-6c1c-5a5d-986d-4e5a45d15e22",
    name: "Первая тренировка (самая подробная)",
    description: "Тут разные типы упражнений чтобы посмотрели как все красиво работает",
    exercises: [
      "7c4bd8e6-ff93-567b-9879-06785af7bcdf",
      "0ab77917-f110-5577-bd92-4ad847859bec",
      "d588bafc-532c-508a-8645-54ca10e645be",
    ],
    restTime: 10,
    goals: [
      {
        exerciseId: "7c4bd8e6-ff93-567b-9879-06785af7bcdf",
        goal: 10,
      },
      {
        exerciseId: "0ab77917-f110-5577-bd92-4ad847859bec",
        goal: "пока не почувствуете радость жизни",
      },
      {
        exerciseId: "d588bafc-532c-508a-8645-54ca10e645be",
        goal: 50,
      },
    ],
  },
  {
    id: "e079f753-3a35-56e4-89bd-b879c805896e",
    name: "Вторая тренировка",
    description: "Самая вторая тренировка с несколькими упражнениями",
    exercises: [
      "bcbe9ac7-4e7f-55c5-bfe3-00d9a0d5b46f",
      "3cd0c78f-bf00-5887-a034-9ef8be675cb5",
    ],
    restTime: 15,
    goals: [
      {
        exerciseId: "bcbe9ac7-4e7f-55c5-bfe3-00d9a0d5b46f",
        goal: 100,
      },
      {
        exerciseId: "3cd0c78f-bf00-5887-a034-9ef8be675cb5",
        goal: 30,
      },
    ],
  },
  {
    id: "d8cb1eff-0574-506d-83ad-44739ae4f191",
    name: "Третья тренировка",
    description: "Самая третья тренировка с несколькими упражнениями",
    exercises: [
      "19ce0d56-731b-5557-9c3c-2f67f5516ced",
      "a5939ee1-5c8e-5019-aa8e-fd0a94e04168",
      "6af2442a-c132-52b7-a218-e21dbb1949c2",
      "3cd0c78f-bf00-5887-a034-9ef8be675cb5",
    ],
    restTime: 5,
    goals: [
      {
        exerciseId: "19ce0d56-731b-5557-9c3c-2f67f5516ced",
        goal: 100,
      },
      {
        exerciseId: "a5939ee1-5c8e-5019-aa8e-fd0a94e04168",
        goal: 10,
      },
      {
        exerciseId: "6af2442a-c132-52b7-a218-e21dbb1949c2",
        goal: "8kg",
      },
      {
        exerciseId: "3cd0c78f-bf00-5887-a034-9ef8be675cb5",
        goal: 100,
      },
    ],
  },
];

export const initialCurrentTraining = {
  id: getRandomId(10),
  name: "",
  description: "",
  exercises: [],
  goals: [],
  restTime: 0,
};


// exercises from other websites
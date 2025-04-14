import { Cloth } from '../types/Cloth';
import dog from '../images/dog.webp';
import coffee from '../images/coffee.webp';
import bag from '../images/bag.webp';
import black_shoe from '../images/black_shoe.webp';
import blue_hoodie from '../images/blue_hoodie.webp';
import brown_hair from '../images/brown_hair.webp';
import busi from '../images/busi.webp';
import green_shoe from '../images/green_shoe.webp';
import laptop from '../images/laptop.webp';
import orange_hair from '../images/orange_hair.webp';
import pink_hair from '../images/pink_hair.webp';
import ring from '../images/ring.webp';
import white_shoe from '../images/white_shoe.webp';
import yellow_hoodie from '../images/yellow_hoodie.webp';

export const clothes: Cloth[] = [
  {
    id: '0c2dedb1-5594-59a6-a824-c7e28191689b',
    splineName: 'Dog',
    name: 'Собака Пират',
    price: 100,
    image: dog,
  },
  {
    id: 'dc0e93bf-a3d2-58ba-ac97-0529bd43d09f',
    splineName: 'coffee_cup',
    name: 'Стакан кофе',
    price: 10,
    image: coffee,
  },
  {
    id: 'dc5cc128-7e38-568c-9b88-cd7ff69dc785',
    splineName: 'ring_right',
    name: 'Правая сережка',
    price: 20,
    image: ring,
  },
  {
    id: '23a5742b-3435-51ac-9f1b-d13bb8f38bbf',
    splineName: 'ring_left',
    name: 'Левая сережка',
    price: 20,
    image: ring,
  },
  {
    id: '5c6a1629-7a20-58e5-b570-0c6b9a508f20',
    splineName: 'pink_hair',
    name: 'Розовые волосы',
    price: 10,
    image: pink_hair,
  },
  {
    id: '50f1e668-d143-5dcf-9d93-9963f96aaf1d',
    splineName: 'black_right_shoe',
    name: 'Правый черный ботинок',
    price: 10,
    image: black_shoe,
  },
  {
    id: '631f65dd-a561-5680-9d36-f1162e52f215',
    splineName: 'black_left_shoe',
    name: 'Левый черный ботинок',
    price: 10,
    image: black_shoe,
  },
  {
    id: 'b7507373-1396-5aed-b6f6-aa3e3c553941',
    splineName: 'blue_hoodie',
    name: 'Голубое худи',
    price: 30,
    image: blue_hoodie,
  },
  {
    id: '3522cfb7-0247-55d1-a321-34568e0df8f6',
    splineName: 'bag',
    name: 'Сумка',
    price: 20,
    image: bag,
  },
  {
    id: 'df5be281-fc94-5852-b6b6-ad222c3b5bd8',
    splineName: 'orange_hair',
    name: 'Оранжевые волосы',
    price: 10,
    image: orange_hair,
  },
  {
    id: 'd29d16f4-73bd-5bec-924d-f3d67299be53',
    splineName: 'white_left_shoe',
    name: 'Белый левый кроссовок',
    price: 10,
    image: white_shoe,
  },
  {
    id: '51b1afa9-789e-5b89-81d2-74468f3b302e',
    splineName: 'white_right_shoe',
    name: 'Белый правый кроссовок',
    price: 10,
    image: white_shoe,
  },
  {
    id: '87416f5e-6a2e-519c-ad02-219634cb9ece',
    splineName: 'busi',
    name: 'Бусы',
    price: 30,
    image: busi,
  },
  {
    id: 'b770afb3-b907-53fe-9d30-4e0d4d020b6c',
    splineName: 'laptop',
    name: 'Ноутбук',
    price: 50,
    image: laptop,
  },
  {
    id: 'b784947b-e7a4-5843-8c8f-660ba6a47807',
    splineName: 'green_left_shoe',
    name: 'Зеленый левый ботинок',
    price: 10,
    image: green_shoe,
  },
  {
    id: 'a142c9d8-a18f-5293-9e9c-e8e2936b23b8',
    splineName: 'green_right_shoe',
    name: 'Зеленый правый ботинок',
    price: 10,
    image: green_shoe,
  },
  {
    id: '3180ba1c-e981-5662-aca8-70c42a421073',
    splineName: 'brown_hair',
    name: 'Коричневые волосы',
    price: 10,
    image: brown_hair,
  },
  {
    id: 'b25b897c-19ee-5eaf-ba2b-22d62d530307',
    splineName: 'yellow_hoodie',
    name: 'Желтое худи',
    price: 30,
    image: yellow_hoodie,
  },
]

export const defaultClothes = [
  "b7507373-1396-5aed-b6f6-aa3e3c553941",
  "50f1e668-d143-5dcf-9d93-9963f96aaf1d",
  "631f65dd-a561-5680-9d36-f1162e52f215",
  "3180ba1c-e981-5662-aca8-70c42a421073",
];

export const clothesByCategories = {
  hairs: {
    name: 'Волосы',
    items: [
      "3180ba1c-e981-5662-aca8-70c42a421073",
      "df5be281-fc94-5852-b6b6-ad222c3b5bd8",
      "5c6a1629-7a20-58e5-b570-0c6b9a508f20",
    ],
  },
  hoodies: {
    name: 'Худи',
    items: [
      "b7507373-1396-5aed-b6f6-aa3e3c553941",
      "b25b897c-19ee-5eaf-ba2b-22d62d530307",
    ],
  },
  leftBoots: {
    name: 'Левые ботинки',
    items: [
      "631f65dd-a561-5680-9d36-f1162e52f215",
      "b784947b-e7a4-5843-8c8f-660ba6a47807",
      "d29d16f4-73bd-5bec-924d-f3d67299be53",
    ],
  },
  rightBoots: {
    name: 'Правые ботинки',
    items:   [
      "50f1e668-d143-5dcf-9d93-9963f96aaf1d",
      "a142c9d8-a18f-5293-9e9c-e8e2936b23b8",
      "51b1afa9-789e-5b89-81d2-74468f3b302e",
    ],
  },
  accessories: {
    name: 'Аксессуары',
    items: [
      "0c2dedb1-5594-59a6-a824-c7e28191689b",
      "dc0e93bf-a3d2-58ba-ac97-0529bd43d09f",
      "dc5cc128-7e38-568c-9b88-cd7ff69dc785",
      "23a5742b-3435-51ac-9f1b-d13bb8f38bbf",
      "3522cfb7-0247-55d1-a321-34568e0df8f6",
      "87416f5e-6a2e-519c-ad02-219634cb9ece",
      "b770afb3-b907-53fe-9d30-4e0d4d020b6c",
    ]
  }
};
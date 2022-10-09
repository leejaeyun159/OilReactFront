const today = new Date();
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

const date = [
  {
    name: "오늘",
    value: today,
  },
  {
    name: "어제",
    value: yesterday,
  },
];

const weather = [
  {
    name: "맑음",
    value: "Sunny",
  },
  {
    name: "흐림",
    value: "Cloudy",
  },
  {
    name: "눈",
    value: "Snowy",
  },
  {
    name: "비",
    value: "Rainy",
  },
  {
    name: "우박",
    value: "Hail",
  },
];

export { date, weather };

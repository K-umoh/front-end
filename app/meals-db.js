export const dummyMeals = [
  {
    id: "1",
    title: "곤드레 비빔밥과 미나리 된장무침",
    image: require("../assets/images/dummy-img2.jpg"),
    tags: ["항산화", "해독", "혈압 안정"],
    isLiked: true,
    ingredients: [
      { name: "곤드레", isLocal: true },
      { name: "미나리", isLocal: true },
      { name: "된장", isLocal: false },
      { name: "현미", isLocal: true },
      { name: "혼합 야채", isLocal: false },
    ],
  },
  {
    id: "2",
    title: "두부 야채볶음과 강황밥",
    image: require("../assets/images/dummy-img2.jpg"),
    tags: ["항염", "면역력 강화", "소화 촉진"],
    isLiked: false,
    ingredients: [
      { name: "유기농 두부", isLocal: false },
      { name: "브로콜리", isLocal: false },
      { name: "파프리카", isLocal: false },
      { name: "강황", isLocal: true },
      { name: "생강", isLocal: false },
    ],
  },
];

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

const saying = {
  positive: [
    {
      Id: 0,
      Title: "추구할 수 있는 용기가 있다면 우리의 모든 꿈은 이뤄질 수 있다",
      Name: "월트 디즈니",
    },
    {
      Id: 1,
      Title: "나는 내가 더 노력할수록 운이 더 좋아진다는 걸 발견했다",
      Name: "토마스 제퍼슨",
    },
    {
      Id: 2,
      Title: "우리는 우리가 늘 생각하는 것이 된다 그것이 가장 묘한 비밀이다",
      Name: "얼 나이팅게일",
    },
    {
      Id: 3,
      Title:
        "나는 하루 중 98%는 내가 하는 일에 긍정적이다 그리고 나머지 2%는 어떻게 하면 매사에 긍정적이 될 수 있을까 궁리한다",
      Name: "보스턴 셀틱스 감독 릭 피티노",
    },
    {
      Id: 4,
      Title: "긍정적인 건 무엇이든 간에 부정적인 것보다 낫다",
      Name: "엘버트 허버드",
    },
    {
      Id: 5,
      Title:
        "나는 당신이 마음을 먹고 의지와 욕망을 가져 시간을 투자한다면 무슨 일이든 가능하다고 생각한다",
      Name: "로저 클레멘스",
    },
    {
      Id: 6,
      Title:
        "성공하는 사람은 말부터 다르다 그들의 말은 늘 확신에 차 있고, 긍정과 낙관으로 가득하다",
      Name: "김영식",
    },
    {
      Id: 7,
      Title: "성공하는 방법은 성공할 때까지 포기하지 않는 것이다",
      Name: "앤드루 카네기",
    },
    {
      Id: 8,
      Title: "할 수 있다고 생각하기 때문에 할 수 있는 것이다",
      Name: "베르길리우스",
    },
    {
      Id: 9,
      Title: "운은 용기를 내는 사람의 편이다",
      Name: "베르길리우스",
    },
  ],
  negative: [
    {
      Id: 0,
      Title: "열정을 잃지 않고 실패에서 실패로 걸어가는 것이 성공이다",
      Name: "윈스턴 처칠",
    },
    {
      Id: 1,
      Title:
        "나는 실패한 게 아니다 나는 잘 되지 않는 방법 1만 가지를 발견한 것이다",
      Name: "토마스 에디슨",
    },
    {
      Id: 2,
      Title:
        "남들이 당신에게 던진 벽돌들로 탄탄한 기반을 쌓을 수 있어야 성공한다",
      Name: "데이비드 브링클리",
    },
    {
      Id: 3,
      Title: "괴로운 시련처럼 보이는 것이 뜻밖의 좋은 일일 때가 많다",
      Name: "오스카 와일드",
    },
    {
      Id: 4,
      Title: "위대한 것으로 향하기 위해 좋은 것을 포기하는 걸 두려워하지 마라",
      Name: "존 록펠러",
    },
    {
      Id: 5,
      Title:
        "행복은 나비다 당신이 쫓아다니면 늘 잡을 수 없는 곳에 있지만, 조용히 앉아 있으면 당신에게 내려앉을지도 모른다",
      Name: "나다니엘 호손",
    },
    {
      Id: 6,
      Title: "성공으로 가는 길과 실패로 가는 길은 거의 똑같다",
      Name: "콜린 R. 데이비스",
    },
    {
      Id: 7,
      Title:
        "성공이란 당신 자신, 당신이 하는 일, 그 일을 하는 방식을 좋아하는 것이다",
      Name: "마야 앤젤루",
    },
    {
      Id: 8,
      Title:
        "실패에서부터 성공을 만들어 내라 좌절과 실패는 성공으로 가는 가장 확실한 디딤돌이다",
      Name: "데일 카네기",
    },
    {
      Id: 9,
      Title:
        "누구나 실패합니다 그러나 그때마다 배우는 것이 중요합니다 그러면 누구나 다시 일어날수 있습니다",
      Name: "닉부이치치",
    },
  ],
  neutral: [
    {
      Id: 0,
      Title:
        "'오늘'이란 너무 평범한 날인 동시에 과거와 미래를 잇는 가장 소중한 시간이다",
      Name: "괴테",
    },
    {
      Id: 1,
      Title: "오늘 할 수 있는 일에만 전력을 쏟으라",
      Name: "아이작 뉴턴",
    },
    {
      Id: 2,
      Title: "오늘 하루 이 시간은 당신의 것이다 하루를 착한 행위로 장식하라",
      Name: "프랭클린 D. 루스벨트",
    },
    {
      Id: 3,
      Title: "너는 쓸 일이 없다고 한다 그렇다면 쓸 일이 없는 것을 쓰라",
      Name: "프리니우스 2세",
    },
    {
      Id: 4,
      Title:
        "우리는 생명을 너무나도 중시했다 생명의 일기가 행복의 일기인 일은 드물다",
      Name: "S.스티븐즈",
    },
    {
      Id: 5,
      Title:
        "나는 여행을 할 때 반드시 나의 일기장을 가지고 간다 왜냐하면 기차에서 읽을 감각적인 것이 꼭 필요하기 때문이다",
      Name: "O.와일드",
    },
    {
      Id: 6,
      Title: "일기를 꾸준히 써라 그렇다면 언젠가는 일기가 너를 간직할 것이다",
      Name: "메이 웨스트",
    },
    {
      Id: 7,
      Title: "기록은 기억을 남긴다",
      Name: "발타사르 그라시안",
    },
    {
      Id: 8,
      Title: "과거를 기억하지 않는 사람은 그것을 반복하는 사람이다",
      Name: "조지 산타야나",
    },
    {
      Id: 9,
      Title: "하루에 3시간을 걸으면 7년 후에 지구를 한 바퀴 돌 수 있다",
      Name: "사무엘 존슨",
    },
  ],
};

export { saying, weather };

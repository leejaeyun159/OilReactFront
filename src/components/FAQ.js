import { Accordion } from "../MUI";
import styled from "./FAQ.module.css";

const DUMMY_FAQ = [
  {
    id: "F1",
    title: "Q. 이메일을 잃어버렸어요. 어떻게 찾아야할까요?",
    context:
      "⤷ 저희 OIL은 타사 이메일을 이용하는 사이트입니다. 찾으시려는 이메일의 해당하는 사이트 참고부탁드립니다.",
  },
  {
    id: "F2",
    title: "Q. 감정분석은 어떻게 하는건가요?",
    context:
      "⤷ 네이버 API인 CLOVA Sentiment를 사용하여 일기의 내용을 분석하고 neutral, positive, negative를 도출하여 가장 높은 감정을 사용자에게 제공해드리고 있습니다.",
  },
  {
    id: "F3",
    title: "Q. 무료인가요?",
    context:
      "⤷ 네 저희 서비스는 모두 무료입니다. 일기를 쓰는데 돈이 들어가면 안된다고 생각하고 개발하게되었습니다. 사용해주셔서 감사합니다.",
  },
  {
    id: "F4",
    title: "Q. 통계사이트는 어떤 용도인가요?",
    context:
      "⤷ 일정 기간을 기준으로 사용자가 작성한 일기를 토대로 가장 많이 나온 감정과 날씨를 분석합니다. 지난 달을 돌이켜보며 자신의 감정을 알고 이에 맞는 조언과 추천음악을 통하여 보다 나은 삶을 위해 제공되는 서비스입니다.",
  },
];

const FAQ = () => {
  const faqList = DUMMY_FAQ.map((element) => (
    <Accordion
      children={element.title}
      context={element.context}
      key={element.id}
    />
  ));

  return (
    <div>
        <div className={styled.TitleBox}>
            <h2>FAQ</h2>
            <p>더 궁금한 점이 있다면? Oil팀에 문의해주세요 noww_yun@gmail.com</p>
        </div>
        <div className={styled.FagBox}>
            <div className={styled.container}>{faqList}</div>
        </div>
    </div>
  );
};

export default FAQ;

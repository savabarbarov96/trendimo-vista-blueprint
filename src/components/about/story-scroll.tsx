"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Нашата Мисия и Визия",
    description:
      "В Trendimo се стремим да превърнем мечтите за недвижим имот в осезаема реалност. Нашата мисия е да предоставяме пълноценна и прозрачна услуга, базирана на професионализъм и доверие. Вярваме, че домът е много повече от квадратни метри – той е отражение на личността, идеите и плановете за бъдещето. С ясна визия за развитие на пазара, ние търсим иновативни решения, които да улеснят вашето решение и инвестиция.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2896&q=80" 
          className="h-full w-full object-cover"
          alt="Мисия и визия" 
        />
      </div>
    ),
  },
  {
    title: "Комплексни Услуги за Купувачи и Продавачи",
    description:
      "Trendimo предлага цялостно обслужване през целия процес на сделката – от първоначалния анализ на пазара до успешно финализиране и съдействие с документацията. За купувачите подбираме най-подходящите оферти според вашите критерии и бюджет, а за продавачите разработваме маркетингова стратегия, която гарантира максимална видимост и бърз резултат. Нашите експерти работят с доказани партньори – адвокати, оценители и ипотечни консултанти, за да ви спестят време и рискове.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80"
          className="h-full w-full object-cover"
          alt="Комплексни услуги"
        />
      </div>
    ),
  },
  {
    title: "Екип от Професионалисти",
    description:
      "Зад всеки успешен проект стои силен и опитен екип. В Trendimo събираме специалисти с богат опит в недвижимите имоти, маркетинга и консултирането на клиенти. Всеки наш агент преминава през интензивно вътрешно обучение и използва модерни софтуерни решения за анализ на пазарни данни. По този начин ние гарантираме, че ще получите адекватна информация, базирана на реални трендове и статистики, и ще вземете най-доброто решение.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover"
          alt="Екип от професионалисти"
        />
      </div>
    ),
  },
  {
    title: "Ангажимент към Клиента",
    description:
      "За нас клиентът е в центъра на всичко. Стремим се не само да откликнем на вашите нужди, но и да надминем очакванията ви чрез лично отношение и следпродажбено обслужване. Всяка препоръка, всяка оценка и всяка обратна връзка са ценни, защото ни помагат да усъвършенстваме процесите си. Вашият успех и спокойствие са наш приоритет.",
    content: (
      <div className="h-full w-full flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="h-full w-full object-cover"
          alt="Ангажимент към клиента"
        />
      </div>
    ),
  },
];

export function StoryScroll() {
  return (
    <div>
      <StickyScroll content={content} />
    </div>
  );
} 
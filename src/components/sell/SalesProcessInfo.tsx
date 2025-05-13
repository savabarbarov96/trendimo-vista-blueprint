
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, Pencil, DollarSign, Info } from "lucide-react";

const SalesProcessInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="mr-2 h-5 w-5" />
            Защо да продадете с Trendimo?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Trendimo е лидер на пазара на недвижими имоти в България с над 15 години опит. 
            Ние предлагаме персонализиран подход към всеки клиент и гарантираме:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Експертна оценка на пазарната стойност на вашия имот</li>
            <li>Професионални фотографии и 3D виртуални обиколки</li>
            <li>Мощна онлайн и офлайн рекламна стратегия</li>
            <li>Достъп до базата ни от предварително одобрени купувачи</li>
            <li>Юридическо съдействие по време на цялата сделка</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Процесът на продажба
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-medium">Безплатна консултация</h4>
                <p className="text-sm text-muted-foreground">
                  Наш агент ще ви посети и ще направи оценка на имота ви без ангажимент
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-medium">Маркетинг стратегия</h4>
                <p className="text-sm text-muted-foreground">
                  Създаваме персонализирана стратегия за маркетинг на вашия имот
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-medium">Огледи и преговори</h4>
                <p className="text-sm text-muted-foreground">
                  Организираме огледи само с качествени купувачи и водим преговорите
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h4 className="font-medium">Сделка и документи</h4>
                <p className="text-sm text-muted-foreground">
                  Помагаме с всички правни документи до успешното приключване на сделката
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Комисиона
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Нашата комисиона е конкурентна на пазара и се определя индивидуално спрямо типа и стойността на имота.
            Стандартната ни комисиона е 2% от продажната цена, но се заплаща само при успешна продажба.
          </p>
          <p className="mt-2 font-medium">
            Не дължите нищо, ако не продадем вашия имот!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Pencil className="mr-2 h-5 w-5" />
            Контакти
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>ул. Витоша 16, София 1000</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="i-lucide-phone h-4 w-4" />
            <span>+359 2 954 3344</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="i-lucide-mail h-4 w-4" />
            <span>sales@trendimo.bg</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesProcessInfo;

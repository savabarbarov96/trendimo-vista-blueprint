
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Мария Георгиева",
    position: "Имотен консултант",
    avatar: "/placeholder.svg",
    quote: "Работата в Trendimo е изключително удовлетворяваща. Компанията предлага страхотна среда за развитие и възможности за израстване в кариерата."
  },
  {
    name: "Иван Петров",
    position: "Маркетинг специалист",
    avatar: "/placeholder.svg",
    quote: "Най-ценното нещо в Trendimo е колективът - работя с колеги, които са истински професионалисти и винаги готови да помогнат."
  },
  {
    name: "Елена Димитрова",
    position: "Административен асистент",
    avatar: "/placeholder.svg",
    quote: "Вече 3 години съм част от Trendimo и всеки ден ми носи нови предизвикателства и възможности за учене."
  },
  {
    name: "Николай Иванов",
    position: "Имотен консултант",
    avatar: "/placeholder.svg",
    quote: "Компанията наистина инвестира в обучението на своите служители. Благодарение на Trendimo успях да развия умения, които ми помагат всеки ден."
  },
  {
    name: "Симона Тодорова",
    position: "Юрисконсулт",
    avatar: "/placeholder.svg",
    quote: "Динамичната работна среда и възможността да работя с различни клиенти прави всеки ден в Trendimo уникален и интересен."
  }
];

const EmployeeTestimonials = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <Quote className="h-8 w-8 text-primary mb-4 self-start" />
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 rounded-full overflow-hidden bg-muted mr-4">
                    <AvatarImage 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="h-full w-full object-cover" 
                    />
                    <AvatarFallback className="bg-primary text-white">
                      {testimonial.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default EmployeeTestimonials;

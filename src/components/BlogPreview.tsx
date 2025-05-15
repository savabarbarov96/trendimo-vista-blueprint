
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import BlogCard from './BlogCard';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "5 съвета за успешно инвестиране в недвижими имоти в България",
    excerpt: "Научете как да максимизирате възвръщаемостта на вашите инвестиции в недвижими имоти с тези проверени съвети от нашите експерти.",
    imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "12 май 2023",
    category: "Инвестиции"
  },
  {
    id: 2,
    title: "Тенденции на пазара на недвижими имоти през 2023 година",
    excerpt: "Анализ на настоящите тенденции на пазара на недвижими имоти в България и прогнози за следващата година от нашия експертен екип.",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "23 април 2023",
    category: "Пазарни анализи"
  },
  {
    id: 3,
    title: "Как да подготвите дома си за продажба и да увеличите неговата стойност",
    excerpt: "Практически съвети за подготовка на вашия имот за продажба, които могат да повишат цената и да ускорят процеса на продажба.",
    imageUrl: "https://images.unsplash.com/photo-1560185008-cde6dc93dd71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    date: "5 март 2023",
    category: "Продажби"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">Последни статии</h2>
            <p className="text-lg text-gray-300">Полезни съвети и новини от света на недвижимите имоти</p>
          </div>
          <Link to="/blog">
            <Button variant="outline" className="mt-4 md:mt-0 border-primary/30 text-white hover:bg-primary/10">
              Към блога
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;

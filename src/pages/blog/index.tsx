
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { Button } from '@/components/ui/button';

const categories = [
  { value: '', label: 'Всички' },
  { value: 'Market Analysis', label: 'Пазарен анализ' },
  { value: 'Tips & News', label: 'Съвети и новини' },
  { value: 'Client Stories', label: 'Истории на клиенти' }
];

const BlogIndexPage = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const { data: posts, isLoading, error } = useBlogPosts(activeCategory || undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Блог</h1>
          <p className="text-lg text-neutral-dark max-w-2xl mx-auto">
            Актуални новини, полезни съвети и пазарни анализи от нашия експертен екип
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "default" : "outline"}
                onClick={() => setActiveCategory(category.value)}
                className="mb-2"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-16">Зареждане...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            Възникна грешка при зареждането на постове.
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-neutral">В момента няма публикации в тази категория.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndexPage;

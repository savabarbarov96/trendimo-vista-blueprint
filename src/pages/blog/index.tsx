import React from 'react';
import { Helmet } from 'react-helmet';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TextShimmer } from '@/components/ui/text-shimmer';

const BlogIndexPage = () => {
  const { data: posts, isLoading, error } = useBlogPosts();
  const [tabValue, setTabValue] = React.useState("all");

  const categories = [
    { value: "all", label: "Всички" },
    { value: "market-trends", label: "Пазарни тенденции" },
    { value: "investment", label: "Инвестиции" },
    { value: "guides", label: "Наръчници" },
  ];

  const filteredPosts = tabValue === 'all' ? 
    posts : 
    posts?.filter(post => post.category === tabValue);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Блог | Trendimo</title>
        <meta name="description" content="Статии, новини и съвети за недвижими имоти от експертите на Trendimo." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12 bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <TextShimmer 
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 [--base-color:theme(colors.red.900)] [--base-gradient-color:theme(colors.red.500)]"
            duration={3}
          >
            Нашият блог
          </TextShimmer>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Споделяме експертни съвети, пазарни анализи и статии от света на недвижимите имоти.
          </p>
        </div>
        
        <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <Tabs defaultValue="all" onValueChange={setTabValue} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-gray-50">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => (
              <TabsContent 
                key={category.value} 
                value={category.value}
                className="mt-0"
              />
            ))}
          </Tabs>
        </div>
        
        {isLoading ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-muted-foreground">Зареждане на статии...</p>
          </div>
        ) : error ? (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-destructive">Възникна грешка при зареждането на статиите.</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Опитайте отново
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        )}
        
        {filteredPosts && filteredPosts.length === 0 && (
          <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-200">
            <p className="text-muted-foreground">Няма намерени статии в тази категория.</p>
          </div>
        )}
        
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogIndexPage;

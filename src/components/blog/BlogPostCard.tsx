import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/formatDate';
import { BlogPost } from '@/hooks/use-blog-posts';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="relative h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative w-full h-52">
          <img 
            src={post.image_url || '/placeholder.svg'} 
            alt={post.title}
            className="w-full h-full object-cover rounded-t-lg"
          />
          <div className="absolute bottom-0 right-0 bg-primary text-white px-3 py-1 rounded-tl-lg">
            {post.category}
          </div>
        </div>
      </Link>
      <CardContent className="flex-grow flex flex-col p-5">
        <div className="flex items-center text-sm text-neutral mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(post.published_at)}</span>
        </div>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-neutral-dark mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <Link 
          to={`/blog/${post.slug}`} 
          className="text-primary font-medium hover:underline mt-auto inline-block"
        >
          Прочети повече
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogPostCard;

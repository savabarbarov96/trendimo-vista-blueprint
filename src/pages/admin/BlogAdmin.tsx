
import React from 'react';
import { Helmet } from 'react-helmet';
import { FileText } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const BlogAdmin: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Управление на блог | Trendimo Админ</title>
      </Helmet>

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Управление на блог</h1>
        <p className="text-muted-foreground">Създаване и редактиране на блог публикации</p>
      </div>

      <AdminPlaceholder 
        title="Управлението на блог постове е в разработка"
        description="Тук ще можете да създавате, редактирате и управлявате блог публикации. Тази функционалност скоро ще бъде достъпна."
        icon={FileText}
      />
    </div>
  );
};

export default BlogAdmin;

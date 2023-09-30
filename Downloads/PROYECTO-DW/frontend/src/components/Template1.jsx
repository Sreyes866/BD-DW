import React from 'react';

const Template1 = ({ article, categories, subcategories }) => {
  const selectedCategory = categories.find(cat => cat.id === article.category_id)?.name || 'No especificada';
  const selectedSubcategory = subcategories.find(sub => sub.id === article.sub_category_id)?.name || 'No especificada';

  return (
    <div style={{ border: '1px solid #ccc', margin: '20px', padding: '15px' }}>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <div>
        Categoría: {selectedCategory}
      </div>
      <div>
        Subcategoría: {selectedSubcategory}
      </div>
    </div>
  );
};

export default Template1;



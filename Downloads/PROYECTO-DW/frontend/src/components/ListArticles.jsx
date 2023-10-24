import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Template1 from './Template1';
import Template3 from './Template3';  
import Template2 from './Template2';  


const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [editingArticle, setEditingArticle] = useState(null);

  const fetchData = () => {
    axios.get('http://localhost/Articles.php')
      .then(response => {
        console.log("Server Response:", response.data);
        if (Array.isArray(response.data)) {
          const updatedArticles = response.data.map(article => {
            if (article.image) {
              const blob = new Blob([article.image], { type: 'image/jpeg' });
              article.imageURL = URL.createObjectURL(blob);
            }
            return article;
          });
          setArticles(updatedArticles);
          setFilteredArticles(updatedArticles);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch(error => console.error('Error fetching articles:', error));

    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));

      axios.get('http://localhost/ServicioJSON.php')
      .then(response => {
          console.log(response.data);  
      })
      .catch(error => {
          console.error('Hubo un error al obtener los datos:', error);
      });
  

  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const relevantSubcategories = subcategories.filter(sub => sub.category_id === selectedCategory);
      setFilteredSubcategories(relevantSubcategories);
    } else {
      setFilteredSubcategories([]);
    }
  }, [selectedCategory, subcategories]);

  const handleDelete = (id) => {
    axios.post('http://localhost/deleteArticle.php', { id: id })
      .then(response => {
        fetchData();
      })
      .catch(error => console.error('Error deleting article:', error));
  };

  const handleEdit = (article) => {
    setEditingArticle(article);
  };

  const handleSave = () => {
    axios.post('http://localhost/updateArticle.php', editingArticle)
      .then(response => {
        setEditingArticle(null);
        fetchData();
      })
      .catch(error => console.error('Error updating article:', error));
  };
  const [selectedTemplate, setSelectedTemplate] = useState('Template1');

  const handleChangeTemplate = (e) => {
    setSelectedTemplate(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingArticle({ ...editingArticle, [name]: value });
  };

  const applyFilter = () => {
    let newFilteredArticles = [...articles];

    if (selectedCategory) {
      newFilteredArticles = newFilteredArticles.filter(article => article.category_id === selectedCategory);
    }

    if (selectedSubcategory) {
      newFilteredArticles = newFilteredArticles.filter(article => article.sub_category_id === selectedSubcategory);
    }

    if (selectedAuthor) {
      newFilteredArticles = newFilteredArticles.filter(article => article.author_id === selectedAuthor);
    }

    if (sortOrder === 'asc') {
      newFilteredArticles.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      newFilteredArticles.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredArticles(newFilteredArticles);
  };

  return (
    <div className="container">
      <div>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value="">Select Author</option>
          {Array.from(new Set(articles.map(article => article.author_id))).map((author, index) => (
            <option key={index} value={author}>
              {author}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Select Sort Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <div className="container">
      
      </div>
      {filteredArticles.map((article, index) => (
        <div key={index} style={{border: '1px solid #ccc', margin: '20px', padding: '15px'}}>
          
          {editingArticle && editingArticle.id === article.id ? (
            <>
              <ArticleRenderer 
                article={editingArticle} 
                isEditing={true} 
                handleChange={handleInputChange}
                categories={categories}
                subcategories={subcategories}
              />
              <button onClick={handleSave}>Guardar</button>
            </>
          ) : (
            <>
              <ArticleRenderer 
                article={article}
                categories={categories}
                subcategories={subcategories}
              />
              <button onClick={() => handleDelete(article.id)}>Eliminar</button>
              <button onClick={() => handleEdit(article)}>Editar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
   

};

const ArticleRenderer = ({ article, categories, subcategories, isEditing, handleChange }) => {
  switch(article.template_type) {
    case 'Template1':
      return <Template1 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    case 'Template2':
      return <Template2 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    case 'Template3':
      return <Template3 article={article} isEditing={isEditing} handleChange={handleChange} categories={categories} subcategories={subcategories} />;
    default:
      return <p>Plantilla no soportada</p>;
  }
};

export default ListArticles;












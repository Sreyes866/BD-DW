import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Template1 from './Template1';  
import Template2 from './Template2';
import Template3 from './Template3';
import ModerationEmail from './ModerationEmail';

const ModerateArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const fetchData = () => {
    axios.get('http://localhost/Articles.php')
      .then(response => {
        if (Array.isArray(response.data)) {
          setArticles(response.data.map(article => ({
            ...article,
            status: article.approval_status 
          })));
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });

    axios.get('http://localhost/Categories.php')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost/Subcategories.php')
      .then(response => setSubcategories(response.data))
      .catch(error => console.error('Error fetching subcategories:', error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = (id) => {
    axios.post('http://localhost/updateApprovalStatus.php', { id, approval_status: 'Approved', publish_status: 'Published' })
      .then(response => {
        // Filtrar artículos para excluir el aprobado
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
      })
      .catch(error => {
        console.error('Error updating approval status:', error);
      });
  };
  
  const { sendRejectionEmail } = ModerationEmail();

  const handleReject = (id) => {
    axios.post('http://localhost/updateApprovalStatus.php', { 
      id, 
      approval_status: 'Pending', 
      publish_status: 'Draft' 
    })
      .then(response => {
        const rejectedArticle = articles.find(article => article.id === id);
        if (rejectedArticle) {
          sendRejectionEmail(rejectedArticle.id, rejectedArticle.author_email); // Asumiendo que cada artículo tiene un campo 'author_email'
        }
        const updatedArticles = articles.map(article => 
          article.id === id ? { ...article, approval_status: 'Pending', publish_status: 'Draft' } : article
        );
        setArticles(updatedArticles);
      })
      .catch(error => {
        console.error('Error updating article status:', error);
      });
  };
  
  
  
  

  const ArticleRenderer = ({ article, categories, subcategories }) => {
    switch(article.template_type) {
      case 'Template1':
        return <Template1 article={article} categories={categories} subcategories={subcategories} />;
      case 'Template2':
        return <Template2 article={article} categories={categories} subcategories={subcategories} />;
      case 'Template3':
        return <Template3 article={article} categories={categories} subcategories={subcategories} />;
      default:
        return <p>Plantilla no soportada</p>;
    }
  };

  return (
    <div>
      <h1>Moderate Articles</h1>
      <ul>
        {articles
          .filter(article => article.status === 'Pending' && article.publish_status !== 'Draft')
          .map((article) => (
          <li key={article.id}>
            <ArticleRenderer article={article} categories={categories} subcategories={subcategories} />
            <button onClick={() => handleApprove(article.id)}>Approve</button>
            <button onClick={() => handleReject(article.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModerateArticles;






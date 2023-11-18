import React, { useState } from 'react';

const CategoryArticleViewer = ({ categories }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isRecent, setIsRecent] = useState('1');
    const [article, setArticle] = useState(null);

    const fetchArticle = async () => {
        try {
            const response = await fetch('http://localhost/ViewGetArticleByCategory.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryName: selectedCategory, recent: isRecent }),
            });

            const data = await response.json();
            setArticle(data);

        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    // Función para manejar el redireccionamiento
    const goToArticle = () => {
        if (article && article.id) {
            window.location.href = `http://localhost:3000/article/${article.id}`;
        }
    };

    return (
        <div>
            <label>Categoría:</label>
            <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Selecciona una categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label>Artículo:</label>
            <select onChange={(e) => setIsRecent(e.target.value)}>
                <option value="1">Más Reciente</option>
                <option value="0">Más Antiguo</option>
            </select>

            <button onClick={fetchArticle}>Mostrar Artículo</button>

            {article && article.title && (
                <div>
                    <h2 style={{ cursor: 'pointer' }} onClick={goToArticle}>{article.title}</h2>
                    <p>{article.content}</p>
                </div>
            )}
        </div>
    );
};

export default CategoryArticleViewer;
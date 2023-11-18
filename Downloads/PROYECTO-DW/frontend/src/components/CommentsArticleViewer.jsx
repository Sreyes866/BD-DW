import React, { useState, useEffect } from 'react';

const CommentCounter = ({ articleId }) => {
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        const fetchTotalComments = async () => {
            try {
                const response = await fetch('http://localhost/ViewGetCommentsByArticle.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ article_id: articleId }),
                });

                const total = await response.json();
                setTotalComments(total);
            } catch (error) {
                console.error('Error fetching total comments:', error);
            }
        };

        if (articleId) {
            console.log("Buscando comentarios para el artículo ID:", articleId);
            fetchTotalComments();
        }
    }, [articleId]);

    return (
        <div>
            <p>Total de comentarios: {totalComments}</p>
        </div>
    );
};

export default CommentCounter;

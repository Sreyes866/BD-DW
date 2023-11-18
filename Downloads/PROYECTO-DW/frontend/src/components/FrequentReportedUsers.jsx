import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FrequentReportedUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost/subquery.php');
                setUsers(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (users.length === 0) {
        return <p>No se encontraron usuarios con comentarios frecuentemente reportados.</p>;
    }

    return (
        <div>
            <h2>Usuarios con Comentarios Frecuentemente Reportados</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>Nombre:</strong> {user.name} - <strong>Comentarios Reportados:</strong> {user.ReportedCommentsCount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FrequentReportedUsers;

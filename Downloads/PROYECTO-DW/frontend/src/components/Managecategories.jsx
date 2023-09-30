import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost/Categories.php');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const createCategory = async () => {
    try {
      const response = await axios.post('http://localhost/crud_categories.php', {
        action: 'create_category',
        name: newCategory
      });
      setMessage(response.data.message);
      setNewCategory('');  // Clear the field
      fetchCategories();  // Update the category list
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('Error creating category');
    }
  };

  const updateCategory = async () => {
    try {
      const response = await axios.post('http://localhost/crud_categories.php', {
        action: 'update_category',
        id: selectedCategory,
        newName: newCategoryName
      });

      setMessage(response.data.message);
      setNewCategoryName('');  // Clear the field
      fetchCategories();  // Update the category list
    } catch (error) {
      console.error('Error updating category:', error);
      setMessage('Error updating category');
    }
  };

  return (
    <div className="container">
      <h1>Manage Categories</h1>
      <p>{message}</p>
      
      <div>
        <h2>Create New Category</h2>
        <input 
          type="text" 
          placeholder="New Category" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={createCategory}>Create</button>
      </div>

      <div>
        <h2>Update Category</h2>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="New Name" 
          value={newCategoryName} 
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        
        {selectedCategory && <button onClick={updateCategory}>Update</button>}
      </div>

    </div>
  );
};

export default ManageCategories;



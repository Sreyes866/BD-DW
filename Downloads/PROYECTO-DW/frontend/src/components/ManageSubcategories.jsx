import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSubcategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost/Categories.php');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get('http://localhost/Subcategories.php');
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const createSubcategory = async () => {
    try {
      const response = await axios.post('http://localhost/crud_subcategories.php', {
        action: 'create_subcategory',
        name: newSubcategory,
        category_id: selectedCategory
      });
      setMessage(response.data.message);
      setNewSubcategory('');  // Clear the field
      fetchSubcategories();  // Update the subcategory list
    } catch (error) {
      console.error('Error creating subcategory:', error);
      setMessage('Error creating subcategory');
    }
  };

  const updateSubcategory = async () => {
    try {
      const response = await axios.post('http://localhost/crud_subcategories.php', {
        action: 'update_subcategory',
        id: selectedSubcategory,
        newName: newSubcategoryName,
        category_id: selectedCategory
      });
      setMessage(response.data.message);
      setNewSubcategoryName('');  // Clear the field
      fetchSubcategories();  // Update the subcategory list
    } catch (error) {
      console.error('Error updating subcategory:', error);
      setMessage('Error updating subcategory');
    }
  };

  return (
    <div className="container">
      <h1>Manage Subcategories</h1>
      <p>{message}</p>
      
      <div>
        <h2>Create New Subcategory</h2>
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
          placeholder="New Subcategory" 
          value={newSubcategory} 
          onChange={(e) => setNewSubcategory(e.target.value)}
        />
        <button onClick={createSubcategory}>Create</button>
      </div>

      <div>
        <h2>Update Subcategory</h2>
        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">Select Subcategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>

        <input 
          type="text" 
          placeholder="New Name" 
          value={newSubcategoryName} 
          onChange={(e) => setNewSubcategoryName(e.target.value)}
        />
        
        {selectedSubcategory && <button onClick={updateSubcategory}>Update</button>}
      </div>

    </div>
  );
};

export default ManageSubcategories;

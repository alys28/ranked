import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  link: string;
  photoUrl: string;
  category: string; // Add category field
}

const products: Product[] = [
  { id: 1, name: 'Product 1', description: 'Description for Product 1', link: 'https://example.com/product1', photoUrl: 'https://via.placeholder.com/150', category: 'Category 1' },
  { id: 2, name: 'Product 2', description: 'Description for Product 2', link: 'https://example.com/product2', photoUrl: 'https://via.placeholder.com/150', category: 'Category 2' },
  { id: 3, name: 'Product 3', description: 'Description for Product 3', link: 'https://example.com/product3', photoUrl: 'https://via.placeholder.com/150', category: 'Category 1' },
  { id: 4, name: 'Product 4', description: 'Description for Product 4', link: 'https://example.com/product4', photoUrl: 'https://via.placeholder.com/150', category: 'Category 3' },
  { id: 5, name: 'Product 5', description: 'Description for Product 5', link: 'https://example.com/product5', photoUrl: 'https://via.placeholder.com/150', category: 'Category 2' },
  { id: 6, name: 'Product 6', description: 'Description for Product 6', link: 'https://example.com/product6', photoUrl: 'https://via.placeholder.com/150', category: 'Category 3' },
  { id: 7, name: 'Product 7', description: 'Description for Product 7', link: 'https://example.com/product7', photoUrl: 'https://via.placeholder.com/150', category: 'Category 1' },
  { id: 8, name: 'Product 8', description: 'Description for Product 8', link: 'https://example.com/product8', photoUrl: 'https://via.placeholder.com/150', category: 'Category 2' },
  // Add more products as needed
];

const categories = Array.from(new Set(products.map(product => product.category)));

const SearchAndProducts: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    return (
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  });

  const handleClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={styles.input}
        />
        <button style={styles.button}>Search</button>
      </div>
      <div style={styles.filterContainer}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div style={styles.productListContainer}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={styles.productCard}
            onClick={() => handleClick(product.link)}
          >
            <img
              src={product.photoUrl}
              alt={product.name}
              style={styles.productImage}
            />
            <h3 style={styles.productName}>{product.name}</h3>
            <p style={styles.productDescription}>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    padding: '0 16px',
    boxSizing: 'border-box',
    overflow: 'auto',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    marginTop: '3em',
  },
  input: {
    border: 'none',
    padding: '12px 16px',
    fontSize: '16px',
    flex: '1',
    outline: 'none',
    borderRadius: '24px 0 0 24px',
  },
  button: {
    backgroundColor: '#007bff',
    border: 'none',
    color: '#ffffff',
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '0 24px 24px 0',
    transition: 'background-color 0.3s ease',
  },
  filterContainer: {
    marginTop: '1em',
  },
  select: {
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
  productListContainer: {
    marginTop: '3em',
    maxWidth: '800px',
    width: '100%',
    maxHeight: 'calc(100vh - 325px)', // Adjust height as needed
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    overflowY: 'auto', // Enable vertical scrolling
    paddingBottom: '3em',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: 'calc(33.333% - 16px)',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '18px',
    margin: '0 0 8px 0',
  },
  productDescription: {
    margin: '0',
    color: '#555',
    textAlign: 'center',
  },
};

export default SearchAndProducts;

import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the Express.js server using native fetch
    fetch('http://localhost:5000/product')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Sort products by descending popularity
  const sortedProducts = [...products].sort((a, b) => b.Popularity - a.Popularity);

  return (
    <div className="App">
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map(product => (
            <tr key={product._id}>
              <td>{product.Title}</td>
              <td>${product.Price.toFixed(2)}</td>
              <td>{product.Popularity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for redirection

import '../App.css';

function Homepage() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Hook for navigating

  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage after login

  useEffect(() => {
    // Fetch books data from Firebase
    axios
      .get('https://libarayms-default-rtdb.firebaseio.com/books.json')
      .then((response) => {
        const bookData = Object.entries(response.data);
        setBooks(bookData); // Store the books in state
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter(([key, book]) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle book image click
  const handleBookClick = () => {
    if (!userId) {
      alert('Please log in first!');
      navigate('/userlogin'); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-content">
          <h2>
            Welcome to the <span>Library</span>
          </h2>
          <p>Your gateway to endless knowledge and adventures.</p>
          <button className="btn-primary">Explore Now</button>
        </div>
        <div className="hero-image">
          <img src="hero-image.png" alt="Library Illustration" />
        </div>
      </section>

      {/* Search Bar Section */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Title or Author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Book Catalog */}
      <section className="catalog">
        <h2>Latest Our Collection</h2>
        <div className="book-grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(([key, book]) => (
              <div key={key} className="book-card">
                <Link to={`/book/${key}`} state={{ bookId: key }} onClick={handleBookClick}>
                  <img src={`/${book.imageLink}`} alt={book.title} />
                </Link>
                <div>
                  <h3>{book.title}</h3>
                  <p>Author: {book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No books found matching your search criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Homepage;

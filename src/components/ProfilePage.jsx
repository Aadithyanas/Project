import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      
      axios
        .get(`https://libarayms-default-rtdb.firebaseio.com/details.json`)
        .then((response) => {
          const rawData = response.data || {};
          const userBooks = [];

          Object.entries(rawData).forEach(([detailId, detailData]) => {
            const books = Array.isArray(detailData.bookd)
              ? detailData.bookd
              : Object.values(detailData.bookd || {});
            books.forEach((book) => {
              if (book.userId === parsedUser.userId) {
                userBooks.push({
                  title: book.title,
                  author: book.author,
                  borrowDate: book.borrowDate,
                });
              }
            });
          });

          setBorrowedBooks(userBooks); 
        })
        .catch((error) => console.error('Error fetching user borrowed books:', error));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}</h2>
          <img
            src={user.profilePic || 'https://via.placeholder.com/150'} // Default profile picture
            alt="Profile"
          />
          <h3>Borrowed Books:</h3>
          {borrowedBooks.length > 0 ? (
            <ul>
              {borrowedBooks.map((book, index) => (
                <li key={index}>
                  <strong>{book.title}</strong> by {book.author} <br />
                  Borrowed on: {new Date(book.borrowDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No borrowed books found.</p>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;

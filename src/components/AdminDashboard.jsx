import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    axios
      .get('https://libarayms-default-rtdb.firebaseio.com/details.json')
      .then((response) => {
        console.log('Raw response data:', response.data); // Debugging
        const rawData = response.data || {};
        const formattedBooks = [];

        Object.entries(rawData).forEach(([detailId, detailData]) => {
          const books = Array.isArray(detailData.bookd)
            ? detailData.bookd
            : Object.values(detailData.bookd || {});
          books.forEach((book) => {
            console.log('Book data:', book); 
            if (book.userId && book.userId !== "undefined") {
              formattedBooks.push({
                id: detailId,
                bookId: detailData.bookId,
                author: book.author,
                title: book.title,
                borrowDate: book.borrowDate,
                userId: book.userId,
              });
            }
          });
        });

        console.log('Formatted books:', formattedBooks); // Debugging
        setBorrowedBooks(formattedBooks);
      })
      .catch((error) => console.error('Error fetching borrowed books:', error));
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section className="section">
        <h2>Borrowed Book Details</h2>
        <table className="user-book-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Book ID</th>
              <th>Book Title</th>
              <th>Book Author</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks && borrowedBooks.length > 0 ? (
              borrowedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.userId}</td>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{new Date(book.borrowDate).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;

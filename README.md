# Library Management System  

## Context  
This system is designed to manage the day-to-day operations of a library. It helps librarians track book inventory, manage user accounts, and facilitate the borrowing and returning of books.  

## Project Goal  
Create a web application that allows users to search for books, manage their accounts, and track borrowed books, while enabling librarians to manage inventory and user accounts effectively.

Folders
    public/: Static assets like the index.html file.
    src/: Contains all application source code and components.
    assets/: Images and other static assets.
    components/: React components for different sections of the application.
    AdminDashboard.jsx: Admin interface to manage users and books.
    BookDetails.jsx: Displays detailed information about a specific book.
    Footer.jsx: Footer component for the application.
    Homepage.jsx: Main landing page with an overview of books.
    LoginPage.jsx: User login functionality.
    Navbar.jsx: Navigation bar that remains fixed across pages.
    ProfilePage.jsx: Displays user profile details.
    userLogin.jsx: User login component.
    userSignup.jsx: User registration component.
    AdminSignup.jsx: Admin registration component.
    ThemeContext.jsx: Context API implementation for managing light and dark themes.
    context/: Centralized context for managing global state (e.g., themes).
    App.js: Root component managing routes and application logic.
    Api.js: Handles API requests to Firebase.
Files
  index.css: Global styles for the project.
  App.css: Component-specific styling for the main app.
  .gitignore: Specifies files and folders to ignore in version control.
  book.json: Configuration or data file for book-related data.
Key Features
  User Features
    Sign Up and Login:
  Users can register or log in.
    Login status is managed via local storage and state management.
  Browse Books:
    Users can explore books displayed on the homepage.
  Borrow Books:
    Borrow book functionality, which updates the Firebase database with borrowing details.
  View Profile:
    Users can view their profile and the books they have borrowed.
Admin Features
     Admin Dashboard:
        Display details of all users and books in the library.
        Add new books to the library.
        Track borrowed and returned books dynamically.
    Dynamic Tables:
        View user details, including books they have borrowed.
        See which books are available and which are currently borrowed.
    Book Management:
        Add new books to the library using a form in the admin dashboard.
Installation and Setup
    1. Clone the Repository
    2. Install Dependencies
    Make sure you have Node.js and npm installed.
    npm install
    3. Start the Development Server
    npm start
    This will start the application on http://localhost:3000.
    4. Firebase Configuration
        Set up a Firebase project and enable the Realtime Database.
        Add your Firebase configuration to the application (typically in a file like firebaseConfig.js).
Usage
  1. User Workflow
      Visit the homepage to browse books.
      Log in to borrow books.
      Check profile for borrowed book details.
  2. Admin Workflow
      Navigate to the admin dashboard.
      View user and book details.
      Add new books using the provided form.
      Monitor borrowing and returning activities.
     
Dependencies

Frontend
    React.js: For building the user interface.
    React Router: For handling client-side routing.
    Axios: For making API requests.
    Context API: For global state management.
Backend
  Firebase Realtime Database: For storing user and book data.
  File Highlights
Navbar.jsx
  A fixed navigation bar that provides links to different parts of the application.

AdminDashboard.jsx
  Handles admin operations such as adding books, viewing user details, and managing borrowing data. Displays tables dynamically.

Homepage.jsx
  The main landing page displaying books fetched from Firebase.

ThemeContext.jsx
  Manages dark mode and light mode using the Context API.

Future Enhancements
  Add search and filter functionality for books.
  Implement return book functionality.
  Provide notifications for overdue books.
  Enhance mobile responsiveness.
Contributors
  Anjali
  Ankit
  Maseera
  Aadithyan.A.S
Feel free to modify and extend this project.

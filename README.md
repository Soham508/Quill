# Quill

Quill is a social media application built with a React frontend and a Node.js/Express backend. It allows users to create posts, follow other users, and interact with content in real-time.

## Features
- User authentication and profile management
- Post creation and interaction
- Follow/unfollow functionality
- Responsive design

## Project Structure

### Backend (`/server`)
The backend is built with Node.js and Express, using PostgreSQL for the database. It includes:
- **Controllers**: Handles business logic for users, posts, and authentication.
- **Routes**: Defines API endpoints.
- **Database**: PostgreSQL setup and connection.
- **Middlewares**: Authentication and utility functions.

The backend is deployed on Vercel: [Quill Backend](https://quill-server-tan.vercel.app)

### Frontend (`/client`)
The frontend is built with React, TypeScript, and Vite, styled using Tailwind CSS. It includes:
- **Pages**: Home, Profile, Search, and Authentication.
- **Components**: Reusable UI components.
- **Context**: Manages authentication state.
- **Firebase**: Used for storage and Firestore.

The frontend is deployed on Vercel: [Quill Frontend](https://quill-smoky.vercel.app/)

## Getting Started

### Prerequisites
- Node.js installed on your local machine.

### Running Locally

#### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend
1. Navigate to the backend directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## Deployment
The backend is deployed on Vercel, and the frontend can be deployed using Vercel or any static hosting service.




# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Project Structure

- **frontend/** - React application built with Vite
- **backend/** - Express API server

## Setup and Installation

### Prerequisites

- Node.js 16+
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5050
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Production Build

### Backend

```bash
cd backend
npm run start
```

### Frontend

```bash
cd frontend
npm run build
```

The build artifacts will be stored in the `frontend/dist` directory.

## Deployment

### Deploying Backend to Render

1. **Create a Render account**:
   - Sign up at [render.com](https://render.com) if you don't already have an account

2. **Set up a Web Service**:
   - From the Render dashboard, click "New" and select "Web Service"
   - Connect your GitHub repository (or use manual deploy with the Render CLI)
   - Configure the service:
     - Name: `task-management-backend` (or your preferred name)
     - Environment: `Node`
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`

3. **Configure Environment Variables**:
   - Under the "Environment" tab, add the following variables:
     - `PORT`: `10000` (Render assigns a port via PORT env var)
     - `NODE_ENV`: `production`
     - `MONGODB_URI`: Your MongoDB connection string (use MongoDB Atlas for production)
     - `JWT_SECRET`: A secure random string for JWT token signing

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for the build and deployment to complete

5. **Verify Deployment**:
   - Once deployed, visit your service URL (e.g., `https://task-management-backend.onrender.com`)
   - You should see the API health check response

### Deploying Frontend

For frontend deployment, you can use Vercel, Netlify, or GitHub Pages. Update the API_URL in the frontend to point to your Render backend URL.

## Troubleshooting

### "Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true..."

This error is often related to browser extensions that use Chrome's messaging API. Try:

1. Disabling browser extensions, especially ad blockers or privacy tools
2. Using Chrome in incognito mode
3. Using a different browser

### API Connection Issues

If the frontend can't connect to the backend:

1. Ensure the backend server is running on port 5050
2. Check that the API URL in `frontend/src/services/api.js` matches your backend URL
3. Verify CORS settings in `backend/src/server.js` allow requests from your frontend origin

### MongoDB Connection Issues

If the server can't connect to MongoDB:

1. Ensure MongoDB is running
2. Check the `MONGODB_URI` in your `.env` file
3. Verify network access if using MongoDB Atlas

### Render Deployment Issues

1. Check the Render logs for error messages
2. Ensure all environment variables are set correctly
3. Verify your MongoDB Atlas IP allowlist includes Render's IPs (or set it to allow access from anywhere)
4. Make sure your start command is correct: `cd backend && npm start`

## License

MIT

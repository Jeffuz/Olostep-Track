# Olostep Track

Olostep Track is a web application designed to scrape and analyze web content, featuring both frontend and backend components. This guide will help you set up the project locally.

## Frontend Setup

The frontend of Olostep Track is built using Next.js. Follow these steps to get the frontend running:

### Prerequisites

- Ensure you have Node.js installed on your machine. You can download it [here](https://nodejs.org/).

### Getting Started

1. **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/YourUsername/Olostep-Track.git
    ```

2. **Navigate to the frontend directory**:
    ```bash
    cd Olostep-Track/my-app
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Access the application**:
    Open your browser and navigate to `http://localhost:3000` to view the application.

## Backend Setup

The backend of Olostep Track is built using Node.js, Express, and MongoDB. Follow these steps to get the backend running:

### Prerequisites

- **MongoDB Atlas Account**: Set up a free account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster.
- **Node.js**: Ensure Node.js is installed on your machine.

### Getting Started

1. **Create a `.env` file** in the root directory of the backend (e.g., `Olostep-Track/server`) and add your MongoDB Atlas connection URI and backend server url:
    ```plaintext
    MONGO_ATLAS_URI="your-mongodb-uri-here"
    NEXT_PUBLIC_SERVER_URL = "http://localhost:5000"
    ```
   Replace `"your-mongodb-uri-here"` with the connection string provided by MongoDB Atlas.

2. **Navigate to the backend directory**:
    ```bash
    cd Olostep-Track/server
    ```

3. **Install backend dependencies**:
    ```bash
    npm install
    ```

4. **Start the backend server**:
    ```bash
    npm run dev
    ```

5. **Test the backend**:
    The backend should be running on `http://localhost:5000`. You can test it by visiting `http://localhost:5000/ping`, which should return a "Server Is Up!" message.

## Troubleshooting

- **MongoDB Connection Issues**: Ensure that your MongoDB URI is correctly formatted in the `.env` file, and that the user has the correct permissions to access the database.
- **Port Conflicts**: If `localhost:3000` or `localhost:5000` is already in use, you can modify the port in the `package.json` scripts or `.env` file.

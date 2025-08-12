# DevConnect - Developer Networking Platform

A modern full-stack application that connects developers through an intuitive swipe-based interface, enabling professional networking and collaboration opportunities within the tech community.

## 🚀 Features

- **Swipe-Based Matching**: Tinder-like interface for discovering and connecting with fellow developers
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Real-Time Connections**: Instant connection requests and profile matching
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Profile Management**: Comprehensive developer profiles with skills, experience, and projects
- **Advanced Search**: Filter and discover developers by technology stack, location, and experience level

## 🛠 Tech Stack

### Frontend
- **React** - Component-based UI library
- **Redux** - Centralized state management
- **TailWind CSS** - Responsive styling and animations
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with indexing optimization
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security

### DevOps & Deployment
- **AWS EC2** - Cloud computing platform
- **Nginx** - Reverse proxy server
- **PM2** - Process manager for Node.js applications
- **Environment Variables** - Secure configuration management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v20 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rathin8670/DevConnect.git
   cd DevConnect
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` file in the backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devconnect
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   ```

5. **Start MongoDB service**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu
   sudo systemctl start mongod
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd BE
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd FE
   npm start
   ```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:7777`

### Production Build

1. **Build the frontend**
   ```bash
   cd FE
   npm run build
   ```

2. **Start production server**
   ```bash
   cd BE
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/signup` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/profile/view` - Get user profile
- `PUT /api/profile/edit` - Update user profile

### User Management
- `GET /api/user/feed` - Get user feed with pagination
- `POST /api/request/send/:status/:toUserId` - Send connection request
- `POST /api/request/review/:status/:requestId` - Accept/reject connection request
- `GET /api/user/connections` - Get user connections
- `GET /api/user/requests` - Get pending requests

### Example API Response
```json
{
  "success": true,
  "data": {
    "users": [...],
    "currentPage": 1,
    "totalPages": 5,
    "hasMore": true
  }
}
```

## 🏗 Project Structure

```
DevConnect/
├── FE/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── utils/
│   └── public/
├── BE/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
└── README.md
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication system
- **Password Hashing**: bcrypt encryption for password security
- **Environment Variables**: Sensitive data protection
- **CORS Configuration**: Cross-origin resource sharing security
- **Input Validation**: Server-side request validation
- **AWS Security Groups**: Network-level security controls

## 📈 Performance Optimizations

- **Database Indexing**: Strategic MongoDB indexing for faster queries
- **Pagination**: Efficient data loading with limit/offset pagination
- **State Management**: Redux for optimized state updates
- **Code Splitting**: Lazy loading of React components
- **Nginx Caching**: Static asset caching and compression
- **PM2 Clustering**: Multi-process application scaling

## 🚀 Deployment

### AWS EC2 Deployment

1. **Launch EC2 Instance**
   - Choose Ubuntu Server AMI
   - Configure security groups (ports 22, 80, 443, 7777)
   - Launch with key pair

2. **Server Setup**
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install MongoDB
   wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   
   # Install Nginx
   sudo apt install nginx -y
   
   # Install PM2
   sudo npm install -g pm2
   ```

3. **Deploy Application**
   ```bash
   # Clone repository https://github.com/Rathin8670/DevConnect.git
   cd DevConnect
   
   # Install dependencies and build
   cd BE && npm install
   cd ../FE && npm install && npm run build
   
   # Start with PM2
   cd ../BE
   pm2 start app.js --name DevConnect
   pm2 startup
   pm2 save
   ```



## 🧪 Testing

```bash
# Run backend tests
cd BE
npm install
npm run dev

# Run frontend tests
cd FE
npm install
npm run dev
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

**Your Name**
- GitHub: [@Rathin Mondal](https://github.com/Rathin8670)
- LinkedIn: [Rathin Mondal](https://www.linkedin.com/in/rathin-mondal-a13246253/)
- Email: mondalrathin1234xx@gmail.com

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB team for database performance insights
- AWS for reliable cloud infrastructure
- Open source contributors who made this project possible

## 📊 Project Stats

- **Uptime**: 99%+ production availability
- **Performance**: Optimized for large user datasets
- **Security**: Enterprise-grade authentication and authorization
- **Scalability**: Horizontal scaling ready with PM2 clustering

---

⭐ **Star this repository if you found it helpful!**
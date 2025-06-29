# snappy.bio 🚀

Create beautiful, personalized link pages to showcase all your social media profiles, websites, and content in one place. A modern alternative to Linktree with a sleek, customizable interface.

![snappy.bio](./frontend/public/coffee-removebg-preview.png)

## ✨ Features

- 🎨 **Customizable Backgrounds** - Choose any color with our color picker
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🔗 **Unlimited Links** - Add as many social links as you need
- 👤 **Profile Customization** - Upload profile pictures and write bios
- 🌙 **Smart Color Adaptation** - Text automatically adapts to background for readability
- 📋 **One-Click Sharing** - Copy shareable links instantly
- 🔒 **Secure Authentication** - JWT-based authentication with persistent sessions
- ⚡ **Real-time Preview** - See changes instantly before publishing
- 🎯 **Public Profiles** - Clean, accessible public profile pages

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Zustand** for state management
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Cloudinary** for image uploads
- **bcrypt** for password hashing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/snappy.bio.git
   cd snappy.bio
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/snappy-bio
   
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   
   Backend (from backend directory):
   ```bash
   npm run dev
   ```
   
   Frontend (from frontend directory):
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
snappy.bio/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and service configurations
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── index.js        # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Zustand store
│   │   ├── lib/            # Utilities
│   │   └── main.tsx        # App entry point
│   ├── public/            # Static assets
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend `.env`
```env
# Server
JWT_SECRET=your_super_secret_jwt_key
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/snappy-bio

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📱 Usage

1. **Sign Up/Login** - Create an account or log in
2. **Customize Profile** - Add your username, bio, and profile picture
3. **Add Links** - Add your social media and website links
4. **Choose Background** - Pick a color that represents you
5. **Preview** - See how your page looks before publishing
6. **Share** - Copy your public link and share it everywhere!

Your public profile will be available at: `yourdomain.com/yourusername`

## 🎨 Features in Detail

### Smart Color Adaptation
The app automatically detects if your background is light or dark and adjusts:
- Text colors for optimal readability
- Button colors for proper contrast
- Border colors for visual clarity

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Smooth animations and transitions

### Authentication
- Secure JWT-based authentication
- Persistent sessions across browser refreshes
- Automatic token verification
- Secure logout functionality

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### Backend (Railway/Heroku/DigitalOcean)
1. Ensure all environment variables are set
2. Deploy the backend directory
3. Update frontend API URLs to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Inspiration from various link-in-bio services

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Made with ❤️ by [Your Name](https://github.com/yourusername)

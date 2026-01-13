# CardioPredict Frontend

React-based frontend for the Cardiovascular Disease Prediction application.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your backend URL:
   ```env
   REACT_APP_API_URL=https://cardiopredict-production.up.railway.app/api
   ```

3. **Run Development Server**
   ```bash
   npm start
   ```
   
   The app will open at [http://localhost:3000](http://localhost:3000)

## 🌐 Environment Configuration

### Development (Local Backend)
If running the backend locally on port 5000:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production (Railway)
For the deployed Railway backend:
```env
REACT_APP_API_URL=https://cardiopredict-production.up.railway.app/api
```

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🚢 Deployment

### Vercel Deployment

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variable in Vercel**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add: `REACT_APP_API_URL` = `https://cardiopredict-production.up.railway.app/api`

### Other Platforms

The app can be deployed to:
- **Netlify**: Drag and drop the `build/` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3**: Upload build folder to S3 bucket

## 🛠️ Tech Stack

- **React** 18.2.0
- **React Router** 6.20.0
- **Axios** for API calls
- **Chart.js** for data visualization
- **React Icons** for UI icons

## 📁 Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── services/     # API service layer
│   ├── App.js        # Main app component
│   └── index.js      # Entry point
├── .env              # Environment variables (not committed)
├── .env.example      # Environment template
└── package.json      # Dependencies
```

## 🔧 Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🌟 Features

- ❤️ Heart Disease Risk Prediction
- 📊 Interactive Data Visualization
- 📈 Model Performance Metrics
- 💡 Health Insights & Recommendations
- 📱 Responsive Design

## 🔗 Backend

Backend is deployed on Railway: [https://cardiopredict-production.up.railway.app](https://cardiopredict-production.up.railway.app)

## 📝 Notes

- The `.env` file is gitignored for security
- Always use `.env.example` as a template
- Environment variables must start with `REACT_APP_` to be accessible in React

# Render Deployment Guide for Snappy.bio

## Deploy to Render

### Option 1: Using render.yaml (Recommended)

1. **Connect your GitHub repository to Render**
   - Go to [render.com](https://render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub account and select `snappy.bio` repository
   - Render will automatically detect the `render.yaml` file

2. **Set Environment Variables**
   Add these in the Render dashboard for your backend service:
   ```
   JWT_SECRET=snappyBioSecretKey
   MONGO_URI=mongodb+srv://aniketdey251:UdEQSfjMrxWO7Ben@snappybio.jkwnowh.mongodb.net/snappy-Bio?retryWrites=true&w=majority&appName=snappyBio
   CLOUDINARY_CLOUD_NAME=dfyt6cvih
   CLOUDINARY_API_KEY=844246516665591
   CLOUDINARY_API_SECRET=GO3f9aNz1npbtxrbKup4c-QxgxI
   NODE_ENV=production
   ```

### Option 2: Manual Deployment

1. **Deploy Backend**
   - New → Web Service
   - Connect GitHub repo
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Deploy Frontend**
   - New → Static Site
   - Connect same GitHub repo
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

### Important Notes

- **Backend URL**: Your backend will be available at `https://snappy-bio-api.onrender.com`
- **Frontend URL**: Your frontend will be available at `https://snappy-bio-frontend.onrender.com`
- **Free Tier**: Services spin down after 15 minutes of inactivity
- **Custom Domain**: You can add a custom domain in Render dashboard

### Update API URLs

If you change the service names in Render, update these files:
- `frontend/src/lib/api.ts`
- `frontend/src/components/Dashboard/comps/BasicInfo.tsx`
- `frontend/src/store/store.ts`

Replace `snappy-bio-api.onrender.com` with your actual backend service URL.

# Assemblé (Exhibition Curator)

A high-performance web application for creating virtual exhibitions from museum collections using multiple museum APIs. Features enterprise-level performance with a **98/100 Lighthouse score** and comprehensive accessibility support.

### Live Demo

**Live Site**: [https://assemble-gallery-curator.netlify.app/]

## Project Setup

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Authentication**: Clerk (user management)
- **APIs**: Metropolitan Museum of Art API + Harvard Art Museums API
- **Styling**: Tailwind CSS
- **Performance**: Optimized with lazy loading, code splitting, and image optimization
- **Deployment**: Frontend-only (Netlify ready)

### Project Structure
```
exhibition_curator/
├── frontend/                 # React + TypeScript app
│   ├── src/
│   │   ├── components/      # React components (optimized)
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── context/        # State management
│   ├── public/             # Static assets (robots.txt, sitemap.xml)
│   ├── dist/               # Production build
│   ├── package.json
│   └── .env                # API keys
├── ACCESSIBILITY_IMPROVEMENTS.md
├── PERFORMANCE_OPTIMIZATION_GUIDE.md
├── package.json            # Root package.json
└── README.md
```

### Getting Started

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   # Create .env file in frontend directory
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3001` (or the port shown in terminal)

### API Keys
- **Metropolitan Museum**: No key required
- **Harvard Art Museums**: API key stored in `frontend/.env`
- **Clerk Authentication**: Required for user management

## ✨ Features

### ✅ Implemented
- **Search & Filter**: Browse artworks from Metropolitan Museum and Harvard Art Museums
- **User Authentication**: Secure login/signup with Clerk
- **Exhibition Creation**: Create and name custom exhibitions
- **Artwork Management**: Add/remove artworks from exhibitions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Accessibility**: WCAG compliant with screen reader support
- **Performance**: 98/100 Lighthouse score with lazy loading and code splitting
- **SEO Optimized**: Meta tags, sitemap, and robots.txt

## 🚀 Performance & Accessibility

### Lighthouse Scores
- **Performance**: 98/100 🚀
- **Accessibility**: 95/100 ✅
- **Best Practices**: 77/100 ✅
- **SEO**: 100/100 ✅

### Key Optimizations
- **Bundle Splitting**: Separate chunks for vendor, Clerk, and utility libraries
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: React.lazy for optimal loading
- **Image Optimization**: Custom OptimizedImage component with intersection observer
- **Critical Resource Preloading**: DNS prefetch and resource preloading
- **Accessibility**: Focus management, reduced motion, high contrast support

## 📚 Documentation

- **[Performance Optimization Guide](./PERFORMANCE_OPTIMIZATION_GUIDE.md)** - Detailed performance improvements
- **[Accessibility Improvements](./ACCESSIBILITY_IMPROVEMENTS.md)** - Accessibility features and compliance

## 🛠️ Development

### Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check
```

## 🚀 Deployment

### Netlify Deployment
This project is optimized for Netlify deployment:

1. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Node version: 18.x

2. **Environment Variables** (set in Netlify dashboard):
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

3. **Deploy**:
   - Connect your GitHub repository to Netlify
   - Netlify will automatically build and deploy on every push to main branch



## 🔮 Future Enhancements
- Backend API for data persistence
- Additional museum APIs (MoMA, Guggenheim, etc.)
- Advanced exhibition sharing and collaboration
- AI-powered curation suggestions


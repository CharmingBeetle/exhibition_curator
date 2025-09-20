# Exhibition Curator

A web application for creating virtual exhibitions from museum collections using multiple museum APIs.

## Project Setup

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **APIs**: Metropolitan Museum of Art API + Harvard Art Museums API
- **Styling**: CSS (to be added)
- **Deployment**: Frontend-only (Vercel/Netlify ready)

### Project Structure
```
exhibition_curator/
├── frontend/                 # React + TypeScript app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── types/          # TypeScript types
│   │   └── context/        # State management
│   ├── package.json
│   └── .env                # API keys
├── package.json            # Root package.json
└── README.md
```

### Getting Started

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:5173`

### API Keys
- **Metropolitan Museum**: No key required
- **Harvard Art Museums**: API key stored in `frontend/.env`

### Features (Planned)
- [ ] Search and filter artworks from multiple museums
- [ ] Create temporary exhibitions
- [ ] Display artwork information and images
- [ ] Responsive design
- [ ] Accessibility features

### Future Enhancements
- User accounts and persistent exhibitions
- Backend API for data persistence
- Additional museum APIs
- Social sharing features

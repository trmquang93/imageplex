# ImagePlex Web Application

A modern web-based image processing tool that transforms uploaded images through four powerful processing features: intelligent resizing, AI-powered coloring, line art conversion, and advanced line thickness reduction.

## Features

### 🎯 Core Processing Features
- **Intelligent Resize**: Transform images to specific aspect ratios while preserving important visual elements
- **AI Image Coloring**: Convert line art into colored illustrations with multiple artistic styles
- **Line Art Conversion**: Convert photos/colored images to clean line art for coloring activities
- **Line Thickness Reduction**: Advanced morphological thinning to reduce all lines to exactly 1-pixel width using Zhang-Suen skeleton algorithm

### 🚀 Technical Features
- **Modern React + TypeScript**: Built with React 18 and TypeScript for type safety
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Real-time Processing**: Live preview and processing status updates
- **Canvas Processing**: Server-side image manipulation with HTML5 Canvas API
- **State Management**: Efficient state handling with Zustand
- **Smooth Animations**: Enhanced UX with Framer Motion animations
- **Bilingual Support**: Full English and Vietnamese localization

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Custom CSS with utility classes (Tailwind-inspired)
- **State Management**: Zustand for lightweight, efficient state handling
- **File Upload**: React Dropzone for drag-and-drop functionality
- **Icons**: Lucide React for beautiful, consistent icons
- **Animations**: Framer Motion for smooth, premium interactions
- **Image Processing**: HTML5 Canvas API with node-canvas for server-side processing
- **API Processing**: FAL.AI for advanced AI features, custom Canvas algorithms for morphological operations
- **Deployment**: Vercel with serverless functions for scalable processing

## Project Structure

```
web-app/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   │   ├── layout/          # Layout components (Header, Footer, Layout)
│   │   └── features/        # Feature-specific components
│   ├── hooks/               # Custom React hooks
│   ├── services/            # API and processing services
│   ├── stores/              # Zustand state stores
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and constants
│   └── App.tsx
├── api/                     # Vercel serverless API functions
│   ├── upload.ts            # File upload to FAL.AI storage
│   ├── resize.ts            # Intelligent image resizing
│   ├── coloring.ts          # AI-powered image coloring
│   ├── lineArt.ts           # Line art conversion
│   └── lineThinner.ts       # Canvas-based line thickness reduction
├── dev-server/              # Local development API server
│   ├── routes/              # Express.js API route handlers
│   └── index.js             # Development server entry point
├── public/                  # Static assets
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the web-app directory:
   ```bash
   cd web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (when configured)

## Usage

1. **Upload Images**: Drag and drop images onto the upload area or click to browse files
2. **Configure Processing**: Choose which processing steps to apply:
   - **Resize**: Transform to specific aspect ratios (A4, Square, Portrait, Landscape, etc.)
   - **Coloring**: AI-powered colorization with various artistic styles
   - **Line Art**: Convert photos to clean line drawings for coloring
   - **Line Thickness**: Reduce all lines to exactly 1-pixel width using morphological thinning
3. **Set Parameters**: Adjust settings for each processing step
4. **Process**: Watch as your images are transformed in real-time
5. **Download**: Save your processed images

### Supported Formats
- **Input**: PNG, JPEG, GIF, WebP
- **Output**: PNG, JPEG, WebP
- **Max File Size**: 50MB per image (increased for development and line processing)

## Advanced Processing Features

### Line Thickness Reduction (Zhang-Suen Algorithm)

The line thickness reduction feature implements the Zhang-Suen morphological thinning algorithm to convert thick lines into single-pixel skeletons while preserving topology and connectivity.

**Key Features:**
- **Exact 1-pixel lines**: Reduces all strokes to exactly 1-pixel width
- **Topology preservation**: Maintains line connectivity and structure  
- **Configurable iterations**: Adjustable processing strength (1-20 iterations)
- **Output styles**: Black-on-white or white-on-black output
- **Endpoint preservation**: Optional setting to maintain line endpoints
- **Canvas-based processing**: No external API dependencies, fully self-contained

**Technical Implementation:**
- Pure JavaScript implementation of Zhang-Suen algorithm
- Server-side Canvas API processing using node-canvas
- Binary image conversion with configurable thresholding
- Morphological operations for skeleton extraction
- Real-time processing with comprehensive error handling

**Use Cases:**
- Converting hand-drawn sketches to clean digital lines
- Preparing line art for digital coloring applications
- Creating consistent stroke weights across artwork
- Processing scanned drawings for digital use

## Development

### Key Components

- **ImageStore**: Central state management for uploaded images and processing pipeline
- **useFileUpload**: Custom hook handling drag-and-drop file uploads
- **HeroSection**: Landing page hero with feature highlights
- **UploadSection**: File upload interface with drag-and-drop support

### Adding New Features

1. Create components in appropriate directories (`/components/features/`, `/components/ui/`)
2. Add types in `/types/index.ts`
3. Use Zustand store for state management
4. Follow existing patterns for styling and animations

### Styling Guidelines

- Use semantic CSS classes for component styling
- Follow utility-first approach for layouts and spacing
- Maintain consistent spacing, colors, and typography
- Ensure responsive design across all screen sizes

## Performance

- **Fast Development**: Vite provides instant hot module replacement
- **Optimized Builds**: Automatic code splitting and tree shaking
- **Efficient State**: Zustand provides minimal re-renders
- **Lazy Loading**: Components and assets loaded on demand

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Ensure responsive design
4. Add proper error handling
5. Test across different browsers and devices

## License

This project is part of the ImagePlex application suite.
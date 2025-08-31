# ImagePlex Web Application

A modern web-based image processing tool that transforms uploaded images through three optional processing steps: intelligent resizing, AI-powered coloring, and line art conversion.

## Features

### 🎯 Core Processing Features
- **Intelligent Resize**: Transform images to specific aspect ratios while preserving important visual elements
- **AI Image Coloring**: Convert line art into colored illustrations with multiple artistic styles
- **Line Art Conversion**: Convert photos/colored images to clean line art for coloring activities

### 🚀 Technical Features
- **Modern React + TypeScript**: Built with React 18 and TypeScript for type safety
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Real-time Processing**: Live preview and processing status updates
- **State Management**: Efficient state handling with Zustand
- **Smooth Animations**: Enhanced UX with Framer Motion animations

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Custom CSS with utility classes (Tailwind-inspired)
- **State Management**: Zustand for lightweight, efficient state handling
- **File Upload**: React Dropzone for drag-and-drop functionality
- **Icons**: Lucide React for beautiful, consistent icons
- **Animations**: Framer Motion for smooth, premium interactions

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
2. **Configure Processing**: Choose which processing steps to apply (resize, colorize, line art)
3. **Set Parameters**: Adjust settings for each processing step
4. **Process**: Watch as your images are transformed in real-time
5. **Download**: Save your processed images

### Supported Formats
- **Input**: PNG, JPEG, GIF, WebP
- **Output**: PNG, JPEG, WebP
- **Max File Size**: 10MB per image

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
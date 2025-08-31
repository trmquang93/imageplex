export type Language = 'en' | 'vi';

export interface TranslationKeys {
  // Main UI
  upload: {
    title: string;
    subtitle: string;
    dragText: string;
    browseText: string;
    chooseFiles: string;
    maxFileSize: string;
    successMessage: string;
    processButton: string;
  };
  
  // Processing Features
  features: {
    resize: {
      title: string;
      description: string;
      features: string[];
    };
    coloring: {
      title: string;
      description: string;
      features: string[];
    };
    lineArt: {
      title: string;
      description: string;
      features: string[];
    };
  };
  
  // Processing Options
  options: {
    aspectRatio: string;
    coloringStyle: string;
    lineStyle: string;
    square: string;
    portrait: string;
    landscape: string;
    widescreen: string;
    mobile: string;
    crayon: string;
    watercolor: string;
    digital: string;
    realistic: string;
    blackOnWhite: string;
    whiteOnBlack: string;
    colored: string;
  };
  
  // Processing Status
  processing: {
    initializing: string;
    preparing: string;
    resizing: string;
    coloring: string;
    lineArt: string;
    finalizing: string;
    complete: string;
    error: string;
  };
  
  // Results Modal
  results: {
    title: string;
    original: string;
    processed: string;
    download: string;
    useAsNew: string;
    close: string;
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    language: string;
  };
}

export interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
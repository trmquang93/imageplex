// Application Types

export interface ProcessingOptions {
  resize: {
    aspectRatio: string;
    mode: string;
  };
  coloring: {
    style: string;
    preference: string;
  };
  lineArt: {
    style: string;
    weight: string;
  };
}

export interface ProcessingStep {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}
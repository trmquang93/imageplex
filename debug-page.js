// Simple debug script to check what's on the page
async function debugPage() {
  try {
    const response = await fetch('http://localhost:3001');
    const html = await response.text();
    
    console.log('Status:', response.status);
    console.log('Content-Type:', response.headers.get('content-type'));
    console.log('HTML length:', html.length);
    console.log('First 500 chars:', html.substring(0, 500));
    
    // Check if it contains the expected elements
    const hasRoot = html.includes('id="root"');
    const hasScript = html.includes('/src/main.tsx');
    const hasTitle = html.includes('Vite + React');
    
    console.log('Has root div:', hasRoot);
    console.log('Has main script:', hasScript);
    console.log('Has title:', hasTitle);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

debugPage();
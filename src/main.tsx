import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initWebVitals } from './utils/webVitals';

createRoot(document.getElementById("root")!).render(<App />);

// Initialize Web Vitals tracking after app mounts
if (typeof window !== 'undefined') {
  // Wait for page to be fully interactive before starting performance monitoring
  if (document.readyState === 'complete') {
    initWebVitals();
  } else {
    window.addEventListener('load', initWebVitals);
  }
}

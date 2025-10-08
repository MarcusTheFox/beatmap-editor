import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import EditorPage from "./pages/editor";
import { AppProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<EditorPage />} path="/edit/:song" />
        <Route element={<DocsPage />} path="/docs" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </AppProvider>
  );
}

export default App;

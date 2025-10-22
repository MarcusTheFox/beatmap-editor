import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/home";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import EditorPage from "@/pages/editor";
import { AppProvider } from "./providers/app";
import NotFoundPage from "@/pages/not-found";
import { EditorDetailsPage } from "@/pages/editor-details";
import { DefaultLayout, EditorLayout } from "@/pages/layouts";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<DefaultLayout />} path="/">
          <Route element={<IndexPage />} index />
        </Route>
        <Route element={<EditorLayout />} path="/edit/:song">
          <Route element={<EditorPage />} index />
          <Route element={<EditorDetailsPage />} path="/edit/:song/details" />
        </Route>
        <Route element={<DefaultLayout />} path="/docs">
          <Route element={<DocsPage />} index />
        </Route>
        <Route element={<DefaultLayout />} path="/pricing">
          <Route element={<PricingPage />} index />
        </Route>
        <Route element={<DefaultLayout />} path="/blog">
          <Route element={<BlogPage />} index />
        </Route>
        <Route element={<DefaultLayout />} path="/about">
          <Route element={<AboutPage />} index />
        </Route>

        <Route
          path="*" 
          element={
            <DefaultLayout>
              <NotFoundPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;

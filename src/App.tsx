import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/hooks/use-i18n";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import ArticlePage from "./pages/ArticlePage";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./pages/AdminLayout";
import AdminOverview from "./pages/AdminOverview";
import AdminHero from "./pages/AdminHero";
import AdminAbout from "./pages/AdminAbout";
import AdminParcours from "./pages/AdminParcours";
import AdminPublications from "./pages/AdminPublications";
import AdminArticles from "./pages/AdminArticles";
import AdminEditor from "./pages/AdminEditor";
import AdminContact from "./pages/AdminContact";
import AdminSettings from "./pages/AdminSettings";
import Contact from "./pages/Contact";
import ServicesPage from "./pages/ServicesPage";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="about" element={<AdminAbout />} />
              <Route path="parcours" element={<AdminParcours />} />
              <Route path="publications" element={<AdminPublications />} />
              <Route path="articles" element={<AdminArticles />} />
              <Route path="contact" element={<AdminContact />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            <Route path="/admin/editor" element={<AdminEditor />} />
            <Route path="/admin/editor/:id" element={<AdminEditor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

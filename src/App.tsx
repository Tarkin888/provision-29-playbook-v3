import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AssessmentProvider } from "./contexts/AssessmentContext";
import { VendorProvider } from "./contexts/VendorContext";
import { SearchProvider } from "./contexts/SearchContext";
import { ProgressProvider } from "./contexts/ProgressContext";
import ErrorBoundary from "./components/common/ErrorBoundary";
import GlobalSearch from "./components/search/GlobalSearch";
import Home from "./pages/Home";
import Roadmap from "./pages/Roadmap";
import Templates from "./pages/Templates";
import Roles from "./pages/Roles";
import RoleDetail from "./pages/RoleDetail";
import Resources from "./pages/Resources";
import FAQ from "./pages/FAQ";
import Glossary from "./pages/Glossary";
import Assessment from "./pages/Assessment";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <VendorProvider>
        <ProgressProvider>
          <AssessmentProvider>
            <SearchProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/roadmap" element={<Roadmap />} />
                      <Route path="/templates" element={<Templates />} />
                      <Route path="/roles" element={<Roles />} />
                      <Route path="/roles/:roleId" element={<RoleDetail />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/glossary" element={<Glossary />} />
                      <Route path="/assessment/*" element={<Assessment />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Layout>
                  <GlobalSearch />
                </BrowserRouter>
              </TooltipProvider>
            </SearchProvider>
          </AssessmentProvider>
        </ProgressProvider>
      </VendorProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;

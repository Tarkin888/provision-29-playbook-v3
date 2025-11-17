import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { P29Data } from "@/data";
import SEOHead from "@/components/common/SEOHead";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import FAQSearch from "@/components/faq/FAQSearch";
import CategoryFilter from "@/components/faq/CategoryFilter";
import FAQItem from "@/components/faq/FAQItem";
import EmptyState from "@/components/faq/EmptyState";

const FAQ = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItem, setExpandedItem] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const allFAQs = P29Data.faqs.getAll();
  const categories = P29Data.faqs.getCategories();
  const groupedFAQs = P29Data.faqs.getGroupedByCategory();

  // Get category counts
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = groupedFAQs[cat]?.length || 0;
    });
    return counts;
  }, [categories, groupedFAQs]);

  // Filter FAQs
  const filteredFAQs = useMemo(() => {
    let faqs = allFAQs;

    // Filter by category
    if (activeCategory !== "all") {
      faqs = faqs.filter(faq => faq.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      faqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }

    return faqs;
  }, [allFAQs, activeCategory, searchQuery]);

  // Popular questions (first 5 from General category)
  const popularQuestions = useMemo(() => {
    return P29Data.faqs.getByCategory("General").slice(0, 5);
  }, []);

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle hash in URL for direct links
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && allFAQs.find(faq => faq.id === hash)) {
      setExpandedItem(hash);
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash, allFAQs]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Frequently Asked Questions"
        description="Find answers to common questions about Provision 29 implementation, regulatory requirements, and best practices."
        canonical={`${window.location.origin}/faq`}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Breadcrumbs 
            items={[{ label: 'FAQ' }]} 
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center animate-fade-in">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground text-center mb-8 animate-fade-in">
            Everything you need to know about Provision 29 implementation
          </p>
          <FAQSearch 
            value={searchQuery} 
            onChange={setSearchQuery}
            resultCount={searchQuery ? filteredFAQs.length : undefined}
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-[var(--nav-height)] z-20 bg-background/95 backdrop-blur-sm border-b shadow-sm py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categoryCount={categoryCount}
          />
        </div>
      </section>

      {/* Category Overview Cards */}
      {!searchQuery && activeCategory === "all" && (
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveCategory(category)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">
                      {categoryCount[category] || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {categoryCount[category] === 1 ? 'question' : 'questions'}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Questions */}
      {!searchQuery && activeCategory === "all" && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Most Popular Questions</h2>
            <Accordion 
              type="single" 
              collapsible 
              value={expandedItem}
              onValueChange={setExpandedItem}
              className="space-y-2"
            >
              {popularQuestions.map((faq) => (
                <FAQItem key={faq.id} faq={faq} searchQuery={searchQuery} />
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Main FAQ List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {activeCategory !== "all" && !searchQuery && (
            <h2 className="text-2xl font-bold mb-6">{activeCategory} Questions</h2>
          )}
          
          {filteredFAQs.length > 0 ? (
            <Accordion 
              type="single" 
              collapsible 
              value={expandedItem}
              onValueChange={setExpandedItem}
              className="space-y-2"
            >
              {filteredFAQs.map((faq) => (
                <FAQItem key={faq.id} faq={faq} searchQuery={searchQuery} />
              ))}
            </Accordion>
          ) : (
            <EmptyState searchQuery={searchQuery} onClearSearch={clearSearch} />
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 rounded-full shadow-lg z-30 animate-fade-in"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default FAQ;

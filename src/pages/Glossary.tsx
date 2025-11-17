import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { P29Data } from "@/data";
import SEOHead from "@/components/common/SEOHead";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowUp, Download } from "lucide-react";
import GlossarySearch from "@/components/glossary/GlossarySearch";
import AlphabetNav from "@/components/glossary/AlphabetNav";
import GlossarySection from "@/components/glossary/GlossarySection";
import EmptyState from "@/components/glossary/EmptyState";

const Glossary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedTerm, setHighlightedTerm] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeLetter, setActiveLetter] = useState("");

  const allTerms = P29Data.glossary.getAll();
  const alphabetIndex = P29Data.glossary.getAlphabet();

  // Filter terms by search query
  const filteredTerms = useMemo(() => {
    if (!searchQuery) return allTerms;
    
    const query = searchQuery.toLowerCase();
    return allTerms.filter(term =>
      term.term.toLowerCase().includes(query) ||
      term.definition.toLowerCase().includes(query) ||
      term.example?.toLowerCase().includes(query)
    );
  }, [allTerms, searchQuery]);

  // Group filtered terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, typeof allTerms> = {};
    
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(term);
    });

    // Sort terms within each letter group
    Object.keys(groups).forEach(letter => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term));
    });

    return groups;
  }, [filteredTerms]);

  const activeLetters = useMemo(() => {
    return new Set(Object.keys(groupedTerms));
  }, [groupedTerms]);

  // Handle scroll for back to top and active letter detection
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Detect active letter section
      const sections = Object.keys(groupedTerms);
      for (const letter of sections) {
        const element = document.getElementById(`letter-${letter}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveLetter(letter);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [groupedTerms]);

  // Handle hash in URL for direct links
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const term = allTerms.find(t => 
        t.term.toLowerCase().replace(/[^a-z0-9]+/g, '-') === hash
      );
      if (term) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedTerm(term.term);
            setTimeout(() => setHighlightedTerm(undefined), 3000);
          }
        }, 100);
      }
    }
  }, [location.hash, allTerms]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleRelatedTermClick = (termName: string) => {
    const term = allTerms.find(t => t.term === termName);
    if (term) {
      const termId = term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/glossary#${termId}`);
      
      setTimeout(() => {
        const element = document.getElementById(termId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setHighlightedTerm(term.term);
          setTimeout(() => setHighlightedTerm(undefined), 3000);
        }
      }, 100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDownload = () => {
    console.log("Download glossary as PDF");
    // In real app, this would generate PDF
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Glossary"
        description="Comprehensive glossary of Provision 29 terminology and definitions. Essential terms for successful regulatory compliance."
        canonical={`${window.location.origin}/glossary`}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <Breadcrumbs 
            items={[{ label: 'Glossary' }]} 
            className="mb-6"
          />
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                Provision 29 Glossary
              </h1>
              <p className="text-lg text-muted-foreground animate-fade-in">
                Key terms and definitions for UK Corporate Governance Code compliance
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="gap-2 flex-shrink-0"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
          <div className="mt-8">
            <GlossarySearch
              value={searchQuery}
              onChange={setSearchQuery}
              resultCount={searchQuery ? filteredTerms.length : undefined}
              totalCount={allTerms.length}
            />
          </div>
        </div>
      </section>

      {/* Alphabet Navigation */}
      <section className="sticky top-[var(--nav-height)] z-20 bg-background/95 backdrop-blur-sm border-b shadow-sm py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <AlphabetNav
            activeLetters={activeLetters}
            activeLetter={activeLetter}
            onLetterClick={scrollToLetter}
          />
        </div>
      </section>

      {/* Glossary Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredTerms.length > 0 ? (
            <div className="space-y-16">
              {Object.keys(groupedTerms)
                .sort()
                .map((letter) => (
                  <GlossarySection
                    key={letter}
                    letter={letter}
                    terms={groupedTerms[letter]}
                    searchQuery={searchQuery}
                    highlightedTerm={highlightedTerm}
                    onRelatedTermClick={handleRelatedTermClick}
                  />
                ))}
            </div>
          ) : (
            <EmptyState
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery("")}
            />
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

export default Glossary;

import { useState } from "react";
import { P29Data } from "@/data";
import SEOHead from "@/components/common/SEOHead";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, BookOpen, Video as VideoIcon } from "lucide-react";
import ArticleCard from "@/components/resources/ArticleCard";
import CaseStudyCard from "@/components/resources/CaseStudyCard";
import VideoCard from "@/components/resources/VideoCard";
import ArticleDetailModal from "@/components/resources/ArticleDetailModal";
import CaseStudyDetailModal from "@/components/resources/CaseStudyDetailModal";
import { Resource, CaseStudy, Video } from "@/types/data";

const Resources = () => {
  const [selectedArticle, setSelectedArticle] = useState<Resource | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const articles = P29Data.resources.getArticles();
  const caseStudies = P29Data.resources.getCaseStudies();
  const videos = P29Data.resources.getVideos();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Resources Hub"
        description="Expert insights, case studies, and guidance for Provision 29 implementation. Articles, videos, and practical resources."
        canonical={`${window.location.origin}/resources`}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumbs 
            items={[{ label: 'Resources' }]} 
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Resources Hub
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 animate-fade-in">
            Expert insights, real-world case studies, and essential P29 guidance
          </p>
          
          {/* Stats Row */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold">{articles.length}</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold">{caseStudies.length}</div>
                <div className="text-sm text-muted-foreground">Case Studies</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <VideoIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-bold">{videos.length}</div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="articles" className="w-full">
            <div className="sticky top-[var(--nav-height)] bg-background/95 backdrop-blur-sm z-10 pb-4 border-b mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="articles" className="gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Articles</span>
                </TabsTrigger>
                <TabsTrigger value="case-studies" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Case Studies</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="gap-2">
                  <VideoIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Videos</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Expert Articles & Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onViewDetails={() => setSelectedArticle(article)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Case Studies Tab */}
            <TabsContent value="case-studies" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Real-World Case Studies</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {caseStudies.map((caseStudy) => (
                    <CaseStudyCard
                      key={caseStudy.id}
                      caseStudy={caseStudy}
                      onViewDetails={() => setSelectedCaseStudy(caseStudy)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Video Tutorials & Guides</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onPlay={() => setSelectedVideo(video)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Modals */}
      <ArticleDetailModal
        article={selectedArticle}
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
      
      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
};

export default Resources;

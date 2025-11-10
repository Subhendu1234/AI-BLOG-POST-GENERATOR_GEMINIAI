
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BlogPostDisplay from './components/BlogPostDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { generateBlogPost } from './services/geminiService';
import { BlogPost } from './types';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBlogPost(null);

    try {
      const result = await generateBlogPost(topic);
      if (result) {
        setBlogPost(result);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <main className="w-full flex-grow flex flex-col items-center">
        <Header />
        <div className="w-full max-w-2xl my-8">
          <SearchBar 
            topic={topic}
            setTopic={setTopic}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>

        <div className="w-full flex-grow flex flex-col items-center justify-center py-8">
          {isLoading && <LoadingSpinner />}
          {error && <p className="text-red-500 bg-red-900/20 p-4 rounded-lg">{error}</p>}
          {blogPost && <BlogPostDisplay blogPost={blogPost} />}
          {!isLoading && !error && !blogPost && (
            <div className="text-center text-text-secondary">
              <p>Your generated blog post will appear here.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

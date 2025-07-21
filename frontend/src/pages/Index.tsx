
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, BarChart2, FileVideo, Hash } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-brand-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand-purple">HashTag Visualizer</h1>
          <div className="space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button 
              className="bg-brand-purple hover:bg-brand-purple-dark"
              onClick={() => navigate("/register")}
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>
      
      <main>
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  Optimize Your Video with <span className="text-brand-purple">AI-Powered</span> Hashtag Analysis
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Upload your video and get SEO-optimized hashtags, transcriptions, 
                  and keyword recommendations to maximize your content's discoverability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                    onClick={() => navigate("/register")}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => navigate("/login")}
                  >
                    Already have an account?
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="bg-gradient-to-br from-brand-purple/30 to-brand-purple-light/30 rounded-2xl p-1">
                  <div className="bg-white rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src="https://source.unsplash.com/random/800x600/?video,analysis" 
                      alt="Video analysis dashboard" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-brand-gray-light px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md card-shadow">
                <div className="p-3 bg-brand-purple/10 rounded-full inline-block mb-4">
                  <Upload className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Video</h3>
                <p className="text-gray-600">
                  Easily upload your video content through our secure platform.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md card-shadow">
                <div className="p-3 bg-brand-purple/10 rounded-full inline-block mb-4">
                  <FileVideo className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Generate Transcript</h3>
                <p className="text-gray-600">
                  Our AI creates accurate transcripts and concise summaries of your content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md card-shadow">
                <div className="p-3 bg-brand-purple/10 rounded-full inline-block mb-4">
                  <Hash className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze Hashtags</h3>
                <p className="text-gray-600">
                  Get relevant hashtag recommendations based on your video content.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md card-shadow">
                <div className="p-3 bg-brand-purple/10 rounded-full inline-block mb-4">
                  <BarChart2 className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualize Data</h3>
                <p className="text-gray-600">
                  See detailed analytics on hashtag performance and popularity.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to optimize your video content?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join now and discover how our AI-powered platform can help you increase your video's discoverability.
            </p>
            <Button 
              size="lg" 
              className="bg-brand-purple hover:bg-brand-purple-dark"
              onClick={() => navigate("/register")}
            >
              Create Your Free Account
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-brand-purple">HashTag Visualizer</h3>
              <p className="text-sm text-gray-500 mt-1">© 2025 All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-brand-purple">Terms</a>
              <a href="#" className="text-gray-500 hover:text-brand-purple">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-brand-purple">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

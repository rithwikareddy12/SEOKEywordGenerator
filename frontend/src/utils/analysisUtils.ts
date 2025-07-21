export const saveAnalysisToHistory = (file: File, content: any) => {
  // Create analysis history item
  const analysisItem = {
    id: content.id,
    videoName: file.name,
    timestamp: new Date().toISOString(),
    title: content.title,
    hashtags: content.hashtags,
    transcript: content.transcript,
    summary: content.summary,
    views: content.views
  };
  
  // Get existing history or initialize empty array
  const historyString = localStorage.getItem("video-analysis-history") || "[]";
  const history = JSON.parse(historyString);
  
  // Add new analysis to history
  const updatedHistory = [analysisItem, ...history];
  
  // Save to localStorage
  localStorage.setItem("video-analysis-history", JSON.stringify(updatedHistory));
  
  // Log data for backend integration
  console.log("Would typically call backend with:", {
    action: "store",
    data: content
  });
};

/**
 * Simulates backend processing of a video file
 */
export const simulateVideoAnalysis = async (file: File, analysisId: string) => {
  // Examine the video filename to determine content type for our simulation
  const filename = file.name.toLowerCase();
  
  // Keywords that might appear in file names to help determine content type
  const contentTypes = {
    marketing: ["marketing", "social", "brand", "business", "digital"],
    tech: ["code", "programming", "tech", "software", "javascript", "web"],
    travel: ["travel", "vacation", "trip", "tour", "vlog", "adventure"],
    fitness: ["fitness", "workout", "exercise", "gym", "training"],
    food: ["food", "cooking", "recipe", "kitchen", "meal", "dish"]
  };
  
  // Determine content type from filename
  let contentType = "generic";
  for (const [type, keywords] of Object.entries(contentTypes)) {
    if (keywords.some(keyword => filename.includes(keyword))) {
      contentType = type;
      break;
    }
  }
  
  console.log(`Detected content type: ${contentType} for file: ${filename}`);
  
  // Simulate backend processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate some realistic data based on content type
  // In production, this would come from the Python backend
  const simulatedResults = {
    id: analysisId,
    title: "",
    transcript: "",
    summary: "",
    hashtags: [],
    chartData: []
  };
  
  // Customize content based on content type
  if (contentType === "marketing") {
    simulatedResults.title = "The Science of Hashtags: How to Increase Your Content Visibility in 2023";
    simulatedResults.transcript = "In today's digital landscape, standing out on social media is more challenging than ever. Creating content that resonates with your audience requires understanding not just what they want to see, but also how they find it. Hashtags remain one of the most powerful tools for discovery, but using the right ones can make all the difference between content that gets seen and content that gets lost.";
    simulatedResults.summary = "This video explores effective hashtag strategies for social media in 2023, focusing on using targeted hashtags that align with audience interests and algorithm preferences rather than using hashtags indiscriminately.";
    simulatedResults.hashtags = ["contentcreator", "socialmediatips", "hashtagstrategy", "digitalmarketing", "growyouraudience", "socialmediaalgorithm", "marketingtips", "contentdiscovery"];
    simulatedResults.chartData = [
      { tag: "marketing", count: 325, relevance: 94 },
      { tag: "business", count: 280, relevance: 88 },
      { tag: "socialmedia", count: 240, relevance: 82 },
      { tag: "startup", count: 180, relevance: 75 },
      { tag: "entrepreneur", count: 150, relevance: 68 },
      { tag: "success", count: 120, relevance: 60 },
      { tag: "motivation", count: 100, relevance: 55 },
      { tag: "growth", count: 90, relevance: 52 },
    ];
  } else if (contentType === "tech") {
    simulatedResults.title = "10 Essential JavaScript Patterns Every Developer Should Know in 2023";
    simulatedResults.transcript = "JavaScript continues to evolve as one of the most versatile programming languages in the world. As web applications become more complex, understanding advanced patterns and techniques is crucial for writing maintainable and scalable code. In this video, I'll walk through the 10 most important JavaScript patterns that will make you a more effective developer. From closure techniques to the latest ES6+ features, these patterns will help you solve common problems more elegantly.";
    simulatedResults.summary = "This video covers 10 essential JavaScript patterns that help developers write cleaner, more maintainable code, including closures, module patterns, and modern ES6+ techniques for managing state and handling asynchronous operations.";
    simulatedResults.hashtags = ["programming", "codelife", "webdev", "softwareengineering", "frontend", "techstack", "javascript", "reactjs"];
    simulatedResults.chartData = [
      { tag: "javascript", count: 450, relevance: 96 },
      { tag: "webdev", count: 380, relevance: 92 },
      { tag: "programming", count: 320, relevance: 85 },
      { tag: "reactjs", count: 280, relevance: 78 },
      { tag: "frontend", count: 230, relevance: 75 },
      { tag: "codinglife", count: 180, relevance: 65 },
      { tag: "typescript", count: 150, relevance: 62 },
      { tag: "devtips", count: 120, relevance: 58 },
    ];
  } else if (contentType === "travel") {
    simulatedResults.title = "Hidden Gems of Southeast Asia: Off the Beaten Path Travel Guide";
    simulatedResults.transcript = "Welcome to another adventure! Today I'm taking you through some of the most incredible hidden locations across Southeast Asia that most tourists never get to see. After spending three months backpacking through Thailand, Vietnam, Cambodia, and Indonesia, I've discovered some truly magical places that aren't in the typical travel guides. I'll share not just the locations, but also the best times to visit, local transportation tips, and how to experience the authentic culture away from the tourist crowds.";
    simulatedResults.summary = "This travel vlog reveals lesser-known destinations across Southeast Asia, providing practical advice on how to experience authentic local culture, navigate transportation, and find accommodation in places that aren't heavily touristed.";
    simulatedResults.hashtags = ["travelvlog", "wanderlust", "exploremore", "traveltips", "travelinspiration", "adventureseeker", "digitalnomad", "beautifuldestinations"];
    simulatedResults.chartData = [
      { tag: "travel", count: 520, relevance: 98 },
      { tag: "wanderlust", count: 430, relevance: 95 },
      { tag: "backpacking", count: 310, relevance: 87 },
      { tag: "southeastasia", count: 260, relevance: 82 },
      { tag: "traveltips", count: 220, relevance: 79 },
      { tag: "exploremore", count: 180, relevance: 72 },
      { tag: "nomadlife", count: 150, relevance: 68 },
      { tag: "adventureseeker", count: 130, relevance: 64 },
    ];
  } else if (contentType === "fitness") {
    simulatedResults.title = "5-Week Full Body Transformation: No Gym Required";
    simulatedResults.transcript = "Today I'm sharing my complete 5-week home workout program that requires absolutely no equipment. Whether you're a beginner just starting your fitness journey or someone looking to stay in shape without a gym membership, this routine will help you build strength, improve endurance, and transform your body. I'll break down each exercise with proper form demonstrations, provide modifications for different fitness levels, and share the exact schedule I used to see results in just over a month.";
    simulatedResults.summary = "This fitness video presents a comprehensive 5-week home workout program requiring no equipment, with detailed exercise demonstrations, proper form guidance, and a progressive training schedule suitable for beginners and intermediate fitness enthusiasts.";
    simulatedResults.hashtags = ["fitnessmotivation", "workoutathome", "strengthtraining", "healthylifestyle", "fitnessjourney", "exerciseroutine", "personaltrainer", "workoutplan"];
    simulatedResults.chartData = [
      { tag: "fitness", count: 480, relevance: 97 },
      { tag: "workout", count: 420, relevance: 94 },
      { tag: "homeworkout", count: 350, relevance: 89 },
      { tag: "noequipment", count: 290, relevance: 83 },
      { tag: "fitnessmotivation", count: 240, relevance: 78 },
      { tag: "healthylifestyle", count: 200, relevance: 74 },
      { tag: "strengthtraining", count: 170, relevance: 68 },
      { tag: "fitnessjourney", count: 140, relevance: 65 },
    ];
  } else if (contentType === "food") {
    simulatedResults.title = "3 One-Pot Mediterranean Recipes for Busy Weeknights";
    simulatedResults.transcript = "Let's face it, after a long day at work, the last thing anyone wants to do is spend hours in the kitchen. That's why today I'm sharing three of my favorite Mediterranean-inspired one-pot meals that are not only delicious and healthy but also incredibly easy to make. These recipes are packed with flavor, take less than 30 minutes to prepare, and most importantly, they'll only leave you with one pot to clean afterward. I'll also show you how to meal prep these dishes for the entire week.";
    simulatedResults.summary = "This cooking tutorial demonstrates three quick and nutritious Mediterranean one-pot recipes perfect for weeknight dinners, with time-saving techniques and meal prep strategies for busy individuals who want to eat healthy without spending hours cooking.";
    simulatedResults.hashtags = ["foodie", "homecooking", "recipeoftheday", "easyrecipes", "cookingvideo", "healthymeals", "mealprep", "foodphotography"];
    simulatedResults.chartData = [
      { tag: "cooking", count: 410, relevance: 96 },
      { tag: "recipes", count: 380, relevance: 93 },
      { tag: "mediterraneandiet", count: 320, relevance: 88 },
      { tag: "onepotmeal", count: 270, relevance: 83 },
      { tag: "mealprep", count: 230, relevance: 77 },
      { tag: "healthyrecipes", count: 190, relevance: 75 },
      { tag: "quickmeals", count: 160, relevance: 69 },
      { tag: "easyrecipes", count: 140, relevance: 66 },
    ];
  } else {
    // Generic content if type can't be determined
    simulatedResults.title = `Video Analysis: ${file.name.replace(/\.[^/.]+$/, "")}`;
    simulatedResults.transcript = "This video provides valuable insights on its topic, with detailed explanations and examples. The content is structured to provide both beginners and experienced viewers with useful information they can apply immediately. Several key points are highlighted throughout the presentation with clear illustrations of the concepts discussed.";
    simulatedResults.summary = "This video offers a comprehensive overview of its subject matter, presenting key concepts in an accessible format with practical applications and examples that viewers can implement.";
    simulatedResults.hashtags = ["videoguide", "tutorial", "howto", "explained", "indepth", "contentcreator", "educational", "informative"];
    simulatedResults.chartData = [
      { tag: "tutorial", count: 350, relevance: 95 },
      { tag: "howto", count: 320, relevance: 90 },
      { tag: "educational", count: 280, relevance: 85 },
      { tag: "guide", count: 250, relevance: 80 },
      { tag: "explained", count: 220, relevance: 75 },
      { tag: "learning", count: 190, relevance: 70 },
      { tag: "overview", count: 150, relevance: 65 },
      { tag: "indepth", count: 120, relevance: 60 },
    ];
  }
  
  // Add view metrics
  const viewsData = {
    total: Math.floor(Math.random() * 5000) + 1000,
    byHashtag: simulatedResults.hashtags.reduce((acc: Record<string, number>, tag: string) => {
      acc[tag] = Math.floor(Math.random() * 500) + 50;
      return acc;
    }, {}),
    engagement: (Math.random() * 5).toFixed(1),
    impressions: Math.floor(Math.random() * 10000) + 2000
  };
  
  // Add views data to results
  return {
    ...simulatedResults,
    views: viewsData
  };
};

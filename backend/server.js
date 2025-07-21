  import express from 'express';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import multer from 'multer';
  import { spawn } from 'child_process';
  import path from 'path';
  import fs from 'fs';
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';
  import dotenv from 'dotenv';
  dotenv.config();

  const app = express();
  const PORT = process.env.PORT || 4000;
  // Middleware
  app.use(cors());
  app.use(express.json());
    const __dirname = dirname(fileURLToPath(import.meta.url));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));
  
  const analysisSchema = new mongoose.Schema({
    analysisId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    status: { type: String, default: 'pending' },
    currentStep: String,
    progress: Number,
    result: {
      title: String,
      transcript: String,
      summary: String,
      keywords: [String]
    },
    error: String,
    createdAt: { type: Date, default: Date.now }
  });

  const Analysis = mongoose.model('Analysis', analysisSchema);

  // Set up file upload with multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  const upload = multer({ storage });
const userSchema = new mongoose.Schema({
name: String,
email: String,
password: String,
});

const User = mongoose.model('User', userSchema);

// Registration route
app.post('/register', async (req, res) => {
try {
const { name, email, password } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(400).json({ error: "Email already registered" });
const user = new User({ name, email, password });
await user.save();
res.status(201).json({ message: "User registered successfully", userId: user._id });
} catch (err) {
res.status(500).json({ error: "Registration failed" });
}
});

// Login route (basic version)
app.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user || user.password !== password) {
return res.status(401).json({ error: "Invalid email or password" });
}
res.status(200).json({ message: "Login successful", userId: user._id });
} catch (err) {
res.status(500).json({ error: "Login failed" });
}
});

  // Video analysis endpoint
app.post('/api/analyze-video', upload.single('video'), async (req, res) => {
  try {
    const { userId, analysisId } = req.body;
    const videoPath = req.file.path;

    // Create new analysis document
    const analysis = new Analysis({
      analysisId,
      userId,
      status: 'processing',
      currentStep: 'Extracting audio',
      progress: 10
    });
    await analysis.save();

    const pythonProcess = spawn('python', ['video_analyzer.py', videoPath, analysisId]);

    let resultData = '';
    pythonProcess.stdout.on('data', (data) => {
      resultData += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      if (code === 0) {
        // Assume python script returns JSON string with title, transcript, summary, keywords
        try {
          const result = JSON.parse(resultData);

          // Update Analysis document
          await Analysis.findOneAndUpdate(
            { analysisId },
            {
              status: 'completed',
              currentStep: 'Analysis complete',
              progress: 100,
              result
            }
          );
          

          // Also update User's videos array
          await User.findByIdAndUpdate(
            userId,
            { $push: { videos: {
                videoId: analysisId,
                title: result.title,
                uploadDate: new Date(),
                transcript: result.transcript,
                summary: result.summary,
                keywords: result.keywords
              } 
            } }
          );
        } catch (err) {
          console.error('Error parsing Python result:', err);
          await Analysis.findOneAndUpdate(
            { analysisId },
            {
              status: 'failed',
              error: 'Failed to parse analysis result'
            }
          );
        }
      } else {
        await Analysis.findOneAndUpdate(
          { analysisId },
          {
            status: 'failed',
            error: `Python process exited with code ${code}`
          }
        );
      }
    });

    pythonProcess.on('error', async (error) => {
      console.error('Failed to start Python process:', error);
      await Analysis.findOneAndUpdate(
        { analysisId },
        {
          status: 'failed',
          error: 'Failed to start analysis process'
        }
      );
    });

    res.status(200).json({ message: 'Analysis started', analysisId });

  } catch (error) {
    console.error('Video analysis error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

  // Get analysis status endpoint
  app.get('/api/analysis-status/:analysisId', async (req, res) => {
    try {
      const { analysisId } = req.params;
      
      const analysis = await Analysis.findOne({ analysisId });
      
      if (!analysis) {
        return res.status(404).json({ message: 'Analysis not found' });
      }
      
      res.json({
        status: analysis.status,
        currentStep: analysis.currentStep,
        progress: analysis.progress,
        result: analysis.status === 'completed' ? analysis.result : null,
        error: analysis.error
      });
    } catch (error) {
      console.error('Get analysis status error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get user video history
  app.get('/api/user/videos/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await User.findOne({ email: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ videos: user.videos });
    } catch (error) {
      console.error('Get user videos error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


app.post("/api/whatsapp-track", (req, res) => {
  const { video_id, phone_number } = req.body;
  let data = [];

  if (fs.existsSync("tracking_data.json")) {
    data = JSON.parse(fs.readFileSync("tracking_data.json"));
  }

  data.push({ video_id, phone_number });
  fs.writeFileSync("tracking_data.json", JSON.stringify(data, null, 2));

  // Spawn tracker.py only once (optional: check if already running)
  const python = spawn("python", ["tracker.py"]);

  python.stdout.on("data", (data) => {
    console.log(`Python Output: ${data.toString()}`);
  });

  python.stderr.on("data", (data) => {
    console.error(`Python Error: ${data.toString()}`);
  });

  python.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });

  res.json({ message: "Tracking added and tracker started." });
});


// YouTube Video Stats
app.get("/api/youtube-analysis", async (req, res) => {
  const { video_id } = req.query;
  if (!video_id) return res.status(400).json({ error: "Video ID is required" });

  const YOUTUBE_API_KEY = "AIzaSyCPpFkdFzt9A0Jb7J3ioUvc8su0Wxw-3i8"; // ⛔ Replace with your key
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${video_id}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({ error: "Video not found" });
    }

    const stats = data.items[0].statistics;
    const title = data.items[0].snippet.title;

    res.json({
      views: stats.viewCount,
      likes: stats.likeCount,
      shares: stats.commentCount,
      title
    });
  } catch (error) {
    res.status(500).json({ error: "YouTube API error" });
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}); 
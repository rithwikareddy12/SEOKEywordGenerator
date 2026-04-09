import sys
import os
import time
import whisper
from pymongo import MongoClient
import subprocess
from transformers import T5ForConditionalGeneration, T5Tokenizer
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from summa import summarizer
from yake import KeywordExtractor
from dotenv import load_dotenv

# Load environment variables (for MongoDB URI)
load_dotenv()

# Download required NLTK resources if missing
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)

# Connect to MongoDB Atlas
MONGO_URI = os.getenv("MONGO_URI", "mongodb_URL/videoanalysis")
client = MongoClient(MONGO_URI)
db = client['videoanalysis']
analysis_collection = db['analyses']
users_collection = db['users']

# print("step1")

def update_analysis_status(analysis_id, status, step=None, progress=None, result=None, error=None):
    update_data = {'status': status}
    if step: update_data['currentStep'] = step
    if progress: update_data['progress'] = progress
    if result: update_data['result'] = result
    if error: update_data['error'] = error
    try:
        analysis_collection.update_one({'analysisId': analysis_id}, {'$set': update_data})
    except Exception as e:
        print(f"Error updating analysis status: {e}")

def extract_audio(video_path, output_audio_path="temp_audio.mp3"):
    try:
        command = f"ffmpeg -i \"{video_path}\" -q:a 0 -map a \"{output_audio_path}\" -y"
        subprocess.run(command, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        # print("Audio extracting..")
        return output_audio_path
    except Exception as e:
        print(f"Error extracting audio: {e}")
        raise e

def transcribe_audio(audio_path):
    try:
        model = whisper.load_model("base")
        result = model.transcribe(audio_path)
        # print("Transcription complete.")
        return result["text"]
    except Exception as e:
        print(f"Error in transcribing audio: {e}")
        return ""

def preprocess_text(text):
    # print("Preprocessing text..")
    text = text.lower()
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word.isalpha() and word not in stop_words]
    return ' '.join(tokens)

def generate_summary(text, ratio=0.2):
    return summarizer.summarize(text, ratio=ratio)

def extract_keywords_yake(text, num_keywords=10):
    kw_extractor = KeywordExtractor(lan="en", n=2, dedupLim=0.9, dedupFunc='seqm', windowsSize=1)
    keywords = kw_extractor.extract_keywords(text)
    return [kw[0] for kw in keywords[:num_keywords]]

def generate_title_with_t5(text):
    tokenizer = T5Tokenizer.from_pretrained("t5-base", legacy=False)
    model = T5ForConditionalGeneration.from_pretrained("t5-small")
    input_text = "summarize: " + text[:500]
    input_ids = tokenizer.encode(input_text, return_tensors="pt", max_length=512, truncation=True)
    output = model.generate(input_ids, max_length=50, num_beams=4, no_repeat_ngram_size=2, early_stopping=True)
    return tokenizer.decode(output[0], skip_special_tokens=True)

def main(video_path, analysis_id):
    try:
        temp_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'temp')
        os.makedirs(temp_dir, exist_ok=True)

        update_analysis_status(analysis_id, 'processing', 'Extracting audio from video', 20)
        audio_path = os.path.join(temp_dir, f"{analysis_id}.wav")
        extract_audio(video_path, audio_path)

        update_analysis_status(analysis_id, 'processing', 'Transcribing audio to text', 40)
        transcript = transcribe_audio(audio_path)
        if len(transcript.split()) < 10:
            transcript = "This is a sample video transcript for demonstration purposes. The speech recognition couldn't properly detect speech in this video."

        update_analysis_status(analysis_id, 'processing', 'Preprocessing text data', 60)
        processed_text = preprocess_text(transcript)

        update_analysis_status(analysis_id, 'processing', 'Generating video summary', 70)
        summary = generate_summary(transcript)
        if len(summary.split()) < 5:
            summary = ' '.join(transcript.split('.')[:3]) + '.'

        update_analysis_status(analysis_id, 'processing', 'Extracting keywords and hashtags', 80)
        keywords = extract_keywords_yake(processed_text)

        update_analysis_status(analysis_id, 'processing', 'Generating suggested title', 90)
        title = generate_title_with_t5(transcript)

        result = {
            'title': title,
            'transcript': transcript,
            'summary': summary,
            'keywords': keywords
        }
        update_analysis_status(analysis_id, 'completed', 'Analysis completed', 100, result)

        # Safely get user info from DB
        analysis = analysis_collection.find_one({'analysisId': analysis_id})
        if not analysis:
            print(f"No analysis document found for ID: {analysis_id}")
            return

        user_id = analysis.get('userId')
        if user_id:
            users_collection.update_one(
                {'email': user_id},
                {'$push': {
                    'videos': {
                        'videoId': analysis_id,
                        'title': title,
                        'uploadDate': time.time(),
                        'transcript': transcript,
                        'summary': summary,
                        'keywords': keywords
                    }
                }}
            )

        # Clean up
        os.remove(audio_path)
        if os.path.exists(video_path):
            os.remove(video_path)

    except Exception as e:
        error_message = str(e)
        print(f"Error in processing: {error_message}")
        update_analysis_status(analysis_id, 'failed', error=error_message)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python video_analyzer.py <video_path> <analysis_id>")
        sys.exit(1)

    video_path = sys.argv[1]
    analysis_id = sys.argv[2]
    main(video_path, analysis_id)

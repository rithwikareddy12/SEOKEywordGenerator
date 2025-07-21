import json
import time
import requests
import schedule
import pywhatkit as kit

API_KEY = "AIzaSyCPpFkdFzt9A0Jb7J3ioUvc8su0Wxw-3i8"
TRACKING_FILE = "tracking_data.json"
MILESTONES = [10000,100000,1000000]
def get_video_stats(video_id):
    url = f"https://www.googleapis.com/youtube/v3/videos?part=statistics&id={video_id}&key={API_KEY}"
    response = requests.get(url).json()
    try:
        stats = response['items'][0]['statistics']
        return int(stats.get('viewCount', 0)), int(stats.get('likeCount', 0))
    except:
        return 0, 0

def check_videos():
    try:
        with open(TRACKING_FILE) as f:
            data = json.load(f)
    except:
        data = []

    for entry in data:
        views, _ = get_video_stats(entry["video_id"])
        entry.setdefault("notified_milestones", [])
        for milestone in MILESTONES:
            if views >= milestone and milestone not in entry["notified_milestones"]:
                msg = f"🎉 Your video https://youtu.be/{entry['video_id']} crossed {milestone:,} views!"
                try:
                    kit.sendwhatmsg_instantly(entry["phone_number"], msg, 15, True)
                    entry["notified_milestones"].append(milestone)
                except Exception as e:
                    print("WhatsApp error:", e)
    with open(TRACKING_FILE, "w") as f:
        json.dump(data, f, indent=2)

schedule.every(1).minutes.do(check_videos)
print("Tracker running...")
while True:
    schedule.run_pending()
    time.sleep(1)


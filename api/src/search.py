import os
from googleapiclient.discovery import build

API_KEY = os.getenv('API_KEY') or 'AIzaSyCAqhfX-f4XomY12osDKETar410n8OJgLc'
YOUTUBE_API_SERVICE_NAME = 'youtube'
YOUTUBE_API_VERSION = 'v3'

def search_video(title):
  try: 
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

    response = youtube.search().list(
      q=title,
      part='id,snippet',
      maxResults=20
    ).execute()

    videos = []
    for result in response.get('items', []):
      if result['id']['kind'] == 'youtube#video':

        videoId = result['id']['videoId']
        title = result['snippet']['title']
        description = result['snippet']['description'][0:30]
        image = result['snippet']['thumbnails']['default']
        
        videos.append({
          "id": videoId, 
          "title": title,
          "description": description,
          "thumbnail": image
        })

    return videos

  except Exception as e:
    print('An error has occurred: {}'.format(e))
    return {"error": e}
import os
import requests
import openai
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

openai.api_key = OPENAI_API_KEY

app = Flask(__name__)

GENRE_MAP = {
    "action": 28,
    "comedy": 35,
    "drama": 18,
    "fantasy": 14,
    "horror": 27,
    "romance": 10749,
    "sci-fi": 878,
    "thriller": 53
}

@app.route('/recommend', methods=['POST'])
def recommend_movies():
    data = request.json
    user_input = data.get('preferences', '')
    
    ai_response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Extract movie genres or preferences from this input: '{user_input}'",
        max_tokens = 50,
    )
    extracted_preferences = ai_response['choices'][0]['text'].strip()
    
    genre_ids = []
    for genre in GENRE_MAP.keys():
        if genre in extracted_preferences.lower():
            genre_ids.append(GENRE_MAP[genre])
            
    if not genre_ids:
        return jsonify({"error": "No valid genres detected"}), 400
    
    genre_string = ','.join(map(str, genre_ids))
    tmdb_url = f"https://api.themoviedb.org/3/discover/movie?api_key={TMDB_API_KEY}&with_genres={genre_string}&sort_by=popularity.desc"
    tmdb_response = requests.get(tmdb_url)
    
    if tmdb_response.status_code == 200:
        movies = tmdb_response.json().get('results', [])[:5]
        movie_list = "\n".join([f"{movie['title']} ({movie['release_date'][:4]})" for movie in movies])
        
        chat_response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"Create a friendly chatbot message with these movie recommendations:\n{movie_list}",
            max_tokens=100
        )
        formatted_reponse = chat_response['choices'][0]['text'].strip()
        
        return jsonify({"response": formatted_reponse})
    else:
        return jsonify({"error": "TMDB API Error."}), 500
    
if __name__ == '__main__':
    app.run(debug=True)



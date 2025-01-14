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


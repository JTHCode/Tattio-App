from flask import Flask, request, jsonify, send_from_directory, url_for, abort
from flask_cors import CORS
import os, pathlib, time
from PIL import Image
import requests
from dotenv import load_dotenv
import replicate
from pathlib import Path
from prompt_creation import create_prompt

load_dotenv()
MODEL = "black-forest-labs/flux-schnell"

app = Flask(__name__)
CORS(app)  # We'll use environment variable for origins

### Path setup for generated tattoos
THIS_FILE = Path(__file__).resolve()
PROJECT_ROOT = THIS_FILE.parents[2]          # Root project directory
GEN_DIR = PROJECT_ROOT / "generated_tattoos"
GEN_DIR.mkdir(exist_ok=True)

print(f"[Tattio] PROJECT_ROOT = {PROJECT_ROOT}")
print(f"[Tattio] GEN_DIR      = {GEN_DIR}")

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200

# ... rest of your routes and functions ...

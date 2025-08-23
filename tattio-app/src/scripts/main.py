
from flask import Flask, request, jsonify, send_from_directory, url_for, abort
from flask_cors import CORS
import os, pathlib, time
from PIL import Image
import requests
from dotenv import load_dotenv
import replicate
from pathlib import Path
from werkzeug.middleware.proxy_fix import ProxyFix
from urllib.parse import urljoin

load_dotenv()
MODEL = "black-forest-labs/flux-schnell"

app = Flask(__name__)
# CORS allowlist for both domains and localhost
cors_origins = os.environ.get("CORS_ORIGIN")
if cors_origins:
    origins = [o.strip() for o in cors_origins.split(",") if o.strip()]
else:
    origins = ["http://localhost:3000", "https://www.tattio.io", "https://tattio.io"]
CORS(app, resources={r"/*": {"origins": origins, "methods": ["GET", "POST", "OPTIONS"], "supports_credentials": False}})

# Ensure correct scheme/host behind Render's proxy
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)


# Health check endpoint for both / and /health
@app.route('/')
@app.route('/health')
def health_check():
    return jsonify({"status": "healthy"}), 200


# Unified /generate endpoint with preflight and absolute URLs
@app.route('/generate', methods=['POST', 'OPTIONS'])
def generate_tattoo():
    if request.method == 'OPTIONS':
        return ('', 204)

    if not os.getenv("REPLICATE_API_TOKEN"):
        return jsonify({"success": False, "error": "Missing REPLICATE_API_TOKEN"}), 500

    data = request.get_json(force=True) or {}
    # ...existing logic...
    styles = data.get('styles', {})
    print(f'STYLES: {styles}')
    prompt = data.get('prompt', '')
    size = data.get('size', 'M')
    body_part = data.get('bodyPart', 'forearm')
    advanced_options = data.get('parameters', {})
    color = data.get("isColorEnabled", False)

    # formatted_prompt = create_prompt(styles, prompt, size, body_part, advanced_options, color)
    formatted_prompt = "Create a tattoo design that combines the following styles and criteria:\n" + str(data)
    print(f'Formatted Prompt: {formatted_prompt}')

    payload = {
        "prompt": formatted_prompt,
        "aspect_ratio": bodypart_to_ratio(body_part),
        "megapixels": '1',
        "num_inference_steps": 4,
        "num_outputs": 1,
        "seed": 1121,
        "go_fast": False,
        "output_format": "webp",
        "output_quality": 90,
    }

    try:
        out = replicate.run(MODEL, input=payload)
        if not out:
            return jsonify({"success": False, "error": "Empty output from model"}), 502

        ts = int(time.time())
        count = len(list(GEN_DIR.glob("flux_output_test_*.webp"))) + 1
        base = f"flux_output_test_{count:03d}_{ts}"
        webp_path = GEN_DIR / f"{base}.webp"
        png_path  = GEN_DIR / f"{base}.png"

        first = out[0]
        if isinstance(first, (bytes, bytearray)):
            data = first
        elif hasattr(first, "read"):
            data = first.read()
        elif isinstance(first, str) and first.startswith("http"):
            r = requests.get(first, timeout=60)
            r.raise_for_status()
            data = r.content
        else:
            return jsonify({"success": False, "error": f"Unexpected output type: {type(first)}"}), 502

        webp_path.parent.mkdir(parents=True, exist_ok=True)
        with open(webp_path, "wb") as f:
            f.write(data)

        # Save PNG version for download
        with Image.open(webp_path) as img:
            img.save(png_path, "PNG")

        # Return absolute URLs for frontend
        image_path = url_for("get_image", filename=webp_path.name)
        download_path = url_for("download_image", filename=webp_path.name)
        base = request.url_root
        image_url = urljoin(base, image_path.lstrip('/'))
        download_url = urljoin(base, download_path.lstrip('/'))

        return jsonify({
            "success": True,
            "imageUrl": image_url,
            "downloadUrl": download_url,
            "prompt": formatted_prompt,
            "aspect_ratio": payload["aspect_ratio"],
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.after_request
def after_request(response):
    # Log the response
    print(f"Response status: {response.status}")
    print(f"Response headers: {dict(response.headers)}")
    return response


### Path setup for generated tattoos
THIS_FILE = Path(__file__).resolve()
PROJECT_ROOT = THIS_FILE.parents[2]          # ...\tattio-app
GEN_DIR = PROJECT_ROOT / "generated_tattoos"
GEN_DIR.mkdir(exist_ok=True)

print(f"[Tattio] PROJECT_ROOT = {PROJECT_ROOT}")
print(f"[Tattio] GEN_DIR      = {GEN_DIR}")


def bodypart_to_ratio(body_part: str) -> str:
    """
    Map a body_part string (e.g., 'left-forearm') to a FLUX aspect ratio.
    Returns a string like '3:4', '4:3', or '1:1'.
    """

    bp = (body_part or "").lower()
    
    if bp.startswith("left-") or bp.startswith("right-"):
        bp = bp.split("-", 1)[1]

    # portrait-oriented limbs
    portrait_parts = {"foot", "ankle", "lowerleg", "knee", "thigh",
                      "hand", "wrist", "forearm", "elbow", "upperarm"}
    # broader / landscape torso areas
    landscape_parts = {"shoulder", "chest", "stomach", "back"}

    if bp in portrait_parts:
        return "3:4" 
    elif bp in landscape_parts:
        return "4:3"
    else:
        return "1:1"

if __name__ == '__main__':
    # For local development
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)

@app.route("/images/<path:filename>", methods=["GET"])
def get_image(filename):
    path = GEN_DIR / filename
    if not path.exists():
        abort(404)
    return send_from_directory(str(GEN_DIR), filename)

@app.route('/download/<path:filename>', methods=["GET"])
def download_image(filename):
    png_filename = filename.rsplit('.', 1)[0] + '.png'
    path = GEN_DIR / png_filename
    if not path.exists():
        abort(404)
    return send_from_directory(str(GEN_DIR), png_filename, as_attachment=True)



if __name__ == "__main__":
    try:
        print("Starting Flask server...")
        print("Checking required packages...")
        print("All required packages found")
        # Expose on 0.0.0.0 if testing from another device on LAN
        app.run(host="127.0.0.1", port=5000, debug=True)
    except ImportError as e:
        print(f"Error: Missing required package - {str(e)}")
        print("Please run: pip install flask flask-cors python-dotenv replicate")
        input("Press Enter to exit...")
    except Exception as e:
        print(f"Error starting server: {str(e)}")
        input("Press Enter to exit...")
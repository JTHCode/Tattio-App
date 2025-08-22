import os, sys, pathlib
from dotenv import load_dotenv
import replicate

load_dotenv()
MODEL = "black-forest-labs/flux-schnell"

input_preview = {
  "aspect_ratio": "3:4",
  "megapixels": '1',
  "num_inference_steps": 4,
  "num_outputs": 1,
  "seed": 1121,
  "go_fast": False,
  "output_format": "webp",
  "output_quality": 90
}

# Download-quality
input_download = input_preview.copy()
input_download["output_format"] = "png"

def run_flux(prompt, input_params=input_preview):
    out = replicate.run(
        MODEL,
        input= {
            **input_params,
            "prompt": prompt
        }
    )
    
    out_dir = pathlib.Path("generated_tattoos"); out_dir.mkdir(exist_ok=True)
    path = out_dir / "flux_output_test6.webp"
    with open(path, "wb") as f:
        f.write(out[0].read())
    print(f"Saved: {path.resolve()}")
    
test_prompt = "Design a tattoo that depicts Skateboard melting and dripping. The tattoo has a strong Psychedelic tattoo style featuring vivid neon gradients, warped geometry, trippy/fractal motifs, flowing forms, high-impact color with a strong New School influence (exaggerated proportions and cartoon energy; thick outlines with smooth blends, saturated colors, playful perspective) and a moderate Surrealism influence (dreamlike juxtapositions and impossible scenes; consistent lighting, smooth shading, clear focal point). Centered on a flat canvas with plain neutral background. Composition shaped for placement on the stomach, landscape, balanced layout with generous negative space, in black and white. Scale: large. Detailing: high contrast with deep blacks and bright highlights for bold readability, medium, style-typical outlines balanced for readability, smooth shading that adds natural depth and form. Entire design fully in frame, no cropping, no elements cut off, consistent margins. Avoid blurry lines, fuzzy edges, washed-out blacks, low resolution, body, skin, arms, legs, hands, text, watermark, logos, frame, border, busy background, photographic skin texture, muted colors, symmetry that reduces flow, dull low-saturation colors, stiff static poses, literal mundane scenes, flat or uniform lighting."
    
if __name__ == "__main__":
    if not os.getenv("REPLICATE_API_TOKEN"):
        sys.exit("Missing REPLICATE_API_TOKEN")
    run_flux(test_prompt)
    
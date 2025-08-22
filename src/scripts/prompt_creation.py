"""
This module formats and translates raw JSON data into a structured prompt for tattoo design generations.
"""


PARAMETER_TEXT = {
    "complexity": {
        0: "minimal detail with large, readable forms and a clean silhouette",
        1: "balanced detail: clear primary shapes with selective texture",
        2: "intricate micro-detail and fine texture without visual clutter"
    },
    "contrast": {
        0: "soft contrast with gentle midtones; avoid crushed blacks",
        1: "strong contrast with solid blacks and clean highlights while preserving midtones",
        2: "high contrast with deep blacks and bright highlights for bold readability"
    },
    "shading": {
        0: "subtle shading with mostly flat fills and light gradients",
        1: "smooth shading that adds natural depth and form",
        2: "rich gradients and realistic depth with pronounced light-to-shadow transitions"
    },
    "lineThickness": {
        0: "thin, precise linework (fineline feel) emphasizing delicacy",
        1: "medium, style-typical outlines balanced for readability",
        2: "bold, heavy outlines with confident strokes for strong graphic impact"
    },
    "colorComplexity": {
        0: "minimal palette: monochrome with one accent color",
        1: "balanced palette: two to three accent colors",
        2: "rich palette: three to five coordinated accent colors"
    }
}

def create_prompt(styles, prompt, size, body_part, parameters, color_enabled):
    """Creates a formatted prompt for the Flux model based on user inputs."""
    base_prompt = "Create a professional tattoo design with these specifications:\n\n"
    
    # Add selected styles
    style_text = []
    for style, is_selected in styles.items():
        if is_selected:
            style_text.append(style)
    
    if style_text:
        base_prompt += "Style: " + ", ".join(style_text) + "\n"
    
    # Add user's prompt
    if prompt:
        base_prompt += f"Subject: {prompt}\n"
        
    # Add size/placement context  
    base_prompt += f"Size/Placement: {size} size design for {body_part}\n"
    
    # Add parameter specifications
    param_details = []
    for param, value in parameters.items():
        if param in PARAMETER_TEXT and value in PARAMETER_TEXT[param]:
            param_details.append(PARAMETER_TEXT[param][value])
            
    if param_details:
        base_prompt += "\nTechnical specifications:\n- " + "\n- ".join(param_details)
        
    # Add color preference
    if color_enabled:
        base_prompt += "\n\nUse color in the design."
    else:
        base_prompt += "\n\nCreate in black and grey only."
        
    return base_prompt

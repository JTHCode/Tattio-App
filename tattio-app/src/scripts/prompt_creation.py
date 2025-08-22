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
    },
    "colorRange": {
        0: "muted, desaturated tones within a narrow color gamut",
        1: "balanced saturation and natural tones within a moderate gamut",
        2: "vivid, high-saturation colors across a wide gamut"
    }
}


STYLE_MAP = {
    "Abstract": "non-representational shapes and dynamic composition; bold geometry or gestural marks; clear silhouette with readable negative space",
    "American Traditional": "bold black outlines, simplified forms, limited classic palette (red/green/yellow/black), strong contrast and high readability",
    "Anime": "crisp cel-shaded line art, expressive faces with large eyes, clean flats with selective gradients, dynamic poses and clear silhouette",
    "Biomechanical": "fusion of organic forms and machinery—layered plates, pipes, and cables integrated with anatomy; deep shading and high contrast",
    "Blackwork": "heavy black fills and graphic shapes; solid blacks with clean edges, strong contrast, minimal or no color",
    "Fine Line": "thin, precise outlines with delicate detail; minimal shading, airy negative space, and subtle contrast",
    "Holographic": "iridescent, prism-like gradients with glossy highlights; smooth color transitions suggesting reflective foil",
    "Lettering": "typography-focused design with clean kerning and baselines; consistent stroke weight, high readability, balanced flourishes",
    "Minimalist": "reduced forms and simple geometry; sparse detail, ample negative space, thin-to-medium lines for clarity",
    "Negative Space": "uses untouched areas as primary shapes; forms are carved by leaving regions unfilled; maintain crisp boundaries",
    "New School": "exaggerated proportions and cartoon energy; thick outlines with smooth blends, saturated colors, playful perspective",
    "Psychedelic": "vivid neon gradients, warped geometry, trippy/fractal motifs, flowing forms, high-impact color",
    "Realism": "lifelike texture and proportions; smooth tonal transitions, subtle outlines, natural light and believable depth",
    "Sketch": "pencil-like linework with visible construction lines and hatching; loose, dynamic strokes with selective shading",
    "Surrealism": "dreamlike juxtapositions and impossible scenes; consistent lighting, smooth shading, clear focal point",
    "Traditional": "classic bold outlines, simplified motifs, limited palette, strong contrast, high readability",
    "Trash Polka": "collage of photoreal and graphic elements in black and red; dynamic splashes, stamps, and bold contrast",
    "Tribal": "bold black patterns with symmetry and tapering curves; clean solid fills, strong negative space, minimal shading",
    "Watercolor": "soft paint-like washes with bleeding edges and splatters over a clear silhouette; minimal outlines, airy feel",
    "Japanese": "bold outlines and flat color fields with controlled gradients; iconic motifs like waves, koi, and dragons; planned flow and clear negative space"
}

STYLE_WEIGHT_MAP = {
    0: 'very subtle',
    1: 'subtle',
    2: 'moderate',
    3: 'strong',
    4: 'very strong',
}


SIZE_MAP = {
    "S": "small",
    "M": "medium",
    "L": "large"
}


## _______ Negative Prompt Components _______ ##

CORE_NEG = [
    "blurry lines",
    "fuzzy edges",
    "washed-out blacks",
    "low resolution",
    "body, skin, arms, legs, hands",
    "text",
    "watermark",
    "logos",
    "frame",
    "border",
    "busy background",
    "photographic skin texture"
]

STYLE_AVOID = {
    "Abstract": [
        "overly literal subject matter",
        "realistic shading or lifelike texture"
    ],
    "American Traditional": [
        "thin inconsistent outlines",
        "overly complex micro-detail"
    ],
    "Anime": [
        "painterly or blurred shading",
        "overly realistic facial proportions"
    ],
    "Biomechanical": [
        "cartoonish outlines",
        "flat graphic shapes without depth"
    ],
    "Blackwork": [
        "color gradients",
        "thin or broken linework"
    ],
    "Fine Line": [
        "bold heavy outlines",
        "dense solid black fills"
    ],
    "Holographic": [
        "matte flat colors",
        "dirty or muted tones"
    ],
    "Lettering": [
        "distorted letterforms",
        "overly decorative flourishes that reduce readability"
    ],
    "Minimalist": [
        "excessive detail",
        "cluttered composition"
    ],
    "Negative Space": [
        "filled-in backgrounds",
        "clutter that obscures the empty shapes"
    ],
    "New School": [
        "dull low-saturation colors",
        "stiff static poses"
    ],
    "Psychedelic": [
        "muted colors",
        "symmetry that reduces flow"
    ],
    "Realism": [
        "cartoonish proportions",
        "thick graphic outlines"
    ],
    "Sketch": [
        "polished smooth shading",
        "solid filled backgrounds"
    ],
    "Surrealism": [
        "literal mundane scenes",
        "flat or uniform lighting"
    ],
    "Traditional": [
        "thin inconsistent outlines",
        "soft pastel color palette"
    ],
    "Trash Polka": [
        "soft watercolor washes",
        "limited to only one or two compositional elements"
    ],
    "Tribal": [
        "color fills",
        "thin delicate linework"
    ],
    "Watercolor": [
        "heavy black fills",
        "hard edged outlines around every element"
    ],
    "Japanese": [
        "noisy textures",
        "unclear negative space flow"
    ]
}


def body_part_formatting(body_part):
    if not body_part or any(k in body_part for k in ["arm", "thigh", "leg"]):
        orientation = "portrait"
        framing = "centered subject with breathable margins for the limb"
    elif any(k in body_part for k in ["back", "chest", "shoulder", 'stomach']):
        orientation = "landscape"
        framing = "balanced layout with generous negative space"
    else:
        orientation = "portrait"
        framing = "clean silhouette with clear negative space"
    return orientation, framing

def prepare_params(parameters):
        return [[p, w//35] for p, w in sorted(parameters, key=lambda x: x[1], reverse=True) if w is not False]
    
def prepare_styles(styles):
    return [[s, w//22] for s, w in sorted(styles, key=lambda x: x[1], reverse=True) if w is not False]
    
def create_negative_tail(styles):
    constraints = CORE_NEG[:]
    for s in styles:
        constraints.extend(STYLE_AVOID.get(s[0], []))
    
    items = []
    for cons in constraints:
        if cons not in items:
            items.append(cons)
    return 'Avoid ' + ', '.join(items) + '.'
        

    
def create_prompt(styles, prompt, size, body_part, advanced_options, color):
    output = []
    
    # Prepare color
    color_text = 'with color' if color else 'in black and white'
    
    # Prepare styles
    styles = prepare_styles([(s['alt'], s['weight']) for s in styles])
    primary_style = styles[0][0]
    prim_style_weight = STYLE_WEIGHT_MAP.get(styles[0][1], 'moderate')
    style_text  = f"{prim_style_weight} {primary_style} tattoo style featuring {STYLE_MAP.get(primary_style, 'a unique design')}"
    
    if len(styles) > 1:
        sec_style_weight = STYLE_WEIGHT_MAP.get(styles[1][1], 'subtle')
        style_text += f' with a {sec_style_weight} {styles[1][0]} influence ({STYLE_MAP.get(styles[1][0])})'
        
        if len(styles) > 2:
            third_style_weight = STYLE_WEIGHT_MAP.get(styles[2][1], 'subtle')
            style_text += f' and a {third_style_weight} {styles[2][0]} influence ({STYLE_MAP.get(styles[2][0])})'
            
    
    # Prepare parameters
    advanced_options = advanced_options.copy()
    if not color:
        advanced_options.pop('colorRange', None)
        advanced_options.pop('colorComplexity', None)
    params = prepare_params(advanced_options.items())
    params_text = ', '.join([f"{PARAMETER_TEXT[p][w]}" for p, w in params if w is not False])
    
    # Body part formatting
    orientation, framing = body_part_formatting(body_part)
    
    tail = create_negative_tail(styles)
    
    # Constructing the prompt
    output.append(f'Design a tattoo that depicts {prompt}.')
    output.append(f"The tattoo has a {style_text}.")
    output.append("Centered on a flat canvas with plain neutral background.")
    output.append(f'Composition shaped for placement on the {body_part}, {orientation}, {framing}, {color_text}.')
    output.append(f"Scale: {SIZE_MAP.get(size, 'medium')}.")
    if params: output.append(f"Detailing: {params_text}.")
    output.append("Entire design fully in frame, no cropping, no elements cut off, consistent margins.")
    output.append(tail)
    
    return ' '.join(output)
    


Color Pallet:
    60:rgb(37, 7, 77)
    30:rgb(102, 42, 181);
    10: #fbc638
    Main Text: #A786E4
    Sub Text: #6b5497




### To Do Ideas:
-Style color button better
-Change bg color of style button container
-Create transition animation between steps
-Create on page load animation
-Create 'start' page
-Create info icons
-Create favicon



### 1. Project Overview

* **Name**: Tattio
* **One-liner**: A web-based AI tool that generates visual tattoo mockups based on user prompts and sample tattoos.
* **Goal**: Let users explore and create personalized tattoo designs using AI, with intuitive controls over style, detail, and content.
* **Target Audience**: Tattoo enthusiasts, artists, designers, and individuals planning a tattoo.

---

### 2. Core Functionality

* Accept user-written text prompts
* Accept optional sample tattoo image uploads
* Provide simple options:
  * Prompt
  * Color (yes/no)
  * Tattoo size
  * Body location
* Provide weighted style sliders for more advanced customization:
  * Complexity/Detail
  * Contrast
  * Styles (Traditional, Geometric, Realism, etc.)
  * Shading Intensity
  * Line Thickness
  * Color Complexity - use of gradient blending vs. flat fills
  * Color Range - amount of different colors used
* Generate and display a unique tattoo mockup
* Allow image download or save
* Allow user to submit/prompt suggested edits for generated image

---

### 3. User Inputs & Controls

* **Text Input**: Prompt box
* **Image Upload**: Optional reference tattoo image
* **Toggles**:

  * Color vs. black and gray
  * Orientation (portrait/landscape)
* **Sliders** (0–10 scale):

  * Complexity/Detail
  * Contrast
  * Style sliders (Traditional, Realism, Geometric, etc.)
* **Dropdown**:

  * Tattoo Size: Small, Medium, Large
  * Body Location (Possibly using a clickable model for selection)

---

### 4. AI Integration

* **Model**: Stable Diffusion (via Replicate API or local setup)
* **Method**:
  * Text-to-image
  * Optional: Image-to-image with ControlNet or img2img
* **Output**:
  * Save image locally or return as base64
  * Send URL or image preview to frontend

---

### 5. Tech Stack

* **Frontend**: HTML, CSS, JavaScript, React
* **Backend**: Python (FlaskI), React
* **AI Host**: Replicate (Stable Diffusion model)
* **Hosting Options**:

  * Frontend: Netlify, Vercel, or Replit
  * Backend: Replit, Render
* **Storage**: Local directory for images (or Firebase/Supabase for scale)

---

### 6. User Flow

1. User visits Tattio homepage
2. Enters prompt, sets sliders and options
4. Clicks "Generate Tattoo"
5. Backend processes request, AI generates image
6. Frontend displays image result with options to download, retry, or adjust settings

---

### 7. Testing Plan

* Test backend API routes with Postman
* Validate JSON responses
* Check frontend responsiveness on desktop and mobile
* Test various user input combinations
* Handle invalid uploads, missing inputs, long prompts

---

### 8. Stretch Features (Optional for Later Phases)

* User accounts to save design history
* Style suggestion AI based on uploaded image
* Gallery of trending tattoos
* LoRA or custom style model selector
* Feedback/rating system

---

### 9. Privacy & Safety Considerations

* Don’t store user images unless needed for features
* Filter inappropriate prompts or images
* Add AI usage disclosure and terms of use

---

### 10. Development Milestones

1. Set up backend and Replicate API connection
2. Build frontend form and preview layout
3. Connect frontend inputs to backend
4. Add sliders and input validation
5. Implement image display and download
6. Polish UI, test end-to-end flow, deploy

# AI Personality Chatbot (Gemini)

This repository contains a small FastAPI server (`main.py`) that forwards chat requests to Google's Gemini API.

## Setup (Windows PowerShell)

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Set your Gemini API key (temporary for the session):

```powershell
$env:GEMINI_API_KEY = "YOUR_KEY_HERE"
```

4. Run the server (from the project root):

```powershell
# using uvicorn
uvicorn "venv.main:app" --host 0.0.0.0 --port 8000 --reload

# or run directly (quick test)
python "venv\main.py"
```

Note: The `main.py` file currently lives in the `venv/` folder in this workspace. You may want to move it to the project root (and update imports/run commands) for a cleaner layout.

## Behavior

- If `GEMINI_API_KEY` is not set, the server will start but `/chat` will return a 500 error explaining the missing key.
- The root `/` endpoint will serve `index.html` if present either next to `main.py` or in the project root.

If you want, I can:
- Move `main.py` to the project root and update run instructions.
- Add example curl/JS client code for the frontend.

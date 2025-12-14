import os
import asyncio
import logging
from typing import List, Dict, Any, Optional

from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "AIzaSyCzLTVKBm_AmJl_CQR__IByXyvFvVqjvGc")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")  
BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
GENERATE_URL = f"{BASE_URL}/models/{GEMINI_MODEL}:generateContent"

if not GEMINI_API_KEY:
    logger.warning(
        "GEMINI_API_KEY not set. Gemini API calls will fail until you set the environment variable."
    )

app = FastAPI(title="AI Personality Chatbot (Gemini)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """
    Serve index.html (assumes it's in the same directory)
    """
    index_path = os.path.join(os.path.dirname(__file__), "index.html")
    if not os.path.exists(index_path):

        index_path = os.path.join(os.getcwd(), "index.html")

    if os.path.exists(index_path):
        return FileResponse(index_path, media_type="text/html")

    return JSONResponse({"message": "Place index.html next to main.py (or in the project root) to serve the frontend."})


def _make_contents_from_history(history: Optional[List[Dict[str, str]]], user_message: str) -> List[Dict[str, Any]]:
    """
    Convert simple history format to Gemini 'contents' format.
    Expected history item example: {"role": "user" or "model", "text": "...."}
    """
    contents = []
    if history:
        for item in history:
            role = item.get("role", "user")
            text = item.get("text", "")
            if text:
                contents.append({"role": role, "parts": [{"text": text}]})

    contents.append({"role": "user", "parts": [{"text": user_message}]})
    return contents


def _extract_text_from_response(resp_json: Dict[str, Any]) -> str:
    """
    Defensive extraction: walk the JSON and concatenate any 'text' fields found
    inside candidate/content/parts structures.
    """
    texts = []

    def walk(obj):
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == "text" and isinstance(v, str):
                    texts.append(v)
                else:
                    walk(v)
        elif isinstance(obj, list):
            for item in obj:
                walk(item)


    walk(resp_json)


    if not texts:

        for key in ("output_text", "displayText", "text"):
            if key in resp_json and isinstance(resp_json[key], str):
                texts.append(resp_json[key])

    return "\n".join(texts).strip()


@app.post("/chat")
async def chat_endpoint(payload: Dict[str, Any]):
    """
    Expects JSON:
    {
      "message": "hi",
      "history": [
         {"role": "user", "text": "previous user message"},
         {"role": "model", "text": "assistant answer"}
      ],
      "temperature": 0.2,
      "max_output_tokens": 512
    }
    """
    user_message = payload.get("message") or payload.get("prompt")
    if not user_message:
        raise HTTPException(status_code=400, detail="Please provide 'message' in the request body.")

    history = payload.get("history", None)
    temperature = payload.get("temperature", 0.2)
    max_tokens = payload.get("max_output_tokens", 512)

    contents = _make_contents_from_history(history, user_message)

    body = {
        "contents": contents,
        "temperature": temperature,
        "maxOutputTokens": max_tokens,

    }

    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY
    }

    if not GEMINI_API_KEY:

        raise HTTPException(
            status_code=500,
            detail="Server misconfiguration: GEMINI_API_KEY is not set. Set GEMINI_API_KEY to enable Gemini API requests.",
        )

    async with httpx.AsyncClient(timeout=120.0) as client:
        try:
            resp = await client.post(GENERATE_URL, json=body, headers=headers)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Request to Gemini API failed: {str(e)}")

    if resp.status_code != 200:

        try:
            err = resp.json()
        except Exception:
            err = resp.text
        raise HTTPException(status_code=500, detail={"gemini_status": resp.status_code, "error": err})

    try:
        resp_json = resp.json()
    except Exception:
        raise HTTPException(status_code=500, detail="Gemini returned non-JSON response.")

    assistant_text = _extract_text_from_response(resp_json)
    return {"reply": assistant_text, "raw": resp_json}


if __name__ == "__main__":

    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

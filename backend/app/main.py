from fastapi import FastAPI
from pydantic import BaseModel


class StylePrompt(BaseModel):
  """Payload describing the user's creative direction."""

  vision: str
  inspiration: str | None = None


app = FastAPI(
  title="Tensr API",
  version="0.1.0",
  description="API backend for the Tensr style sandbox."
)


@app.get("/health")
def health_check() -> dict[str, str]:
  """Lightweight readiness probe."""
  return {"status": "ok"}


@app.post("/style/report")
async def create_style_report(prompt: StylePrompt) -> dict[str, str]:
  """Stub endpoint that will ultimately generate a style report."""
  return {
    "message": "Style report generation is not yet implemented.",
    "received": prompt.vision
  }

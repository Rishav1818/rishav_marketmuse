from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import os
from core.orchestrator import Orchestrator
from simulation import QueryProcessor

app = FastAPI(title="MarketMuse API", description="AI-driven marketing intelligence system")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components based on environment
IS_SIMULATION = os.getenv("MARKETMUSE_SIMULATION", "false").lower() == "true"
orchestrator = Orchestrator() if not IS_SIMULATION else None
simulation_processor = QueryProcessor() if IS_SIMULATION else None

class CampaignRequest(BaseModel):
    brand_name: str
    product_category: str
    target_audience: str
    campaign_duration: str
    budget: float
    influencer_name: Optional[str] = None
    platform: Optional[str] = None
    followers: Optional[int] = None
    engagement_rate: Optional[float] = None
    categories: Optional[List[str]] = None
    target_metrics: Optional[Dict[str, Any]] = None

class QueryRequest(BaseModel):
    query: str

@app.post("/api/analyze")
async def analyze(request: Dict[str, Any]):
    """
    Unified endpoint for analyzing marketing campaigns or processing queries.
    """
    try:
        # Check if this is a campaign request or a query request
        if "query" in request:
            # This is a query request
            if IS_SIMULATION:
                result = simulation_processor.process_query(request["query"])
                return result
            else:
                result = await orchestrator.process_query(request["query"])
                return result
        else:
            # This is a campaign request
            if IS_SIMULATION:
                # Convert campaign request to a query string for simulation
                query = f"Analyze campaign for {request.get('brand_name')} in {request.get('product_category')} targeting {request.get('target_audience')} with budget {request.get('budget')}"
                result = simulation_processor.process_query(query)
                return result
            else:
                result = await orchestrator.process_campaign_request(request)
                return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/process-query")
async def process_query(request: QueryRequest):
    """
    Process a marketing query and return agent responses and summary.
    """
    try:
        if IS_SIMULATION:
            result = simulation_processor.process_query(request.query)
            return result
        else:
            result = await orchestrator.process_query(request.query)
            return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {
        "status": "healthy",
        "service": "MarketMuse API",
        "mode": "simulation" if IS_SIMULATION else "production"
    } 
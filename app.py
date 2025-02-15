from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from MultiAgent import input_city, input_interests, create_itinerary ,travel_planner # Import functions
from langchain_core.messages import HumanMessage
app = FastAPI()

origins = [
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], )

class TripRequest(BaseModel):
    city: str
    interests: List[str]

@app.post("/generate-itinerary/")
async def generate_itinerary(request: TripRequest):
    try:
        
        response = travel_planner(request.city,request.interests)


        return {
            "city": request.city,
            "interests": request.interests,
            "itinerary": response
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


import os
from typing import TypedDict, Annotated , List
from langgraph.graph import StateGraph, END
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.graph import MermaidDrawMethod
from IPython.display import display,Image
from dotenv import load_dotenv

load_dotenv()


# Loading GROQ API key
working_dir = os.path.dirname(os.path.abspath((__file__)))   
#config_data = json.load(open(f"{working_dir}/config.json"))
GROQ_API_KEY  = os.getenv("GROQ_API_KEY")
os.environ["GROQ_API_KEY"] = GROQ_API_KEY



#### Agents ####

class PlannerState(TypedDict):
    messages : Annotated[List[HumanMessage | AIMessage], "the messages in the conversation"]
    city : str
    interests : List [str] 
    itinerary : str


from langchain_groq import ChatGroq 

llm = ChatGroq (temperature=0, model_name = "llama-3.3-70b-versatile")

#result  = llm.invoke("What is Multi Ai Agent")


Itinerary_prompt = ChatPromptTemplate.from_messages(

[
    ("system", "You are helpful travel assistant. Create a day trip detailed itinerary for {city} based on the user's interests : {interests}. Provide a detailed, bulleted itinerary."),
    ("human", "Create an itinerary for my day trip."),
]
)


### Agent Functions ###

def input_city(city:str, state: PlannerState) -> PlannerState:

    return {
        **state,
        "city " : city,
        "messages": state['messages'] + [HumanMessage(content=city)]
    }

def input_interests(interests:List[str] , state: PlannerState) -> PlannerState:
    return {
        **state,
        "interests" : interests,
        "messages": state['messages'] + [HumanMessage(content=interests)]
    }

def create_itinerary(state: PlannerState) -> str:
    response = llm.invoke(Itinerary_prompt.format_messages(
        city=state["city"],
        interests=", ".join(state["interests"])
    ))
    state["itinerary"] = response.content
    state['messages'] += [AIMessage(content=response.content)]
    return response.content


### Using LangGraph to create a graph ###

workflow = StateGraph(PlannerState)

workflow.add_node("input_city", input_city)
workflow.add_node("input_interest", input_interests)
workflow.add_node("create_itinerary", create_itinerary)

workflow.set_entry_point("input_city")

workflow.add_edge("input_city", "input_interest")
workflow.add_edge("input_interest", "create_itinerary")
workflow.add_edge("create_itinerary", END)

app = workflow.compile()


###  Display graph ###


# display(

#     Image(

#         app.get_graph().draw_mermaid_png(
#             draw_method = MermaidDrawMethod.API
#         )
#     )
# )


### Running the graph ###

def travel_planner(city:str , interests:str) :
    state = {
            "messages": [],
            "city": "",
            "interests": [],
            "itinerary": "",
        }
    
    state = input_city(city,state)
    state = input_interests(interests,state)

    itinerary = create_itinerary(state)
    
    return itinerary
# user_request = "I want to plan a day trip"
# travel_planner(user_request)


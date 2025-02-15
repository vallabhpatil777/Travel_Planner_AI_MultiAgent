# Travel_Planner_AI_MultiAgent

## This project is AI travel planner web application built using Python, React, FastAPI, Langchain, LangGraph, Huggingface embeddings model and Groq API for LLM model access

### Features 

1. Used React as Frontend with axios, typescript and redux toolkit
2. Used Python for MultiAgent utility
3. Utilized Langchain and Langgraph for multiple agent state management
4. FastAPI is used for API creation which takes city and interests as request body parameters.
5. LLM model access gained through Groq API and model used is llama-3.3-70b-versatile

   
## Steps

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```


### 2. Create Virtual Environment : 

For MacOS/Linux : 
```bash
python3 -m venv venv
source venv/bin/activate
```

For Windows :
```bash
python -m venv venv
.\venv\Scripts\activate
```

### 3. Install required libraries : 
```bash
pip install -r requirements.txt
```


### 4. Setup Groq Cloud API : 

Link : https://console.groq.com/login

### 5. Create .env file into the directory : 

Copy paste your API key into the file and save it.
```bash
GROQ_API_KEY = "your_groq_api_key"
```

### 6. Run the streamlit app : 

```bash
streamlit run main.py
```


## Snapshots 

![image](https://github.com/user-attachments/assets/0f37c789-e9fd-49ff-8b83-4dfa844f5b6b)


![image](https://github.com/user-attachments/assets/411d58f4-fe2d-45b6-ab92-dc9d83cc4310)



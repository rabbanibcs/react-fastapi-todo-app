from .database import LocalSession,engine
from fastapi import FastAPI,Request,Response
from . import models
from .routers import users,jobs
from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app=FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router)
app.include_router(jobs.router)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = LocalSession()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


@app.get("/")
def index():
    return {"Home":"Welcome every body. Peace be upon you."}




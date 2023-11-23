from fastapi import FastAPI

from routers.users import router as user_router

app = FastAPI()


app.include_router(
    router=user_router,
    prefix="/user",
)
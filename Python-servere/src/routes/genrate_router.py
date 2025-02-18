from fastapi import APIRouter

router = APIRouter()

@router.get("/generate")
def generate():
    
    return {"message": "This is a basic GET endpoint"}
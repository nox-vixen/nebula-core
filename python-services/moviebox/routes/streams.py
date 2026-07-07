from fastapi import APIRouter

from ..service import moviebox_service

router = APIRouter(
    prefix="/streams",
    tags=["Streams"],
)


@router.get("/movie")
async def movie(id: str):
    return await moviebox_service.movie_streams(id)

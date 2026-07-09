from fastapi import APIRouter

from ..service import moviebox_service

router = APIRouter(
    prefix="/streams",
    tags=["Streams"],
)


@router.get("/movie")
async def movie(
    id: str,
    ref: str = "",
):
    return await moviebox_service.movie_streams(
        id,
        ref,
    )


@router.get("/episode")
async def episode(
    id: str,
    season: int,
    episode: int,
):
    return await moviebox_service.episode_streams(
        id,
        season,
        episode,
    )

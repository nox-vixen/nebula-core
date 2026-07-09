from fastapi import APIRouter

from ..service import moviebox_service

router = APIRouter(
    prefix="/streams",
    tags=["Streams"],
)


@router.get("/movie")
async def movie(
    id: str,
    providerRef: str = "",
):
    return await moviebox_service.movie_streams(
        id,
        providerRef,
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

from fastapi import APIRouter

from ..service import moviebox_service

router = APIRouter(
    prefix="/subtitles",
    tags=["Subtitles"],
)

@router.get("")
async def get_subtitles(
    id: str,
    resourceId: str,
):
    return await moviebox_service.get_subtitles(
        id,
        resourceId,
    )

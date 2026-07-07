"""
==========================================================
NebulaOS
Movie Details Route
Phase 4.3
==========================================================
"""

from fastapi import APIRouter, Query

from ..service import moviebox_service

router = APIRouter(prefix="/movie", tags=["Movie"])


@router.get("")
async def movie(
    id: str = Query(..., description="MovieBox subject id"),
):
    return await moviebox_service.details(id)

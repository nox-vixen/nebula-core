"""
==========================================================
NebulaOS
Homepage Route
Phase 4.6
==========================================================
"""

from fastapi import APIRouter, Query

from ..service import moviebox_service

router = APIRouter(
    prefix="/home",
    tags=["Home"],
)


@router.get("")
async def home(
    page: int = Query(1, ge=1),
):
    return await moviebox_service.home(page)

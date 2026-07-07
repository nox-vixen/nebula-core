"""
==========================================================
NebulaOS
MovieBox v3 Provider Adapter
Phase 4.5
==========================================================
"""

from moviebox_api.v3.http_client import MovieBoxHttpClient
from moviebox_api.v3.core import (
    Search,
    ItemDetails,
    DownloadableVideoFilesDetail,
    DownloadableCaptionFileDetails,
    Homepage,
)

__all__ = [
    "MovieBoxHttpClient",
    "Search",
    "ItemDetails",
    "DownloadableVideoFilesDetail",
    "DownloadableCaptionFileDetails",
    "Homepage",
]

"""
==========================================================
NebulaOS
File: provider.py
Purpose: MovieBox API Version Adapter
Phase: 4.2
==========================================================
"""

from moviebox_api.v2 import (
    Session,
    Homepage,
    Search,
    ItemDetails,
    TVSeriesDetails,
    DownloadableSingleFilesDetail,
    DownloadableTVSeriesFilesDetail,
)

__all__ = [
    "Session",
    "Homepage",
    "Search",
    "ItemDetails",
    "TVSeriesDetails",
    "DownloadableSingleFilesDetail",
    "DownloadableTVSeriesFilesDetail",
]

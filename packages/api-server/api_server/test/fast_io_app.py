import pydantic
from rx.subject import Subject

from api_server.fast_io import FastIO, FastIORouter

app = FastIO()
router = FastIORouter()
router_with_prefix = FastIORouter(prefix="/router_with_prefix")
router_include_with_prefix = FastIORouter()
router_both_prefix = FastIORouter(prefix="/router_both_prefix")
target = Subject()
target_with_prefix = Subject()
target_include_with_prefix = Subject()
target_both_prefix = Subject()


class ReturnVideo(pydantic.BaseModel):
    film_title: str


@router.watch("/video_rental/{film_title}/available", target)
def router_watch_availability(rental: dict):
    return {"film_title": rental["film"]}, rental


@router.post("/video_rental/return_video")
def router_post_return_video(return_video: ReturnVideo):
    target.on_next({"film": return_video.film_title, "available": True})


@router_with_prefix.watch("/video_rental/{film_title}/available", target_with_prefix)
def router_with_prefix_watch_availability(rental: dict):
    return {"film_title": rental["film"]}, rental


@router_with_prefix.post("/video_rental/return_video")
def router_with_prefix_post_return_video(return_video: ReturnVideo):
    target_with_prefix.on_next({"film": return_video.film_title, "available": True})


@router_include_with_prefix.watch(
    "/video_rental/{film_title}/available", target_include_with_prefix
)
def router_include_with_prefix_watch_availability(rental: dict):
    return {"film_title": rental["film"]}, rental


@router_include_with_prefix.post("/video_rental/return_video")
def router_include_with_prefix_post_return_video(return_video: ReturnVideo):
    target_include_with_prefix.on_next(
        {"film": return_video.film_title, "available": True}
    )


@router_both_prefix.watch("/video_rental/{film_title}/available", target_both_prefix)
def router_both_prefix_watch_availability(rental: dict):
    return {"film_title": rental["film"]}, rental


@router_both_prefix.post("/video_rental/return_video")
def router_both_prefix_post_return_video(return_video: ReturnVideo):
    target_both_prefix.on_next({"film": return_video.film_title, "available": True})


app.include_router(router)
app.include_router(router_with_prefix)
app.include_router(router_include_with_prefix, prefix="/router_include_with_prefix")
app.include_router(router_both_prefix, prefix="/include_prefix")


from utils.Color import Color

from utils.Item import Item


from fastapi import APIRouter

router = APIRouter(tags=['Streaming Controller'])

@router.get(
    "/ping/frame/{height}/{width}",
    name="Get a frame (HxW)",
    description="Returns a frame",
)
async def ping_number(number: int) -> Item:

    item = Item()
    item.name="result"
    item.price=number * 2
    item.color = Color.BLUE
    return item

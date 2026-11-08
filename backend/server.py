import asyncio
import logging
import os
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

import stripe
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Query, Request
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from pymongo import ASCENDING, IndexModel
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

PRODUCTS = [
    {
        "slug": "garden-party-walking-vest",
        "name": "The Garden Party Walking Vest",
        "category": "Walking Vests",
        "price_cents": 5800,
        "lookup_key": "garden_party_vest",
        "pattern": "Heirloom floral cotton",
        "description": "Our signature choke-free walking vest in a whimsical garden floral. Soft 100% cotton wraps the chest, not the neck, so every walk is gentle, secure and beautifully dressed.",
        "details": ["100% premium cotton, pre-washed for softness", "Choke-free chest-distribution design", "Dual D-ring security", "Handcrafted in the USA", "Machine wash cold, lay flat to dry"],
        "sizes": ["XS", "S", "M", "L"],
        "images": {"main": "/images/products/garden-party-vest-a.png", "hover": "/images/products/garden-party-vest-b.png"},
        "tags": ["best_seller"],
        "rating": 5.0,
        "reviews": 42,
    },
    {
        "slug": "scotland-yard-step-in-harness",
        "name": "The Scotland Yard Step-In Harness",
        "category": "Step-In Harnesses",
        "price_cents": 5200,
        "lookup_key": "scotland_yard_harness",
        "pattern": "Vintage navy plaid cotton",
        "description": "A dapper step-in harness in tailored navy plaid. On in seconds with a one-click closure, pressure glides across the chest and away from delicate tracheas.",
        "details": ["Step-in design — no over-the-head struggle", "Reinforced stitching at every stress point", "Choke-free chest fit", "Handcrafted in the USA", "One-click secure buckle"],
        "sizes": ["XS", "S", "M", "L"],
        "images": {"main": "/images/products/scotland-yard-harness-a.png", "hover": "/images/products/scotland-yard-harness-b.png"},
        "tags": ["best_seller"],
        "rating": 4.9,
        "reviews": 38,
    },
    {
        "slug": "daisy-chain-designer-collar",
        "name": "The Daisy Chain Designer Collar",
        "category": "Designer Collars",
        "price_cents": 3400,
        "lookup_key": "daisy_chain_collar",
        "pattern": "Sunny daisy cotton",
        "description": "A premium cotton collar scattered with sunny daisies, finished with a removable bow. Reinforced for strength, gentle on delicate necks, made to turn heads at the park.",
        "details": ["Premium cotton over a reinforced core", "Removable designer bow", "Brass-finish hardware", "Handcrafted in the USA", "Pairs with the Coastal Stripe leash"],
        "sizes": ["XS", "S", "M", "L"],
        "images": {"main": "/images/products/daisy-collar-a.png", "hover": "/images/products/daisy-collar-b.png"},
        "tags": ["best_seller"],
        "rating": 5.0,
        "reviews": 29,
    },
    {
        "slug": "coastal-stripe-leash",
        "name": "The Coastal Stripe Leash",
        "category": "Matching Leashes",
        "price_cents": 4200,
        "lookup_key": "coastal_stripe_leash",
        "pattern": "Sage & cream stripe",
        "description": "A beautifully coordinated leash in soft sage stripes with a solid brass clasp. The finishing touch to every Donna Devlin set — strong, light and lovely in the hand.",
        "details": ["5 ft length, perfectly weighted", "Solid brass swivel clasp", "Soft woven cotton ribbon", "Handcrafted in the USA", "Matches every print in the collection"],
        "sizes": ["One Size"],
        "images": {"main": "/images/products/coastal-leash-a.png", "hover": "/images/products/coastal-leash-b.png"},
        "tags": ["best_seller"],
        "rating": 4.8,
        "reviews": 19,
    },
    {
        "slug": "cherry-picnic-walking-vest",
        "name": "The Cherry Picnic Walking Vest",
        "category": "Walking Vests",
        "price_cents": 5800,
        "lookup_key": "cherry_picnic_vest",
        "pattern": "Cherry gingham cotton",
        "description": "A new-season walking vest in sweet cherry gingham. The same choke-free comfort our pups love, dressed up for picnics, patios and everything in between.",
        "details": ["100% premium cotton", "Choke-free chest-distribution design", "Dual D-ring security", "Handcrafted in the USA", "Machine wash cold"],
        "sizes": ["XS", "S", "M", "L"],
        "images": {"main": "/images/products/cherry-picnic-vest-a.png", "hover": "/images/products/cherry-picnic-vest-b.png"},
        "tags": ["new_arrival"],
        "rating": 5.0,
        "reviews": 12,
    },
    {
        "slug": "polka-wisp-step-in-harness",
        "name": "The Polka Wisp Step-In Harness",
        "category": "Step-In Harnesses",
        "price_cents": 5200,
        "lookup_key": "polka_wisp_harness",
        "pattern": "Terracotta dot cotton",
        "description": "Playful terracotta dots on warm ivory. Our newest step-in harness goes on in one motion and keeps pressure exactly where it belongs — across the chest.",
        "details": ["Step-in, one-click closure", "Choke-free chest fit", "Reinforced stitching", "Handcrafted in the USA", "Lightweight for tiny pups"],
        "sizes": ["XS", "S", "M", "L"],
        "images": {"main": "/images/products/polka-wisp-harness-a.png", "hover": "/images/products/polka-wisp-harness-b.png"},
        "tags": ["new_arrival"],
        "rating": 4.9,
        "reviews": 9,
    },
]

INDEXES = {
    "products": [IndexModel([("slug", ASCENDING)], name="slug", unique=True)],
    "enquiries": [IndexModel([("created_at", ASCENDING)], name="created_at")],
    "newsletter": [IndexModel([("email", ASCENDING)], name="email", unique=True)],
    "payment_transactions": [IndexModel([("session_id", ASCENDING)], name="session_id", unique=True)],
}

async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)

async def seed_products() -> None:
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many(PRODUCTS)
        logging.getLogger(__name__).info("Seeded %d products", len(PRODUCTS))

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------- Catalog ----------

@api_router.get("/products")
async def list_products(category: Optional[str] = None, tag: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    if tag:
        query["tags"] = tag
    return await db.products.find(query, {"_id": 0}).to_list(100)

@api_router.get("/products/{slug}")
async def get_product(slug: str):
    product = await db.products.find_one({"slug": slug}, {"_id": 0})
    if not product:
        raise HTTPException(404, "Product not found")
    return product

# ---------- Enquiries & newsletter ----------

class Enquiry(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    topic: str = Field(default="General", max_length=60)
    message: str = Field(min_length=1, max_length=3000)
    company: Optional[str] = Field(default=None, max_length=160)
    phone: Optional[str] = Field(default=None, max_length=40)

@api_router.post("/enquiries")
async def create_enquiry(enquiry: Enquiry):
    doc = enquiry.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.enquiries.insert_one(doc)
    return {"ok": True, "message": "Thank you — Donna's studio will reply within 1–2 business days."}

class NewsletterSignup(BaseModel):
    email: EmailStr

@api_router.post("/newsletter")
async def newsletter(signup: NewsletterSignup):
    await db.newsletter.update_one(
        {"email": signup.email},
        {"$setOnInsert": {"email": signup.email, "created_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"ok": True}

# ---------- Stripe checkout ----------

class CheckoutItem(BaseModel):
    slug: str
    size: str = Field(default="M", max_length=10)
    quantity: int = Field(1, ge=1, le=20)

class CheckoutRequest(BaseModel):
    items: List[CheckoutItem] = Field(min_length=1)
    origin_url: str

@api_router.post("/payments/checkout")
async def create_checkout(req: CheckoutRequest):
    stripe_key = os.environ.get("STRIPE_SECRET_KEY")
    if not stripe_key:
        raise HTTPException(503, "Checkout is not configured yet")
    stripe.api_key = stripe_key

    line_items = []
    summary = []
    total_cents = 0
    for item in req.items:
        product = await db.products.find_one({"slug": item.slug}, {"_id": 0})
        if not product:
            raise HTTPException(400, f"Unknown product: {item.slug}")
        prices = stripe.Price.list(lookup_keys=[product["lookup_key"]], active=True, limit=1).data
        if not prices:
            raise HTTPException(500, f"Price not found: {product['lookup_key']}")
        price = prices[0]
        line_items.append({"price": price.id, "quantity": item.quantity})
        total_cents += (price.unit_amount or 0) * item.quantity
        summary.append(f"{product['name']} ({item.size}) x{item.quantity}")

    session = stripe.checkout.Session.create(
        line_items=line_items,
        mode="payment",
        success_url=f"{req.origin_url}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{req.origin_url}/payment/cancel",
        automatic_tax={"enabled": True},
        billing_address_collection="required",
        metadata={"cart": "; ".join(summary)[:450]},
    )
    await db.payment_transactions.insert_one({
        "session_id": session.id,
        "items": [i.model_dump() for i in req.items],
        "amount": total_cents,
        "currency": "usd",
        "status": "initiated",
        "payment_status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"checkout_url": session.url, "session_id": session.id}

@api_router.get("/payments/status/{session_id}")
async def payment_status(session_id: str):
    record = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    if not record:
        raise HTTPException(404, "Transaction not found")
    if record.get("payment_status") != "paid" and os.environ.get("STRIPE_SECRET_KEY"):
        try:
            stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
            s = stripe.checkout.Session.retrieve(session_id)
            if s.payment_status == "paid" or s.status == "complete":
                await db.payment_transactions.update_one(
                    {"session_id": session_id, "payment_status": {"$ne": "paid"}},
                    {"$set": {"status": "completed", "payment_status": "paid",
                              "stripe_payment_intent_id": s.payment_intent,
                              "updated_at": datetime.now(timezone.utc).isoformat()}},
                )
                record = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
        except stripe.error.StripeError:
            pass
    return {"session_id": record["session_id"], "status": record["status"], "payment_status": record["payment_status"]}

@api_router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    secret = os.environ.get("STRIPE_WEBHOOK_SECRET", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, secret)
    except stripe.error.SignatureVerificationError:
        raise HTTPException(400, "Invalid signature")
    obj, t = event["data"]["object"], event["type"]
    now = datetime.now(timezone.utc).isoformat()
    if t == "checkout.session.completed":
        await db.payment_transactions.update_one(
            {"session_id": obj["id"], "payment_status": {"$ne": "paid"}},
            {"$set": {"status": "completed", "payment_status": obj.get("payment_status", "paid"),
                      "stripe_payment_intent_id": obj.get("payment_intent"), "updated_at": now}},
        )
    elif t == "checkout.session.async_payment_succeeded":
        await db.payment_transactions.update_one({"session_id": obj["id"]}, {"$set": {"payment_status": "paid", "updated_at": now}})
    elif t == "checkout.session.async_payment_failed":
        await db.payment_transactions.update_one({"session_id": obj["id"]}, {"$set": {"status": "failed", "payment_status": "failed", "updated_at": now}})
    elif t == "checkout.session.expired":
        await db.payment_transactions.update_one({"session_id": obj["id"]}, {"$set": {"status": "expired", "payment_status": "expired", "updated_at": now}})
    elif t == "charge.refunded":
        await db.payment_transactions.update_one({"stripe_payment_intent_id": obj.get("payment_intent")}, {"$set": {"status": "refunded", "payment_status": "refunded", "updated_at": now}})
    return {"status": "ok"}

@api_router.get("/")
async def root():
    return {"message": "Donna Devlin Designs API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    app.state.index_task = asyncio.create_task(ensure_indexes())
    await seed_products()

@app.on_event("shutdown")
async def shutdown_db_client():
    app.state.index_task.cancel()
    with suppress(asyncio.CancelledError):
        await app.state.index_task
    client.close()

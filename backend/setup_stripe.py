"""Idempotent Stripe catalog setup. Run once STRIPE_SECRET_KEY is present in .env:
    python3 setup_stripe.py
Creates one Stripe Product + Price per catalog entry, deduped by lookup_key / metadata.
"""
import os
import stripe
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
if not stripe.api_key:
    raise SystemExit("STRIPE_SECRET_KEY not set — add it to backend/.env first")

CATALOG = [
    {"slug": "garden-party-walking-vest", "name": "The Garden Party Walking Vest", "lookup_key": "garden_party_vest", "amount": 5800},
    {"slug": "scotland-yard-step-in-harness", "name": "The Scotland Yard Step-In Harness", "lookup_key": "scotland_yard_harness", "amount": 5200},
    {"slug": "daisy-chain-designer-collar", "name": "The Daisy Chain Designer Collar", "lookup_key": "daisy_chain_collar", "amount": 3400},
    {"slug": "coastal-stripe-leash", "name": "The Ladybug Lane Leash", "lookup_key": "coastal_stripe_leash", "amount": 4200},
    {"slug": "cherry-picnic-walking-vest", "name": "The Cherry Picnic Walking Vest", "lookup_key": "cherry_picnic_vest", "amount": 5800},
    {"slug": "polka-wisp-step-in-harness", "name": "The Woodland Camo Designer Collar", "lookup_key": "polka_wisp_harness", "amount": 3400},
]

TAX_CODE_PHYSICAL = "txcd_99999999"


def get_or_create_product(entry):
    for p in stripe.Product.list(active=True).auto_paging_iter():
        if p.to_dict().get("metadata", {}).get("emergent_product_id") == entry["slug"]:
            return p
    return stripe.Product.create(
        name=entry["name"],
        tax_code=TAX_CODE_PHYSICAL,
        metadata={"managed_by": "emergent", "emergent_product_id": entry["slug"]},
    )


def ensure_price(product, entry):
    existing = stripe.Price.list(lookup_keys=[entry["lookup_key"]], active=True, limit=1).data
    if existing and (existing[0].unit_amount != entry["amount"] or existing[0].currency != "usd"):
        stripe.Price.modify(existing[0].id, active=False)
        existing = []
    if not existing:
        stripe.Price.create(
            product=product.id,
            unit_amount=entry["amount"],
            currency="usd",
            lookup_key=entry["lookup_key"],
            transfer_lookup_key=True,
        )


for entry in CATALOG:
    product = get_or_create_product(entry)
    ensure_price(product, entry)
    print(f"ok: {entry['lookup_key']} -> {product.id}")

print("Stripe catalog ready.")

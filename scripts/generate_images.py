"""Generates the Donna Devlin Designs imagery with Gemini Nano Banana via the Universal Key.
Run: python3 /app/scripts/generate_images.py  (writes to /app/frontend/public/images/)
"""
import asyncio
import base64
import os

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images"

STYLE = (
    "Boutique pet-apparel photography, warm cream seamless studio backdrop, soft diffused daylight, "
    "handcrafted cotton fabric with visible weave and neat stitching, solid brass hardware, "
    "whimsical yet elegant, premium catalog quality, photorealistic, square composition. "
)

LIFESTYLE = (
    "Warm editorial lifestyle photography, soft golden natural light, shallow depth of field, "
    "photorealistic, charming boutique pet brand campaign. "
)

IMAGES = [
    ("hero/hero-1.png", LIFESTYLE + "A small cream toy poodle sitting elegantly, wearing a handcrafted floral cotton dog walking vest harness in terracotta and sage on ivory, against a warm terracotta studio backdrop, poised like a fashion model."),
    ("hero/hero-2.png", LIFESTYLE + "A small wire-haired terrier mid-stride on a sunlit tree-lined sidewalk, wearing a vintage navy plaid step-in dog harness with brass hardware, slight motion blur in the legs, joyful."),
    ("hero/hero-3.png", STYLE + "Macro detail of a handcrafted floral cotton dog harness: terracotta and sage flowers on ivory fabric, brass D-ring, precise stitching, spool of thread nearby."),
    ("products/garden-party-vest-a.png", STYLE + "A dog walking vest harness in heirloom garden floral cotton print (terracotta, sage and cream flowers on warm ivory), laid flat and perfectly arranged, brass D-ring."),
    ("products/garden-party-vest-b.png", LIFESTYLE + "A small cream toy poodle wearing a garden floral cotton walking vest harness (terracotta and sage flowers on ivory), sitting in a sunlit cottage garden among flowers."),
    ("products/scotland-yard-harness-a.png", STYLE + "A step-in dog harness in tailored vintage navy plaid cotton, laid flat showing the step-in shape and one-click buckle, brass hardware."),
    ("products/scotland-yard-harness-b.png", LIFESTYLE + "A small terrier wearing a navy plaid step-in dog harness, walking beside its owner's boots on an autumn sidewalk with fallen leaves."),
    ("products/daisy-collar-a.png", STYLE + "A designer dog collar in sunny daisy-print cotton with a small matching bow, coiled in an elegant spiral, brass buckle."),
    ("products/daisy-collar-b.png", LIFESTYLE + "Close-up portrait of a small white maltese dog wearing a daisy-print cotton collar with a bow, bright and cheerful, warm light."),
    ("products/coastal-leash-a.png", STYLE + "A cotton dog leash in soft sage-green and cream stripes, neatly coiled with a solid brass swivel clasp on top."),
    ("products/coastal-leash-b.png", LIFESTYLE + "A hand holding a sage-and-cream striped cotton leash attached to a small dog walking a coastal path at golden hour, sea in soft focus behind."),
    ("products/cherry-picnic-vest-a.png", STYLE + "A dog walking vest harness in red-and-cream cherry gingham picnic cotton print with tiny cherry motifs, laid flat, brass D-ring."),
    ("products/cherry-picnic-vest-b.png", LIFESTYLE + "A small brown dachshund wearing a red cherry gingham walking vest harness, standing on a red-checkered picnic blanket in a sunny park."),
    ("products/polka-wisp-harness-a.png", STYLE + "A step-in dog harness in whimsical terracotta polka dots on warm ivory cotton, laid flat, one-click buckle and brass rings."),
    ("products/polka-wisp-harness-b.png", LIFESTYLE + "Studio portrait of a tiny chihuahua wearing a terracotta polka-dot step-in harness on warm ivory, sitting pretty against a warm cream backdrop."),
    ("story/designer.png", LIFESTYLE + "Portrait of a smiling woman textile designer in her fifties with silver-streaked hair, at a wooden sewing table surrounded by rolls of whimsical floral and gingham cotton fabric, a small dog asleep beside her, warm artisan workshop."),
    ("story/craft.png", LIFESTYLE + "Close-up of hands stitching a floral cotton dog harness on a well-worn wooden workbench, spools of terracotta and sage thread, warm window light."),
]


async def gen(sem, name, prompt):
    path = os.path.join(OUT, name)
    if os.path.exists(path):
        print("SKIP", name, flush=True)
        return
    async with sem:
        try:
            chat = LlmChat(
                api_key=os.environ["EMERGENT_LLM_KEY"],
                session_id=f"img-{name.replace('/', '-')}",
                system_message="You are a product photography generator.",
            )
            chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
            text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
            if images:
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "wb") as f:
                    f.write(base64.b64decode(images[0]["data"]))
                print("OK", name, flush=True)
            else:
                print("NOIMG", name, flush=True)
        except Exception as e:
            print("ERR", name, str(e)[:200], flush=True)


async def main():
    sem = asyncio.Semaphore(3)
    await asyncio.gather(*[gen(sem, n, p) for n, p in IMAGES])


if __name__ == "__main__":
    asyncio.run(main())

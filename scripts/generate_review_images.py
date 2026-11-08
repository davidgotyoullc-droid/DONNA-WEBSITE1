"""Candid, customer-phone-style review photos (humans with their dogs wearing the products)."""
import asyncio
import base64
import os

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images/reviews"

STYLE = (
    "Authentic candid smartphone photo, the kind a real customer would attach to an online review: "
    "slightly imperfect framing, natural daylight, realistic colors, no studio polish, photorealistic. "
)

IMAGES = [
    ("r1.png", STYLE + "A happy woman in her thirties kneeling on a sunny suburban sidewalk, arms around her cream toy poodle wearing a floral cotton dog walking vest in terracotta and sage. Both look at the camera."),
    ("r2.png", STYLE + "A man in casual clothes crouching at a dog park beside his scruffy terrier wearing a vintage navy plaid step-in harness, grass and other dogs blurred behind."),
    ("r3.png", STYLE + "A cozy living-room snapshot: a tiny chihuahua in a terracotta polka-dot step-in harness sitting on a person's lap on a sofa, warm lamp light."),
    ("r4.png", STYLE + "A young woman sitting on a red-checkered picnic blanket in a park with her brown dachshund wearing a red cherry gingham walking vest, lemonade bottle nearby."),
    ("r5.png", STYLE + "A smiling senior woman on a front porch holding a small white maltese wearing a sunny daisy-print cotton collar with a little bow, potted flowers behind."),
    ("r6.png", STYLE + "First-person perspective photo down a sage-and-cream striped cotton leash to a small shih tzu walking a coastal boardwalk, the owner's sneakers visible at the edge of frame."),
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
                session_id=f"img3-{name}",
                system_message="You are a candid photography generator.",
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

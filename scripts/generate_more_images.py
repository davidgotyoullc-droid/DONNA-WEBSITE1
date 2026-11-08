"""Extra frames: hero flipbook poses (gif-like) + extra category frames for glitch hover."""
import asyncio
import base64
import os

from dotenv import load_dotenv

load_dotenv("/app/backend/.env")

from emergentintegrations.llm.chat import LlmChat, UserMessage

OUT = "/app/frontend/public/images"

HERO_BASE = (
    "Warm editorial studio photograph of a small cream toy poodle wearing a handcrafted floral cotton "
    "dog walking vest harness in terracotta and sage on ivory, sitting against a seamless warm terracotta "
    "studio backdrop, soft diffused daylight, photorealistic, boutique pet fashion campaign. "
)

LIFESTYLE = (
    "Warm editorial lifestyle photography, soft golden natural light, shallow depth of field, "
    "photorealistic, charming boutique pet brand campaign. "
)

IMAGES = [
    ("hero/pose-2.png", HERO_BASE + "The poodle tilts its head slightly to the left, ears perked, looking curious."),
    ("hero/pose-3.png", HERO_BASE + "The poodle looks up and to the right, alert and bright-eyed, mouth slightly open in a smile."),
    ("hero/pose-4.png", HERO_BASE + "The poodle shifts its weight, one front paw lifted delicately, head turned in profile."),
    ("hero/pose-5.png", HERO_BASE + "The poodle gives a gentle head shake, ears mid-flop with slight motion, joyful expression."),
    ("hero/pose-6.png", HERO_BASE + "The poodle sits taller, chin up proudly showing off the floral vest, tail mid-wag with slight blur."),
    ("products/daisy-collar-c.png", LIFESTYLE + "Macro detail of a designer dog collar in sunny daisy-print cotton with a small matching bow, brass buckle catching warm light, on cream linen."),
    ("products/daisy-collar-d.png", LIFESTYLE + "A small white maltese dog wearing a daisy-print cotton collar with bow, trotting happily through a sunlit meadow path."),
    ("products/coastal-leash-c.png", LIFESTYLE + "Macro detail of a solid brass swivel clasp on a sage-and-cream striped cotton dog leash, coiled softly, warm window light."),
    ("products/coastal-leash-d.png", LIFESTYLE + "A small dog on a sage-striped cotton leash pausing on a sandy coastal boardwalk, leash loosely curved, sea breeze mood."),
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
                session_id=f"img2-{name.replace('/', '-')}",
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

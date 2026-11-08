import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VIDEOS = [
  { id: "4NyBwbBlHD8", title: "Custom designer step-in harness" },
  { id: "AHWpspK0mfM", title: "Wuffles — custom walking vests" },
  { id: "VoZoJPisCTc", title: "Custom designer walking vest" },
  { id: "i7HSfIqX9EI", title: "Bows for dog walking vests" },
];

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      data-testid={`video-card-${video.id}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-[#3E2A33] shadow-sm">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            data-testid={`video-play-${video.id}`}
            className="group relative block h-full w-full"
            aria-label={`Play video: ${video.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
              alt={video.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-[#3E2A33]/25 transition-colors group-hover:bg-[#3E2A33]/10" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E6007E] text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-5 w-5 fill-current" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-[#3E2A33]">{video.title}</span>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`video-watch-${video.id}`}
          className="shrink-0 text-xs font-semibold text-[#E6007E] underline underline-offset-2 hover:text-[#3E2A33]"
        >
          Watch on YouTube
        </a>
      </figcaption>
    </motion.figure>
  );
}

export default function VideosSection() {
  return (
    <section data-testid="videos-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mb-10 max-w-xl"
      >
        <p className="font-mono-accent mb-3 text-xs tracking-[0.3em] text-[#E6007E]">WATCH &amp; LEARN</p>
        <h2 className="font-serif-display text-3xl font-semibold tracking-tight text-[#3E2A33] sm:text-4xl">
          See our designs in action
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#5A6572] sm:text-lg">
          How the vests wrap, how the harnesses step in, and how a little bow changes everything.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {VIDEOS.map((video, i) => (
          <VideoCard key={video.id} video={video} index={i} />
        ))}
      </div>
    </section>
  );
}

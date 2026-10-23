import { useEffect, useRef, useState } from "react";
import bannerImg from "../assets/images/banner.jpg";
import teaserVideo from "../assets/videos/teaser.mp4";
import type { EventData } from "../types";

interface Props {
    event: EventData;
    onEnter: () => void;
}

export function OpeningSection({ event, onEnter }: Props) {
    const [playing, setPlaying] = useState(false);
    const [ended, setEnded] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (playing) videoRef.current?.play().catch(() => setBlocked(true));
    }, [playing]);

    if (!playing) {
        return (
            <div className="flex min-h-dvh justify-center bg-[#0e1f21]">
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Putar video undangan"
                    className="flex w-full max-w-[480px] flex-col items-center justify-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--inv-primary)]"
                >
                    <img src={bannerImg} alt={event.name} className="w-full" />
                    <span className="flex items-center gap-2 rounded-full bg-[var(--inv-primary)] px-5 py-2 text-sm font-medium text-white">
                        <svg
                            width="12"
                            height="14"
                            viewBox="0 0 12 14"
                            aria-hidden="true"
                        >
                            <path d="M0 0l12 7-12 7z" fill="currentColor" />
                        </svg>
                        Ketuk untuk memutar video
                    </span>
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-h-dvh justify-center bg-black">
            <div className="relative h-dvh w-full max-w-[480px]">
                <video
                    ref={videoRef}
                    src={teaserVideo}
                    poster={bannerImg}
                    playsInline
                    controls={blocked}
                    onEnded={() => setEnded(true)}
                    className="h-full w-full object-contain"
                />
                {ended && (
                    <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/85 to-transparent px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-24">
                        <button
                            type="button"
                            onClick={onEnter}
                            className="rounded-md bg-[var(--inv-primary)] px-14 py-2.5 text-lg font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Masuk
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

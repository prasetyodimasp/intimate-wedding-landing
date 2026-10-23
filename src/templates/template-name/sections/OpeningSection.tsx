import { useEffect, useRef, useState } from "react";
import bannerImg from "../assets/images/banner.png";
import teaserVideo from "../assets/videos/teaser.mp4";
import { invitationConfig } from "../config";
import type { EventData } from "../types";

interface Props {
    event: EventData;
    /** Dipanggil otomatis saat video selesai: pindah ke form */
    onEnter: () => void;
}

export function OpeningSection({ event, onEnter }: Props) {
    const [playing, setPlaying] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [blocked, setBlocked] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const applyRate = (video: HTMLVideoElement) => {
        video.defaultPlaybackRate = invitationConfig.videoPlaybackRate;
        video.playbackRate = invitationConfig.videoPlaybackRate;
    };

    const handleStartPlay = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setPlaying(true);
            setIsTransitioning(false);
        }, 250);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!playing || !video) return;
        applyRate(video);
        video.play().catch(() => setBlocked(true));
    }, [playing]);

    if (!playing) {
        return (
            <div
                className={`flex min-h-dvh justify-center bg-[#0e1f21] ${
                    isTransitioning ? "animate-fade-out" : "animate-fade-in"
                }`}
            >
                <button
                    type="button"
                    onClick={handleStartPlay}
                    disabled={isTransitioning}
                    aria-label="Putar video undangan"
                    className="flex w-full max-w-[480px] flex-col items-center justify-center gap-5 transition-transform duration-200 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--inv-primary)]"
                >
                    <img
                        src={bannerImg}
                        alt={event.name}
                        className="w-full shadow-lg"
                    />
                    <span className="flex items-center gap-2 rounded-full bg-[var(--inv-primary)] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:brightness-110 active:scale-95">
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
        <div className="flex min-h-dvh justify-center bg-black animate-fade-in">
            <video
                ref={videoRef}
                src={teaserVideo}
                poster={bannerImg}
                playsInline
                controls={blocked}
                onLoadedMetadata={(e) => applyRate(e.currentTarget)}
                onEnded={onEnter}
                onError={onEnter}
                className="h-dvh w-full max-w-[480px] object-contain"
            />
        </div>
    );
}

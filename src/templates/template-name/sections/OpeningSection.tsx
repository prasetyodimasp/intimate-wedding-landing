import { useEffect, useRef, useState } from "react";
import bannerImg from "../assets/images/banner.jpg";
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
    const [blocked, setBlocked] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const applyRate = (video: HTMLVideoElement) => {
        video.defaultPlaybackRate = invitationConfig.videoPlaybackRate;
        video.playbackRate = invitationConfig.videoPlaybackRate;
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!playing || !video) return;
        applyRate(video);
        video.play().catch(() => setBlocked(true));
    }, [playing]);

    // 1. Banner + tombol Reservasi (tombol dibuat dari FE, bukan dari desain)
    if (!playing) {
        return (
            <div className="flex min-h-dvh justify-center bg-[#0e1f21]">
                <div className="flex min-h-dvh justify-center bg-[#0e1f21]">
                    <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label="Putar video undangan"
                        className="flex w-full max-w-[480px] flex-col items-center justify-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--inv-primary)]"
                    >
                        <img
                            src={bannerImg}
                            alt={event.name}
                            className="w-full"
                        />
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
            </div>
        );
    }

    // 2. Video dipercepat. 3. Selesai (atau gagal diputar) langsung ke form.
    return (
        <div className="flex min-h-dvh justify-center bg-black">
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

import kavyaLogo from "../assets/images/kavya-project.webp";
import skitrawLogo from "../assets/images/skitraw.webp";
import styles from "../styles/invitation.module.css";
import type { EventData } from "../types";

interface Props {
    event: EventData;
    onReserve?: () => void;
}

const accent = "text-[var(--inv-primary)]";

function formatEventDate(iso: string) {
    const d = new Date(`${iso}T00:00:00`);
    if (isNaN(d.getTime())) return { weekday: "", rest: iso };
    return {
        weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
        rest: d.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),
    };
}

export function Banner({ event, onReserve }: Props) {
    const date = formatEventDate(event.eventDate);
    const time = event.endTime
        ? `${event.startTime} - ${event.endTime} WIB`
        : `${event.startTime} WIB`;

    const reserveClass = `${styles.display} rounded-[2cqw] bg-[var(--inv-primary)] px-[9cqw] py-[1.2cqw] text-[6.4cqw] leading-tight text-white shadow-[0_1cqw_0_#a83f00]`;

    return (
        <section className="@container relative overflow-hidden bg-[var(--inv-cream)] text-[var(--inv-ink)]">
            <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(90% 55% at 50% 0%, #ffd9b8 0%, rgba(255,251,245,0) 70%), radial-gradient(60% 40% at 100% 100%, rgba(201,162,77,0.25) 0%, rgba(255,251,245,0) 70%)",
                }}
            />

            <div className="relative flex aspect-[519/600] flex-col items-center justify-around py-[5cqw]">
                <p className="text-[3.2cqw] text-[var(--inv-ink)]/70">
                    You’re Invited to,
                </p>

                <h1
                    className={`${styles.display} relative text-center text-[13.5cqw] leading-[0.95]`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="absolute -left-[8cqw] bottom-[3cqw] size-[6cqw] text-[var(--inv-gold)]"
                    >
                        <path
                            d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="block">
                        Inti<span className={accent}>mate</span>
                    </span>
                    <span className="block">
                        <span className={accent}>Wedd</span>ing
                    </span>
                    <span className="block">
                        O<span className={accent}>p</span>en Hou
                        <span className={accent}>se</span>
                    </span>
                </h1>

                <div className="flex items-center gap-[3cqw]">
                    <div className="text-right text-[3.2cqw] leading-snug">
                        <p>
                            {date.weekday && `${date.weekday}, `}
                            <span className={`${accent} font-medium`}>
                                {date.rest}
                            </span>
                        </p>
                        <p>{time}</p>
                    </div>
                    <div
                        aria-hidden="true"
                        className={`${styles.gold} h-[8cqw] w-[0.4cqw]`}
                    />
                    <div className="text-[2.7cqw] leading-snug">
                        <p className="text-[3.4cqw]">
                            <span className={`${styles.display} italic`}>
                                at{" "}
                            </span>
                            <span
                                className={`${accent} font-semibold uppercase`}
                            >
                                {event.venueName}
                            </span>
                        </p>
                        <p>{event.venueAddress}</p>
                    </div>
                </div>

                <div className="mx-[7%] grid grid-cols-[1.25fr_1fr_1.15fr_1fr] divide-x divide-[var(--inv-gold)] rounded-[2.4cqw] border-2 border-[var(--inv-gold)] bg-white/60 py-[1.4cqw] text-center text-[2.5cqw] leading-tight">
                    <p className="px-[2cqw]">
                        Get benefits up to <b className={accent}>2 Mio</b>!
                    </p>
                    <p className="px-[2cqw]">Food Tasting</p>
                    <p className="px-[2cqw]">
                        Vendor <b>Consultation</b>
                    </p>
                    <p className="px-[2cqw]">Venue Showing</p>
                </div>

                {onReserve ? (
                    <button
                        type="button"
                        onClick={onReserve}
                        className={`${reserveClass} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--inv-ink)]`}
                    >
                        Reservasi
                    </button>
                ) : (
                    <span className={reserveClass}>Reservasi</span>
                )}

                <div className="flex flex-col items-center gap-[1.5cqw]">
                    <p className="text-[2.2cqw] text-[var(--inv-ink)]/60">
                        Presented by
                    </p>
                    <div className="flex items-center gap-[3cqw]">
                        <img
                            src={kavyaLogo}
                            alt="Kavya Project"
                            className="h-[10cqw] w-auto"
                        />
                        <span
                            aria-hidden="true"
                            className="text-[3cqw] text-[var(--inv-ink)]/50"
                        >
                            x
                        </span>
                        <img
                            src={skitrawLogo}
                            alt="Skitraw Coffee"
                            className="h-[5cqw] w-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

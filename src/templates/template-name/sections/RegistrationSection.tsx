import { useRef, useState, type FormEvent } from "react";
import cakapict from "../assets/images/sponsors/cakapict.webp";
import evs from "../assets/images/sponsors/evs-music-project.webp";
import neis from "../assets/images/sponsors/neis-photography.webp";
import noire from "../assets/images/sponsors/noire.webp";
import sekala from "../assets/images/sponsors/sekala-momen.webp";
import sik from "../assets/images/sponsors/sik-decoration.webp";
import { Banner } from "../components/Banner";
import { FormField } from "../components/FormField";
import { invitationConfig } from "../config";
import styles from "../styles/invitation.module.css";
import type { EventData, RegistrationData } from "../types";

const sponsors = [
    {
        name: "Sekala Momen",
        logo: sekala,
        width: 22,
        tilt: -3,
        lift: 0,
        dark: false,
    },
    {
        name: "CAKAPICT",
        logo: cakapict,
        width: 28,
        tilt: 2,
        lift: -1,
        dark: false,
    },
    {
        name: "NEiS Photography",
        logo: neis,
        width: 10,
        tilt: -4,
        lift: 0,
        dark: false,
    },
    {
        name: "Sik Decoration",
        logo: sik,
        width: 15,
        tilt: 4,
        lift: 0,
        dark: false,
    },
    {
        name: "EVS Music Project",
        logo: evs,
        width: 14,
        tilt: -2,
        lift: 1,
        dark: false,
    },
    { name: "Noire", logo: noire, width: 15, tilt: 5, lift: 0, dark: true },
];

const paxOptions = Array.from(
    { length: invitationConfig.maxPax },
    (_, i) => i + 1
);

interface Props {
    event: EventData;
    onSubmit: (data: RegistrationData) => Promise<void>;
}

export function RegistrationSection({ event, onSubmit }: Props) {
    const formRef = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const scrollToForm = () => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        formRef.current?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const data: RegistrationData = {
            fullName: String(f.get("fullName") ?? "").trim(),
            phoneNumber: String(f.get("phoneNumber") ?? "").trim(),
            domicile: String(f.get("domicile") ?? "").trim(),
            weddingDate: String(f.get("weddingDate") ?? ""),
            weddingVenue:
                String(f.get("weddingVenue") ?? "").trim() || undefined,
            paxCount: Number(f.get("paxCount")),
        };
        setLoading(true);
        setError("");
        try {
            await onSubmit(data);
        } catch {
            setError(
                "Reservasi belum terkirim. Periksa koneksi lalu coba lagi."
            );
            setLoading(false);
        }
    };

    return (
        <main className="mx-auto min-h-dvh w-full max-w-[480px] bg-[var(--inv-cream)]">
            <Banner event={event} onReserve={scrollToForm} />

            <section className="@container px-[5cqw] pb-[10cqw] pt-[2cqw] text-[var(--inv-ink)]">
                <p className="mb-[3cqw] text-center text-[2.4cqw] text-[var(--inv-ink)]/60">
                    Bersama vendor pilihan
                </p>
                <ul className="flex flex-wrap justify-center gap-x-[2.5cqw] gap-y-[1.8cqw]">
                    {sponsors.map((s) => (
                        <li
                            key={s.name}
                            style={{
                                transform: `translateY(${s.lift}cqw) rotate(${s.tilt}deg)`,
                            }}
                            className={`flex rounded-[2.4cqw] px-[2.2cqw] py-[1.6cqw] shadow-[0_1cqw_2cqw_rgba(43,23,8,0.2)] ${
                                s.dark
                                    ? "bg-[#1b2150]"
                                    : "border border-[#eadfcb] bg-white"
                            }`}
                        >
                            <img
                                src={s.logo}
                                alt={s.name}
                                style={{ width: `${s.width}cqw` }}
                                className={`block h-auto ${
                                    s.dark ? "" : "mix-blend-multiply"
                                }`}
                            />
                        </li>
                    ))}
                </ul>
            </section>

            <div className="rounded-t-[2.5rem] bg-[var(--inv-primary)] px-4 pb-14 pt-12">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="scroll-mt-6"
                >
                    <div
                        className={`${styles.gold} rounded-[2rem] p-[2px] shadow-[0_24px_40px_-16px_rgba(90,30,0,0.6)]`}
                    >
                        <div className="relative rounded-[calc(2rem-2px)] bg-[var(--inv-cream)] px-6 pb-8 pt-12">
                            <span className="absolute -top-4 left-6 -rotate-3 rounded-full bg-[var(--inv-ink)] px-4 py-1.5 text-sm font-medium text-[var(--inv-gold-light)] shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                                RSVP
                            </span>
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="absolute right-6 top-7 size-7 text-[var(--inv-gold)]"
                            >
                                <path
                                    d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z"
                                    fill="currentColor"
                                />
                            </svg>

                            <h2
                                className={`${styles.display} pr-10 text-[2.4rem] leading-[1.02] text-[var(--inv-ink)]`}
                            >
                                Isi dulu, tiketmu{" "}
                                <span className="italic text-[var(--inv-primary)]">
                                    langsung jadi
                                </span>
                            </h2>

                            <div className="mt-7 flex flex-col gap-5">
                                <FormField
                                    label="Nama"
                                    name="fullName"
                                    placeholder="Nama lengkap"
                                    autoComplete="name"
                                    required
                                />
                                <FormField
                                    label="No. Telp"
                                    name="phoneNumber"
                                    type="tel"
                                    placeholder="08xxxxxxxxxx"
                                    autoComplete="tel"
                                    required
                                />
                                <FormField
                                    label="Domisili"
                                    name="domicile"
                                    placeholder="Kota tinggalmu"
                                    required
                                />
                                <FormField
                                    label="Tanggal pernikahan"
                                    name="weddingDate"
                                    type="date"
                                    required
                                />
                                <FormField
                                    label="Venue event"
                                    name="weddingVenue"
                                    placeholder=""
                                    optional
                                />

                                <fieldset className="flex flex-col gap-2">
                                    <legend className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[var(--inv-ink)]">
                                        Datang berapa orang?
                                        <span className="rounded-full bg-[var(--inv-ink)]/10 px-2 py-0.5 text-[11px] font-normal">
                                            maks. {invitationConfig.maxPax}
                                        </span>
                                    </legend>
                                    <div className="flex gap-3">
                                        {paxOptions.map((n) => (
                                            <label key={n} className="relative">
                                                <input
                                                    type="radio"
                                                    name="paxCount"
                                                    value={n}
                                                    required
                                                    className="peer sr-only"
                                                />
                                                <span
                                                    className={`${styles.display} grid size-14 cursor-pointer place-items-center rounded-2xl border-2 border-[var(--inv-ink)] bg-white text-2xl text-[var(--inv-ink)] shadow-[3px_3px_0_var(--inv-gold)] transition active:scale-95 peer-checked:border-[var(--inv-primary)] peer-checked:bg-[var(--inv-primary)] peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--inv-ink)]`}
                                                >
                                                    {n}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>

                            <div className="relative -mx-6 my-8 border-t-2 border-dashed border-[var(--inv-ink)]/20">
                                <span className="absolute -left-3 -top-3 size-6 rounded-full bg-[var(--inv-primary)]" />
                                <span className="absolute -right-3 -top-3 size-6 rounded-full bg-[var(--inv-primary)]" />
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="mb-4 text-center text-sm text-red-700"
                                >
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${styles.display} w-full rounded-2xl bg-[var(--inv-primary)] py-3.5 text-3xl text-white shadow-[0_5px_0_#a83f00] transition active:translate-y-[3px] active:shadow-[0_2px_0_#a83f00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--inv-ink)] disabled:opacity-60`}
                            >
                                {loading ? "Membuat tiket…" : "Dapatkan tiket"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

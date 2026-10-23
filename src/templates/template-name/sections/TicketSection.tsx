import { QRCodeSVG } from "qrcode.react";
import guestoryLogo from "../assets/images/sponsors/guestory.webp";
import { invitationConfig } from "../config";
import styles from "../styles/invitation.module.css";
import type { RegistrationData, TicketData } from "../types";

interface Props {
    registration: RegistrationData;
    ticket: TicketData;
}

function formatDate(value: string | Date) {
    const d =
        typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
            ? new Date(`${value}T00:00:00`)
            : new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString(invitationConfig.locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function TicketSection({ registration, ticket }: Props) {
    const rows = [
        ["Nama", ticket.guestName],
        ["No. Telp", registration.phoneNumber],
        ["Domisili", registration.domicile],
        ["Tanggal pernikahan", formatDate(registration.weddingDate)],
        ["Venue Event", registration.weddingVenue || "–"],
        ["Pax", `${ticket.paxCount} pax`],
    ];

    return (
        <main className="mx-auto min-h-dvh w-full max-w-[480px] bg-white px-8 py-10">
            <p className="text-sm text-neutral-800">
                {formatDate(ticket.issuedAt ?? new Date())}
            </p>

            <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7">
                {rows.map(([label, value]) => (
                    <div key={label}>
                        <dt className="text-sm text-neutral-800">{label}</dt>
                        <dd
                            className={`${styles.display} break-words text-[1.9rem] leading-[1.05] text-[var(--inv-primary)]`}
                        >
                            {value}
                        </dd>
                    </div>
                ))}
            </dl>

            <div className="mt-12 flex flex-col items-center gap-3">
                <QRCodeSVG
                    value={ticket.qrValue}
                    size={200}
                    level="M"
                    title="QR code tiket"
                />
                <p className="text-xs text-neutral-500">
                    {ticket.registrationReference}
                </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2 text-xs text-neutral-500">
                <span>Ticketing by</span>
                <img src={guestoryLogo} alt="Guestory" className="h-4 w-auto" />
            </div>
        </main>
    );
}

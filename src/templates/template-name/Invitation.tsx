import { useEffect, useState, type CSSProperties } from "react";
import { invitationConfig } from "./config";
import { OpeningSection } from "./sections/OpeningSection";
import { RegistrationSection } from "./sections/RegistrationSection";
import { TicketSection } from "./sections/TicketSection";
import styles from "./styles/invitation.module.css";
import type { InvitationProps, RegistrationData, TicketData } from "./types";

type Step = "opening" | "register" | "ticket";

export function Invitation({ event, onSubmitRegistration }: InvitationProps) {
    const [step, setStep] = useState<Step>("opening");
    const [registration, setRegistration] = useState<RegistrationData | null>(
        null
    );
    const [ticket, setTicket] = useState<TicketData | null>(null);

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [step]);

    const handleSubmit = async (data: RegistrationData) => {
        const result = await onSubmitRegistration(data);
        setRegistration(data);
        setTicket(result);
        setStep("ticket");
    };

    return (
        <div
            className={`${styles.root} min-h-dvh`}
            style={
                {
                    "--inv-primary": invitationConfig.primaryColor,
                } as CSSProperties
            }
        >
            {step === "opening" && (
                <OpeningSection
                    event={event}
                    onEnter={() => setStep("register")}
                />
            )}
            {step === "register" && (
                <RegistrationSection event={event} onSubmit={handleSubmit} />
            )}
            {step === "ticket" && registration && ticket && (
                <TicketSection registration={registration} ticket={ticket} />
            )}
        </div>
    );
}

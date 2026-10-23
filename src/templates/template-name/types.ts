export interface EventData {
    name: string;
    subtitle?: string;
    eventDate: string;
    startTime: string;
    endTime?: string;
    venueName: string;
    venueAddress: string;
}

export interface RegistrationData {
    fullName: string;
    phoneNumber: string;
    domicile: string;
    weddingDate: string; // format YYYY-MM-DD
    weddingVenue?: string;
    paxCount: number;
}

export interface TicketData {
    registrationReference: string;
    qrValue: string;
    guestName: string;
    paxCount: number;
    issuedAt?: string; // opsional, default: hari ini
}

export interface InvitationProps {
    event: EventData;
    /** Dipanggil saat form dikirim. Guestory Ticketing yang membuat tiket & QR asli. */
    onSubmitRegistration: (
        registration: RegistrationData
    ) => Promise<TicketData> | TicketData;
}

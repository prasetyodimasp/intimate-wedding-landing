import type {
    EventData,
    RegistrationData,
    TicketData,
} from "../templates/template-name/types";

export const mockEvent: EventData = {
    name: "Intimate Wedding Open House",
    eventDate: "2026-10-31",
    startTime: "11:00",
    endTime: "17:00",
    venueName: "Skitraw Coffee",
    venueAddress: "Jl. Bangunan Barat No. 6, Kayu Putih",
};

// Simulasi saja. Tiket & QR asli dibuat oleh Guestory Ticketing.
export async function mockSubmitRegistration(
    registration: RegistrationData
): Promise<TicketData> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
        registrationReference: "MOCK-REG-0001",
        qrValue: "MOCK-TICKET-PLACEHOLDER",
        guestName: registration.fullName,
        paxCount: registration.paxCount,
    };
}

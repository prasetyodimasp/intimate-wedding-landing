# Intimate Wedding Open House (Kavya x Skitraw) v1.0

Konsep: undangan 3 halaman. Halaman 1 foto yang memutar video teaser saat diketuk; halaman 2 banner HTML/Tailwind, stiker sponsor, lalu form reservasi; halaman 3 hasil isian dan QR.

Sections: OpeningSection, RegistrationSection (Banner, sponsor, FormField), TicketSection.
Props: event, onSubmitRegistration(registration) => TicketData.
Config: config.ts (primaryColor #FF6000, locale, presentedBy). Daftar sponsor ada di RegistrationSection.tsx.
Dependencies: react, tailwindcss v4, qrcode.react (hanya merender slot QR dari ticket.qrValue).
Font: Instrument Serif dan Inter (Google Fonts).
Assets: assets/images/banner.jpg, assets/images/sponsors/*.webp, assets/videos/teaser.mp4 (H.264).
Preview: npm run dev. QR dan tiket di preview hanya mock.
Limitasi: background banner masih gradient, logo Kavya/Skitraw masih teks, form menunggu desain final.

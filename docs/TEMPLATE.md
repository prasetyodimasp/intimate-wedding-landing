# Intimate Wedding Open House (Kavya x Skitraw) v1.0

Alur: (1) banner + tombol Reservasi (FE), (2) video teaser dipercepat, (3) otomatis ke halaman form saat video selesai, (4) submit form lalu halaman tiket + QR.

Sections: OpeningSection, RegistrationSection (Banner, sponsor, form), TicketSection.
Props: event, onSubmitRegistration(registration) => TicketData.
Config: config.ts (primaryColor, locale, maxPax, videoPlaybackRate). Daftar sponsor ada di RegistrationSection.tsx.
Dependencies: react, tailwindcss v4, qrcode.react (hanya merender slot QR dari ticket.qrValue).
Font: Instrument Serif dan Inter (Google Fonts).
Assets: assets/images (banner.jpg, kavya-project.webp, skitraw.webp, sponsors/*.webp), assets/videos/teaser.mp4 (H.264).
Preview: npm run dev. QR dan tiket di preview hanya mock.
Limitasi: banner.jpg sementara masih memuat tombol Reservasi bawaan; ganti dengan desain tanpa tombol.

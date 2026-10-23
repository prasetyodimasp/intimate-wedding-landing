import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    optional?: boolean;
};

export function FormField({ label, name, optional, ...inputProps }: Props) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="flex items-center gap-2 text-sm font-medium text-[var(--inv-ink)]">
                {label}
                {optional && (
                    <span className="rounded-full bg-[var(--inv-ink)]/10 px-2 py-0.5 text-[11px] font-normal">
                        opsional
                    </span>
                )}
            </span>
            <input
                name={name}
                className="h-12 w-full rounded-2xl border-2 border-[var(--inv-ink)] bg-white px-4 text-base text-[var(--inv-ink)] shadow-[3px_3px_0_var(--inv-gold)] outline-none transition placeholder:text-[var(--inv-ink)]/40 focus:border-[var(--inv-primary)] focus:shadow-[3px_3px_0_var(--inv-primary)]"
                {...inputProps}
            />
        </label>
    );
}

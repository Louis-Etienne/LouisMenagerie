import { AppWindow, Cpu, Gamepad2, Globe, Terminal } from "lucide-react";
import { type ComponentProps, useId } from "react";
import type { CategoryId } from "@/lib/projects";
import { cn } from "@/lib/utils";

type IconProps = ComponentProps<"svg">;

export function WindowsFlag({ className, ...props }: IconProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<path
				d="M2 6.5c4-1.8 8-1.8 12.5.4L13 15c-4.3-2-8-2-12 0z"
				fill="#f25022"
			/>
			<path
				d="M15.5 7.3c4.4 2.1 8.4 2.2 13 .2L27 15.6c-4.4 2-8.4 1.9-13-.2z"
				fill="#7fba00"
			/>
			<path
				d="M.8 16.6c4-1.9 7.8-1.9 12 .1l-1.4 8.2C7.2 23 3.6 23-.6 24.8z"
				fill="#00a4ef"
			/>
			<path
				d="M14.1 17.4c4.5 2.1 8.5 2.2 12.7.2l-1.5 8.2c-4.4 2-8.3 1.9-12.6-.2z"
				fill="#ffb900"
			/>
		</svg>
	);
}

export function IEIcon({ className, ...props }: IconProps) {
	const uid = useId().replace(/[^\w-]/g, "");
	return (
		<svg
			viewBox="0 0 32 32"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<defs>
				<linearGradient id={`${uid}ie-e`} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#7cc4ff" />
					<stop offset="1" stopColor="#0b5bd3" />
				</linearGradient>
				<linearGradient id={`${uid}ie-ring`} x1="0" y1="0" x2="1" y2="1">
					<stop offset="0" stopColor="#ffe17a" />
					<stop offset="1" stopColor="#e89a0c" />
				</linearGradient>
			</defs>
			<path
				d="M16 5.5c-6.4 0-10.5 4.6-10.5 10.7 0 6 4.2 10.3 10.6 10.3 4.5 0 7.9-2.2 9.4-5.8h-6.1c-.8 1-1.9 1.5-3.3 1.5-2.4 0-4-1.5-4.3-3.9h14.1c.1-.6.1-1.2.1-1.8C26 9.9 22 5.5 16 5.5Zm-4.2 8.6c.4-2.2 2-3.6 4.2-3.6s3.8 1.4 4 3.6Z"
				fill={`url(#${uid}ie-e)`}
				stroke="#063b94"
				strokeWidth=".8"
			/>
			<path
				d="M29.5 4.2c-2-2-7.6.2-13.7 5.3l2.3.6C23 6.6 26.7 5.3 27.8 6.4c1.3 1.3-.6 5.8-4.8 10.9l.9 2.2c5.6-6.3 7.9-13 5.6-15.3ZM8.3 21.1C4.7 25.9 3.4 29.6 4.6 30.8c1.3 1.3 5.6-.4 10.5-4.4l-2.2-.8c-3 2.2-5.3 3-6 2.3-.7-.7.2-3.1 2.3-6.1Z"
				fill={`url(#${uid}ie-ring)`}
				stroke="#9a5a00"
				strokeWidth=".5"
			/>
		</svg>
	);
}

export function FolderIcon({ className, ...props }: IconProps) {
	const uid = useId().replace(/[^\w-]/g, "");
	return (
		<svg
			viewBox="0 0 32 32"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<defs>
				<linearGradient id={`${uid}folder-front`} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#fff2b0" />
					<stop offset="1" stopColor="#f2c445" />
				</linearGradient>
			</defs>
			<path
				d="M2 7.5A1.5 1.5 0 0 1 3.5 6h8l2.5 3h14.5A1.5 1.5 0 0 1 30 10.5v15a1.5 1.5 0 0 1-1.5 1.5h-25A1.5 1.5 0 0 1 2 25.5z"
				fill="#d9a520"
				stroke="#a47612"
			/>
			<path
				d="M3.2 12.5A1.5 1.5 0 0 1 4.7 11h24.6a1 1 0 0 1 1 1.2l-1.9 13.6a1.5 1.5 0 0 1-1.5 1.2H3.5A1 1 0 0 1 2.5 26z"
				fill={`url(#${uid}folder-front)`}
				stroke="#c08d1a"
			/>
		</svg>
	);
}

export function RecycleBinIcon({ className, ...props }: IconProps) {
	const uid = useId().replace(/[^\w-]/g, "");
	return (
		<svg
			viewBox="0 0 32 32"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<defs>
				<linearGradient id={`${uid}bin`} x1="0" y1="0" x2="1" y2="0">
					<stop offset="0" stopColor="#c9dcf2" />
					<stop offset=".5" stopColor="#f6fbff" />
					<stop offset="1" stopColor="#a9c3e2" />
				</linearGradient>
			</defs>
			<ellipse
				cx="16"
				cy="7"
				rx="10"
				ry="2.6"
				fill="#dbe8f6"
				stroke="#6d8db5"
			/>
			<path
				d="M6 7.2 8.4 27a2 2 0 0 0 2 1.8h11.2a2 2 0 0 0 2-1.8L26 7.2c-1.5 1.4-5.5 2.2-10 2.2S7.5 8.6 6 7.2Z"
				fill={`url(#${uid}bin)`}
				stroke="#6d8db5"
			/>
			<path
				d="m13 15 2-3 2 3m-4 0 1.5.3m3-3.3 2.5 4.5-2 3.5m-6 0-2-3.5 1-1.7"
				fill="none"
				stroke="#2f9a3a"
				strokeWidth="1.4"
				strokeLinecap="round"
			/>
		</svg>
	);
}

const categoryIcons = {
	games: { icon: Gamepad2, color: "text-[#7b3fbf]" },
	softwares: { icon: AppWindow, color: "text-[#1f5fc4]" },
	websites: { icon: Globe, color: "text-[#1b8f5a]" },
	console: { icon: Terminal, color: "text-[#2b2b2b]" },
	hardware: { icon: Cpu, color: "text-[#b5541b]" },
} satisfies Record<CategoryId, { icon: typeof Globe; color: string }>;

export function CategoryIcon({
	category,
	className,
}: {
	category: CategoryId;
	className?: string;
}) {
	const { icon: Icon, color } = categoryIcons[category];
	return <Icon className={cn(color, className)} aria-hidden="true" />;
}

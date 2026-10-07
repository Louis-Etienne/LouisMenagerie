import type { CSSProperties } from "react";

type Cloud = {
	y: number;
	scale: number;
	duration: number;
	delay: number;
	opacity: number;
	puffs: [cx: number, cy: number, rx: number, ry: number][];
};

const puffy: Cloud["puffs"] = [
	[0, 0, 150, 42],
	[-90, 10, 90, 30],
	[100, 8, 110, 34],
	[-20, -26, 80, 36],
	[60, -18, 70, 30],
];

const streak: Cloud["puffs"] = [
	[0, 0, 260, 16],
	[140, -10, 160, 12],
	[-160, 8, 140, 10],
];

const clouds: Cloud[] = [
	{ y: 170, scale: 1.7, duration: 220, delay: -30, opacity: 1, puffs: puffy },
	{
		y: 95,
		scale: 1.1,
		duration: 280,
		delay: -190,
		opacity: 0.8,
		puffs: streak,
	},
	{
		y: 300,
		scale: 1.3,
		duration: 190,
		delay: -110,
		opacity: 0.95,
		puffs: puffy,
	},
	{
		y: 230,
		scale: 0.9,
		duration: 320,
		delay: -15,
		opacity: 0.75,
		puffs: streak,
	},
	{ y: 380, scale: 1, duration: 170, delay: -75, opacity: 0.9, puffs: puffy },
	{
		y: 60,
		scale: 1.9,
		duration: 360,
		delay: -250,
		opacity: 0.65,
		puffs: streak,
	},
	{
		y: 430,
		scale: 0.75,
		duration: 160,
		delay: -140,
		opacity: 0.85,
		puffs: puffy,
	},
	{
		y: 130,
		scale: 1.4,
		duration: 240,
		delay: -160,
		opacity: 0.9,
		puffs: puffy,
	},
	{
		y: 340,
		scale: 1.2,
		duration: 300,
		delay: -230,
		opacity: 0.7,
		puffs: streak,
	},
];

export function BlissBackground() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden"
		>
			<svg
				aria-hidden="true"
				viewBox="0 0 1920 1080"
				preserveAspectRatio="xMidYMid slice"
				className="size-full"
			>
				<defs>
					<linearGradient id="bliss-sky" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#0a4fc2" />
						<stop offset="0.3" stopColor="#2f7fe0" />
						<stop offset="0.55" stopColor="#79b6f2" />
						<stop offset="0.7" stopColor="#c4e0fa" />
					</linearGradient>
					<radialGradient id="bliss-sun" cx="0.3" cy="0.15" r="0.6">
						<stop offset="0" stopColor="#fffbe6" stopOpacity="0.85" />
						<stop offset="0.4" stopColor="#ffffff" stopOpacity="0.15" />
						<stop offset="1" stopColor="#ffffff" stopOpacity="0" />
					</radialGradient>
					<linearGradient id="bliss-hill" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#8fd14f" />
						<stop offset="0.25" stopColor="#5fb32e" />
						<stop offset="0.7" stopColor="#3f8f1f" />
						<stop offset="1" stopColor="#2d6e14" />
					</linearGradient>
					<radialGradient id="bliss-hill-light" cx="0.35" cy="0.25" r="0.55">
						<stop offset="0" stopColor="#d7f59b" stopOpacity="0.75" />
						<stop offset="0.5" stopColor="#a8e05f" stopOpacity="0.25" />
						<stop offset="1" stopColor="#a8e05f" stopOpacity="0" />
					</radialGradient>
					<linearGradient id="bliss-back-hill" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#4f9a2c" />
						<stop offset="1" stopColor="#2b6a17" />
					</linearGradient>
					<linearGradient id="bliss-wind" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor="#f4ffd0" stopOpacity="0" />
						<stop offset="0.5" stopColor="#f4ffd0" stopOpacity="0.9" />
						<stop offset="1" stopColor="#f4ffd0" stopOpacity="0" />
					</linearGradient>
					<filter id="bliss-blur" x="-50%" y="-50%" width="200%" height="200%">
						<feGaussianBlur stdDeviation="11" />
					</filter>
					<filter id="bliss-soft" x="-10%" y="-10%" width="120%" height="120%">
						<feGaussianBlur stdDeviation="3" />
					</filter>
				</defs>

				<g className="bliss-scene">
					<rect width="1920" height="1080" fill="url(#bliss-sky)" />
					<rect
						className="bliss-sun"
						width="1920"
						height="1080"
						fill="url(#bliss-sun)"
					/>

					{clouds.map((cloud) => (
						<g
							key={`${cloud.y}-${cloud.duration}`}
							className="bliss-cloud"
							style={
								{
									animationDuration: `${cloud.duration}s`,
									animationDelay: `${cloud.delay}s`,
								} as CSSProperties
							}
						>
							<g
								transform={`translate(0 ${cloud.y}) scale(${cloud.scale})`}
								opacity={cloud.opacity}
								filter="url(#bliss-blur)"
							>
								{cloud.puffs.map(([cx, cy, rx, ry]) => (
									<ellipse
										key={`${cx}-${cy}`}
										cx={cx}
										cy={cy}
										rx={rx}
										ry={ry}
										fill="#ffffff"
									/>
								))}
							</g>
						</g>
					))}

					<path
						d="M960 720 C1250 560 1600 545 1920 600 V1080 H960 Z"
						fill="url(#bliss-back-hill)"
						filter="url(#bliss-soft)"
						opacity="0.9"
					/>
					<path
						d="M-20 690 C320 560 720 520 1060 585 C1360 645 1660 760 1940 815 V1080 H-20 Z"
						fill="url(#bliss-hill)"
					/>
					<path
						d="M-20 690 C320 560 720 520 1060 585 C1360 645 1660 760 1940 815 V1080 H-20 Z"
						fill="url(#bliss-hill-light)"
					/>
					<path
						className="bliss-wind"
						d="M120 700 C420 610 760 590 1040 640 C1260 680 1420 740 1600 790"
						stroke="url(#bliss-wind)"
						strokeWidth="60"
						fill="none"
						filter="url(#bliss-blur)"
					/>
					<path
						d="M-20 960 C480 880 1180 890 1940 990 V1080 H-20 Z"
						fill="#245d10"
						opacity="0.45"
						filter="url(#bliss-soft)"
					/>
				</g>
			</svg>
		</div>
	);
}

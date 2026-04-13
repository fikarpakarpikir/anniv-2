import Image from "next/image";

export function PhotoSlot({ src, alt = "", className = "", label = "FOTO" }) {
	if (src)
		return (
			<Image
				src={src}
				alt={alt}
                fill
				className={`w-full h-full object-cover ${className}`}
			/>
		);
	return (
		<div
			className={`w-full h-full flex items-center justify-center ${className}`}
			style={{ background: "var(--primary2)" }}>
			<span
				className='font-cinzel text-[9px] tracking-widest uppercase text-center leading-loose'
				style={{ color: "var(--primary)" }}>
				{label}
				<br />✦
			</span>
		</div>
	);
}

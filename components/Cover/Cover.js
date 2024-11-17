import Image from "next/image";

export const Cover = ({ children, background, blocks  }) => {
    let coverClasses = " text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center ";
    let imageClasses = "mix-blend-soft-light object-cover";

    if (blocks === 13) {
        coverClasses += " h-screen ";
    } else if (blocks === 243) {
        coverClasses += " h-[600px] rounded-tl-[550px] rounded-bl-[550px]";
        imageClasses += " rounded-tl-[550px] rounded-bl-[550px]";
    } else {
        coverClasses += " h-[500px] ";
    }
    return (
        <div className={coverClasses.trim()}>
            <Image 
                alt="cover" 
                src={background} 
                fill    
                className={imageClasses}
            />
            <div className="max-w-5xl z-10">
                {children}
            </div>
        </div>
    );
};
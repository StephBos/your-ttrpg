import { Metal_Mania } from "next/font/google"
import { Pirata_One } from "next/font/google"

interface RulesetCardProps {
   title: string
   description: string
   game: string
   backgroundImageUrl: string
}

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })
const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

export default function RulesetCard({
   title,
   description,
   game,
   backgroundImageUrl,
}: RulesetCardProps) {
   return (
      <button className="flex flex-col border-4 border-[#5C4033] p-4 rounded-lg bg-[#395144] shadow-lg z-10 w-60 h-80 gap-2 cursor-pointer hover:bg-[#4E6C50]/80">
         <h1 className={`text-2xl text-[#AA8B56] ${pirataOne.className}`}>{title.toUpperCase()}</h1>
         <img
            className="w-full h-30 object-cover rounded border-2 p-1 border-[#AA8B56]"
            src={backgroundImageUrl}
            alt="Background Preview"
         />
         <p className="text-start">{description}</p>
         <p className="text-start">Game: {game}</p>
      </button>
   )
}


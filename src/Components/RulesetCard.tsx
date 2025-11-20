import { Metal_Mania } from "next/font/google"
import { Pirata_One } from "next/font/google"
import Link from "next/link"

interface RulesetCardProps {
   id: string
   title: string
   description: string
   game: string
   backgroundImageUrl: string
   slug: string
   username: string
}

const metalMania = Metal_Mania({ subsets: ['latin'], weight: '400' })
const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

export default function RulesetCard({
   id,
   title,
   description,
   game,
   backgroundImageUrl,
   slug,
   username
}: RulesetCardProps) {

   console.log('RulesetCard slug:', slug)

   return (
      <Link className="flex flex-col border-4 border-[#5C4033] p-4 rounded-lg bg-[#395144] shadow-lg z-10 w-60 h-80 gap-2 cursor-pointer hover:bg-[#4E6C50]/80" href={`/${username}/${slug}${id}`}>
         <h1 className={`text-2xl text-[#AA8B56] ${pirataOne.className}`}>{title.toUpperCase()}</h1>
         <img
            className="w-full h-30 object-cover rounded border-2 p-1 border-[#AA8B56]"
            src={backgroundImageUrl}
            alt="Background Preview"
         />
         <div className="text-start p-3 bg-[#F3E2C7] text-black rounded">
            <h1 className="underline">Description</h1>
            <p className="pb-3">{description}</p>
            <hr className="border-[#5C4033] border-t-2"/>
            <p className="text-center pt-2">{game}</p>
         </div>
      </Link>
   )
}


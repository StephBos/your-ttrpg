interface RulesetCardProps {
   title: string
   description: string
   game: string
   backgroundImageUrl: string
}

export default function RulesetCard({
   title,
   description,
   game,
   backgroundImageUrl,
}: RulesetCardProps) {
   console.log('Rendering RulesetCard with props:', {
      title,
      description,
      game,
      backgroundImageUrl,
   })

   return (
      <button className="flex flex-col border p-4 rounded-lg shadow-lg z-10 w-60 h-80 gap-2">
         <h1 className="text-2xl">{title.toUpperCase()}</h1>
         <img src={backgroundImageUrl} alt={`${title} background`} />
         <p>{description}</p>
         <p>Game: {game}</p>
      </button>
   )
}

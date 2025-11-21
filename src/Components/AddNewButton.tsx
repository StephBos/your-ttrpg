interface AddNewButtonProps {
   action: string
   onClick?: () => void
}

export default function AddNewButton(action: AddNewButtonProps) {
   return (
      <button className="
         cursor-pointer
         border-4
         border-[#2C2C2C]
         rounded-[7px]
         w-[200px]
         h-[50px]
         bg-[#5C4033]
         text-[#AA8B56]
         text-base
         font-semibold
         hover:bg-[#6D5140]
         "
         onClick={action.onClick}
      >
         {action.action}
      </button>
   )
}

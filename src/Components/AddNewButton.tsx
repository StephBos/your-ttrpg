interface AddNewButtonProps {
   action: string
   onClick?: () => void
   disabled?: boolean
}

export default function AddNewButton(action: AddNewButtonProps) {
   console.log('AddNewButton props:', action)
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
         disabled:opacity-50
         disabled:cursor-not-allowed
         "
         onClick={action.onClick}
         disabled={action.disabled}
      >
         {action.action}
      </button>
   )
}

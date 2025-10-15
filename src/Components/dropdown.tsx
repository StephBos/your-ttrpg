import React, { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props {
   options: string[]
   onSelect?: (value: string) => void
   selectMessage: string
}

export default function Dropdown({
   options,
   onSelect,
   selectMessage = 'Select an option',
}: Props) {
   const [selected, setSelected] = useState(selectMessage)

   React.useEffect(() => {
      setSelected(selectMessage)
   }, [selectMessage])

   const handleSelect = (value: string) => {
      setSelected(value)
      onSelect?.(value)
   }

   return (
      <Menu as="div" className="relative inline-block w-full">
         <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 hover:bg-white/20">
            <ChevronDownIcon
               aria-hidden="true"
               className="-mr-1 size-5 text-gray-400"
            />
            {selected}
         </MenuButton>

         <MenuItems
            className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
         >
            {options.map((option) => (
               <MenuItem key={option}>
                  <button
                     onClick={() => handleSelect(option)}
                     className="px-4 py-2 cursor-pointer text-white hover:bg-stone-600 transition-colors w-full"
                  >
                     {option}
                  </button>
               </MenuItem>
            ))}
         </MenuItems>
      </Menu>
   )
}

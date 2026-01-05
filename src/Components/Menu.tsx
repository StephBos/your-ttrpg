import { Pirata_One } from 'next/font/google'
import AddNewButton from './AddNewButton'
import SectionDropdownButton from './SectionDropdownButton'
import React, {useState} from 'react'

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' })

export default function Menu({ onAddNew, onUploadFile }) {

   return (
      <div className="fixed top-0 left-0 h-screen w-1/5 bg-[#4E6C50] z-10 flex flex-col p-4 gap-6 mt-20 items-center overflow-y-auto">
         <div className="w-full flex flex-row items-center gap-4">
            <AddNewButton action='Add New' onClick={ onAddNew }/>
            <AddNewButton action='Upload File' onClick={onUploadFile}/>
         </div>
         

         <SectionDropdownButton sectionName={'Classes'} />
         <SectionDropdownButton sectionName={'Backgrounds'} />
         <SectionDropdownButton sectionName={'Species'} />
         <SectionDropdownButton sectionName={'Feats'} />
         <SectionDropdownButton sectionName={'Spells'} />
         <SectionDropdownButton sectionName={'Items'} />
         <SectionDropdownButton sectionName={'Equipment'} />
         <SectionDropdownButton sectionName={'Monsters'} />
      </div>
   )
}

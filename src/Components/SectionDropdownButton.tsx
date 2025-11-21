import React from 'react';
import { Pirata_One } from 'next/font/google';
import CircleLineUnderline from './CircleLineUnderline';

const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400' });

interface SectionDropdownButtonProps {
  sectionName: string;
}

export default function SectionDropdownButton({ sectionName }: SectionDropdownButtonProps) {
  return (
    <button
      className={`flex flex-col items-center gap-0 text-2xl text-amber-200 text-center cursor-pointer ${pirataOne.className} p-0`}
    >
      <span className="leading-none">{sectionName}</span>
      <CircleLineUnderline />
      <span className="text-lg -mt-2 leading-none">︾</span>
    </button>
  );
}




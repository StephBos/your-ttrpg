import React from 'react'

interface FileOptionsProps {
   file: File
   onChange?: (pageHints: PageHint[]) => void
}

type EntityType =
   | 'class'
   | 'subclass'
   | 'background'
   | 'feat'
   | 'spell'
   | 'species'
   | 'item'
   | 'equipment'
   | 'monster'

interface PageHint {
   type: EntityType
   startPage: number
   endPage: number
}

const ENTITY_TYPES: { label: string; type: EntityType }[] = [
   { label: 'Classes', type: 'class' },
   { label: 'Subclasses', type: 'subclass' },
   { label: 'Backgrounds', type: 'background' },
   { label: 'Feats', type: 'feat' },
   { label: 'Spells', type: 'spell' },
   { label: 'Species / Races', type: 'species' },
   { label: 'Items', type: 'item' },
   { label: 'Equipment', type: 'equipment' },
   { label: 'Monsters', type: 'monster' },
]

export default function FileOptions({ file, onChange }: FileOptionsProps) {
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({})

  function toggle(type: string, value: boolean) {
    setEnabled(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ENTITY_TYPES.map(entity => {
          const isEnabled = !!enabled[entity.type]

          return (
            <div
              key={entity.type}
              className="flex flex-col gap-3 p-4 rounded-lg bg-gray-800"
            >
              <h3 className="text-center font-semibold text-amber-200">
                {entity.label}
              </h3>

              {/* Include */}
              <label className="flex flex-col items-center text-white text-sm">
                <span className="mb-1">Include</span>
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={e => toggle(entity.type, e.target.checked)}
                  className="h-5 w-5 accent-amber-400"
                />
              </label>

              {/* Page range */}
              <div className="flex justify-center gap-3">
                <input
                  type="number"
                  min={1}
                  disabled={!isEnabled}
                  placeholder="Start Page"
                  className={`w-28 p-1 rounded text-center ${
                    isEnabled
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                />

                <input
                  type="number"
                  min={1}
                  disabled={!isEnabled}
                  placeholder="End Page"
                  className={`w-28 p-1 rounded text-center ${
                    isEnabled
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

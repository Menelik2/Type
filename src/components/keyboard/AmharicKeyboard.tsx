import { useState } from 'react'
import { Delete, Space } from 'lucide-react'
import { cn } from '../../lib/utils'

/**
 * Simple virtual Amharic (Fidel) keyboard for mobile & practice.
 * Shows one family at a time or a compact common set.
 */

type Props = {
  onKey: (char: string) => void
  onBackspace: () => void
  onSpace?: () => void
  activeFamily?: string[]
  className?: string
}

const DEFAULT_KEYS = [
  ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ'],
  ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ'],
  ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ'],
  ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ'],
  ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ'],
]

export default function AmharicKeyboard({
  onKey,
  onBackspace,
  onSpace,
  activeFamily,
  className,
}: Props) {
  const rows = activeFamily
    ? [activeFamily]
    : DEFAULT_KEYS

  return (
    <div className={cn('select-none rounded-2xl border border-gray-200 bg-gray-50 p-2', className)}>
      {rows.map((row, ri) => (
        <div key={ri} className="mb-1.5 flex justify-center gap-1.5 last:mb-0">
          {row.map((char) => (
            <button
              key={char}
              type="button"
              onClick={() => onKey(char)}
              className="flex h-11 min-w-[2.5rem] flex-1 items-center justify-center rounded-xl bg-white text-lg font-medium text-gray-900 shadow-sm transition active:bg-indigo-100 active:scale-95 hover:bg-indigo-50"
            >
              {char}
            </button>
          ))}
        </div>
      ))}

      <div className="mt-1.5 flex gap-1.5">
        <button
          type="button"
          onClick={onBackspace}
          className="flex h-11 flex-1 items-center justify-center gap-1 rounded-xl bg-gray-200 text-sm font-medium text-gray-700 transition active:bg-gray-300"
        >
          <Delete className="h-4 w-4" />
          Del
        </button>
        {onSpace && (
          <button
            type="button"
            onClick={onSpace}
            className="flex h-11 flex-[2] items-center justify-center gap-1 rounded-xl bg-gray-200 text-sm font-medium text-gray-700 transition active:bg-gray-300"
          >
            <Space className="h-4 w-4" />
            Space
          </button>
        )}
      </div>
    </div>
  )
}

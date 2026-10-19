/** Track which vocab cards the learner has marked as known. */

const KEY = 'type_vocab_known'

function read(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    return new Set(JSON.parse(raw) as string[])
  } catch {
    return new Set()
  }
}

function write(ids: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...ids]))
}

export function isVocabKnown(id: string): boolean {
  return read().has(id)
}

export function toggleVocabKnown(id: string): boolean {
  const s = read()
  if (s.has(id)) s.delete(id)
  else s.add(id)
  write(s)
  return s.has(id)
}

export function getKnownCount(): number {
  return read().size
}

export function getKnownIds(): string[] {
  return [...read()]
}

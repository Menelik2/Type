import { describe, it, expect, beforeEach } from 'vitest'
import {
  calcAccuracy,
  calcWpm,
  compareInput,
  graphemes,
  saveTypingResult,
  getTypingResults,
  bestWpm,
} from './typing'

beforeEach(() => {
  localStorage.clear()
})

describe('graphemes', () => {
  it('splits English', () => {
    expect(graphemes('Hi')).toEqual(['H', 'i'])
  })

  it('handles Amharic characters', () => {
    const g = graphemes('ሰላም')
    expect(g.length).toBe(4)
    expect(g.join('')).toBe('ሰላም')
  })
})

describe('metrics', () => {
  it('calculates accuracy', () => {
    expect(calcAccuracy(8, 10)).toBe(80)
    expect(calcAccuracy(0, 0)).toBe(100)
  })

  it('calculates WPM', () => {
    expect(calcWpm(50, 60000)).toBe(10)
    expect(calcWpm(0, 1000)).toBe(0)
    expect(calcWpm(10, 0)).toBe(0)
  })
})

describe('compareInput', () => {
  it('marks correct and incorrect', () => {
    const { statuses, correct, errors } = compareInput('abc', 'axc')
    expect(correct).toBe(2)
    expect(errors).toBe(1)
    expect(statuses[0]).toBe('correct')
    expect(statuses[1]).toBe('incorrect')
    expect(statuses[2]).toBe('correct')
  })

  it('marks current at caret when partially typed', () => {
    const { statuses } = compareInput('hello', 'he')
    expect(statuses[0]).toBe('correct')
    expect(statuses[1]).toBe('correct')
    expect(statuses[2]).toBe('current')
    expect(statuses[3]).toBe('pending')
  })

  it('marks first char current when empty', () => {
    const { statuses } = compareInput('ab', '')
    expect(statuses[0]).toBe('current')
    expect(statuses[1]).toBe('pending')
  })
})

describe('results store', () => {
  it('saves and ranks best WPM', () => {
    saveTypingResult({
      lang: 'en',
      passageId: 'en-hello',
      wpm: 40,
      accuracy: 95,
      correctChars: 20,
      totalTyped: 21,
      durationMs: 15000,
    })
    saveTypingResult({
      lang: 'en',
      passageId: 'en-hello',
      wpm: 55,
      accuracy: 90,
      correctChars: 25,
      totalTyped: 28,
      durationMs: 12000,
    })
    expect(getTypingResults().length).toBe(2)
    expect(bestWpm('en')).toBe(55)
  })
})

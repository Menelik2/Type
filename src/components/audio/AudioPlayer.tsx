import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Volume2, AlertCircle } from 'lucide-react'
import { cn } from '../../lib/utils'

type Props = {
  /** Remote audio URL (Supabase Storage or CDN). Optional if using TTS. */
  src?: string
  /** Text for browser SpeechSynthesis fallback (English works best). */
  ttsText?: string
  /** BCP-47 language tag for TTS, e.g. 'en-US' or 'am-ET' */
  ttsLang?: string
  label?: string
  className?: string
}

/**
 * Audio player with:
 * - HTML5 audio when `src` is provided
 * - SpeechSynthesis TTS fallback when only `ttsText` is provided
 * - Playback rate control, replay, honest error state
 */
export default function AudioPlayer({
  src,
  ttsText,
  ttsLang = 'en-US',
  label,
  className,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rate, setRate] = useState(1)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [ttsSupported, setTtsSupported] = useState(false)

  const useTts = !src && !!ttsText

  useEffect(() => {
    setTtsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  useEffect(() => {
    if (!src) return
    const el = new Audio(src)
    audioRef.current = el
    el.playbackRate = rate

    const onTime = () => {
      setProgress(el.currentTime)
      setDuration(el.duration || 0)
    }
    const onEnded = () => setPlaying(false)
    const onErr = () => {
      setError('Audio could not be loaded.')
      setPlaying(false)
    }

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnded)
    el.addEventListener('error', onErr)
    el.addEventListener('loadedmetadata', onTime)

    return () => {
      el.pause()
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnded)
      el.removeEventListener('error', onErr)
      el.removeEventListener('loadedmetadata', onTime)
      audioRef.current = null
    }
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate])

  const stopTts = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setPlaying(false)
  }

  const playTts = () => {
    if (!ttsText || !ttsSupported) {
      setError('Speech synthesis is not available in this browser.')
      return
    }
    stopTts()
    const u = new SpeechSynthesisUtterance(ttsText)
    u.lang = ttsLang
    u.rate = rate
    u.onend = () => setPlaying(false)
    u.onerror = () => {
      setError('Could not play speech. Try another browser or upload real audio later.')
      setPlaying(false)
    }
    setError(null)
    setPlaying(true)
    window.speechSynthesis.speak(u)
  }

  const toggle = () => {
    setError(null)
    if (useTts) {
      if (playing) stopTts()
      else playTts()
      return
    }
    const el = audioRef.current
    if (!el) {
      setError('No audio source available.')
      return
    }
    if (playing) {
      el.pause()
      setPlaying(false)
    } else {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => {
          setError('Playback failed. Check the audio file or browser permissions.')
          setPlaying(false)
        })
    }
  }

  const replay = () => {
    setError(null)
    if (useTts) {
      playTts()
      return
    }
    const el = audioRef.current
    if (!el) return
    el.currentTime = 0
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setError('Replay failed.'))
  }

  const noSource = !src && !ttsText

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-100 bg-white p-4 shadow-sm',
        className
      )}
    >
      {label && (
        <p className="mb-3 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
          <Volume2 className="h-3.5 w-3.5" />
          {label}
        </p>
      )}

      {noSource ? (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Audio not available for this item yet.
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </button>

            <div className="min-w-0 flex-1">
              {!useTts && duration > 0 && (
                <div className="mb-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${(progress / duration) * 100}%` }}
                  />
                </div>
              )}
              <div className="flex items-center justify-between gap-2 text-xs text-gray-500">
                <span>
                  {useTts
                    ? playing
                      ? 'Playing (TTS)…'
                      : 'Tap play · browser voice'
                    : formatTime(progress) + ' / ' + formatTime(duration)}
                </span>
                <div className="flex items-center gap-1">
                  {[0.75, 1, 1.25].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRate(r)}
                      className={cn(
                        'rounded px-1.5 py-0.5 font-medium transition',
                        rate === r
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-400 hover:text-gray-700'
                      )}
                    >
                      {r}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={replay}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              aria-label="Replay"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {useTts && (
            <p className="mt-2 text-xs text-gray-400">
              Using browser text-to-speech. Real recorded audio can replace this later via Supabase Storage.
            </p>
          )}
        </>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
    </div>
  )
}

function formatTime(s: number) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

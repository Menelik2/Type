import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Volume2, AlertCircle } from 'lucide-react'
import { speak, stopSpeaking, isTtsAvailable, loadVoices } from '../../lib/voice'
import { cn } from '../../lib/utils'

type Props = {
  src?: string
  ttsText?: string
  ttsLang?: string
  label?: string
  className?: string
}

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
  const [ttsOk, setTtsOk] = useState(false)
  const playIdRef = useRef(0)
  const playingRef = useRef(false)

  const useTts = !src && !!ttsText?.trim()

  const setPlayingSafe = (v: boolean) => {
    playingRef.current = v
    setPlaying(v)
  }

  useEffect(() => {
    setTtsOk(isTtsAvailable())
    void loadVoices()
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
    const onEnded = () => setPlayingSafe(false)
    const onErr = () => {
      setError('Audio could not be loaded.')
      setPlayingSafe(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rate applied in separate effect
  }, [src])

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = rate
  }, [rate])

  // Only stop if this instance was actively playing (avoids React StrictMode killing TTS)
  useEffect(() => {
    return () => {
      playIdRef.current += 1
      if (playingRef.current) {
        stopSpeaking()
        audioRef.current?.pause()
      }
    }
  }, [])

  const playTts = async () => {
    if (!ttsText?.trim()) {
      setError('No text to speak.')
      return
    }
    if (!isTtsAvailable()) {
      setError('Speech is not supported here. Open in Chrome or Edge on desktop.')
      return
    }

    const id = ++playIdRef.current
    setError(null)
    setPlayingSafe(true)

    const ok = await speak(ttsText, {
      lang: ttsLang,
      rate,
      onStart: () => {
        if (id === playIdRef.current) setPlayingSafe(true)
      },
      onEnd: () => {
        if (id === playIdRef.current) setPlayingSafe(false)
      },
      onError: (msg) => {
        if (id === playIdRef.current) {
          setError(msg)
          setPlayingSafe(false)
        }
      },
    })

    if (id === playIdRef.current && !ok) {
      setPlayingSafe(false)
    }
  }

  const stopAll = () => {
    playIdRef.current += 1
    stopSpeaking()
    audioRef.current?.pause()
    setPlayingSafe(false)
  }

  const toggle = () => {
    setError(null)
    if (useTts) {
      if (playingRef.current) stopAll()
      else void playTts()
      return
    }
    const el = audioRef.current
    if (!el) {
      setError('No audio source available.')
      return
    }
    if (playingRef.current) {
      el.pause()
      setPlayingSafe(false)
    } else {
      el.play()
        .then(() => setPlayingSafe(true))
        .catch(() => {
          setError('Playback failed. Unmute the tab and try again.')
          setPlayingSafe(false)
        })
    }
  }

  const replay = () => {
    setError(null)
    if (useTts) {
      void playTts()
      return
    }
    const el = audioRef.current
    if (!el) return
    el.currentTime = 0
    el.play()
      .then(() => setPlayingSafe(true))
      .catch(() => setError('Replay failed.'))
  }

  const noSource = !src && !ttsText?.trim()

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
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
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
                      ? 'Speaking…'
                      : ttsOk
                        ? 'Tap play'
                        : 'TTS unavailable'
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
              Browser voice · unmute device · Chrome/Edge recommended
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

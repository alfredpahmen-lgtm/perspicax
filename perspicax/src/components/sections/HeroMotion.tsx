"use client";

import { useEffect, useRef } from "react";

/**
 * Gives the hero a response channel: scroll position and pointer position drive
 * three parallax layers, smoothed by a critically damped spring so the motion
 * starts from wherever it currently is and never overshoots.
 *
 * Deliberately hand-rolled rather than pulling in a spring library — this site
 * has no gestures, so there is no release velocity to inherit and nothing to
 * interrupt mid-flight. What is needed is continuous, non-jittery smoothing of a
 * scroll value, which is ~40 lines.
 *
 * Writes `--hero-scroll`, `--hero-px` and `--hero-py` on the section; the layer
 * transforms that consume them live in globals.css. Transform/opacity only.
 */

/** Apple's two spring parameters: response in seconds, damping ratio 1.0 (no overshoot). */
const RESPONSE = 0.4;
const OMEGA = (2 * Math.PI) / RESPONSE;
const STIFFNESS = OMEGA * OMEGA;
const DAMPING = 2 * OMEGA;

/** Below this distance and speed the spring has visually arrived. */
const EPSILON = 0.0005;

type Axis = { value: number; velocity: number; target: number };

const axis = (): Axis => ({ value: 0, velocity: 0, target: 0 });

/** Semi-implicit Euler step. Returns true once the axis has settled. */
function step(a: Axis, dt: number): boolean {
  const displacement = a.value - a.target;
  const acceleration = -STIFFNESS * displacement - DAMPING * a.velocity;
  a.velocity += acceleration * dt;
  a.value += a.velocity * dt;

  if (Math.abs(a.value - a.target) < EPSILON && Math.abs(a.velocity) < EPSILON) {
    a.value = a.target;
    a.velocity = 0;
    return true;
  }
  return false;
}

export default function HeroMotion({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const video = el.querySelector("video");

    // The clip was authored at a pace that reads as busy behind a headline about
    // a whisper. At 0.55x the same footage drifts rather than moves, which is
    // the tone the copy is asking for, and it is still clearly in motion — below
    // roughly 0.4x it stops reading as video and starts reading as a stutter.
    //
    // Looping does not reset playbackRate (only changing `src` does), so one
    // assignment holds for every pass. It is applied again on `loadedmetadata`
    // because setting it before the media loads is not guaranteed to stick.
    const RATE = 0.55;
    const applyRate = () => {
      if (!video) return;
      // `defaultPlaybackRate` is the value the element restores to whenever the
      // UA resets playback rate (notably on load). Setting both means the rate
      // holds even if none of the handlers below happen to fire first.
      video.defaultPlaybackRate = RATE;
      video.playbackRate = RATE;
    };
    applyRate();
    video?.addEventListener("loadedmetadata", applyRate);

    let frame = 0;
    let last = 0;
    let running = false;
    const scroll = axis();
    const px = axis();
    const py = axis();

    const write = () => {
      el.style.setProperty("--hero-scroll", scroll.value.toFixed(4));
      el.style.setProperty("--hero-px", px.value.toFixed(4));
      el.style.setProperty("--hero-py", py.value.toFixed(4));
    };

    const tick = (now: number) => {
      // Clamp dt so a backgrounded tab doesn't resume with one enormous step.
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      const settled = [step(scroll, dt), step(px, dt), step(py, dt)].every(Boolean);
      write();

      if (settled) {
        running = false;
        // Drop the compositor promotion while nothing is moving — `will-change`
        // holds GPU memory for as long as it is declared.
        el.dataset.heroSettled = "true";
        return;
      }
      frame = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running) return;
      running = true;
      delete el.dataset.heroSettled;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const height = el.offsetHeight || 1;
      scroll.target = Math.min(Math.max(window.scrollY / height, 0), 1);
      wake();
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      px.target = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 2 - 1, -1), 1);
      py.target = Math.min(Math.max(((e.clientY - rect.top) / rect.height) * 2 - 1, -1), 1);
      wake();
    };

    const onPointerLeave = () => {
      px.target = 0;
      py.target = 0;
      wake();
    };

    // A full-viewport moving background is exactly what reduced motion is for:
    // hold the still frame instead of autoplaying, and leave every layer at rest.
    // `data-video` drives the still fallback: it clears only once playback is
    // genuinely running, so a refused autoplay or an undecodable file still
    // leaves a composed background rather than a black rectangle.
    const applyMotionPreference = () => {
      if (!video) return;
      if (motionQuery.matches) {
        video.pause();
        el.dataset.video = "idle";
        return;
      }
      video
        .play()
        .then(() => {
          applyRate();
          el.dataset.video = "playing";
        })
        .catch(() => {
          el.dataset.video = "idle";
        });
    };

    applyMotionPreference();
    motionQuery.addEventListener("change", applyMotionPreference);

    if (!motionQuery.matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      if (pointerQuery.matches) {
        el.addEventListener("pointermove", onPointerMove);
        el.addEventListener("pointerleave", onPointerLeave);
      }
    }

    return () => {
      cancelAnimationFrame(frame);
      video?.removeEventListener("loadedmetadata", applyRate);
      motionQuery.removeEventListener("change", applyMotionPreference);
      window.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}

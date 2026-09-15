/**
 * High-frequency scroll/camera state, updated once per ScrollTrigger tick and
 * read every frame inside R3F's useFrame.
 *
 * Deliberately NOT in the zustand store: this changes on every scroll pixel
 * and every animation frame. Routing it through React state/setState would
 * mean re-rendering the component tree on every scroll tick, which is exactly
 * what R3F's own guidance warns against (mutate in useFrame, don't setState).
 * Plain mutable object + refs is the idiomatic escape hatch for this class of
 * value in a React + three.js app.
 */
export const scrollState = {
  /** Raw 0..1 scroll fraction through the track, from ScrollTrigger's onUpdate. */
  rawScroll: 0,
  /** 0..1 progress through the full track, including the locked hero intro. */
  progress: 0,
  /** Signed rate of change of the eased camera z, used for star-streak intensity. */
  velocity: 0,
  /** The damped camera-depth value CameraRig is easing toward `camFor(progress)`. */
  camZ: 0,
  /** Pointer position in NDC (-1..1), updated on mousemove. */
  pointerX: 0,
  pointerY: 0,
  /** Raw pointer position in CSS pixels, for the DOM cursor-light dot. */
  clientX: -100,
  clientY: -100,
  /** True once the locked hero title-reveal has finished and scroll is released. */
  introDone: false,
};

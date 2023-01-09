export function appLoop(fn: (timePassed: number, deltaTime: number) => void) {
  const initTime = Date.now();
  let time = Date.now();
  let animationFrameId: number;

  const callFn = () => {
    const now = Date.now();
    const diff = now - time;
    time = now;
    fn(time - initTime, diff / 100);
    animationFrameId = window.requestAnimationFrame(callFn);
  }

  callFn();
  return () => {
    window.cancelAnimationFrame(animationFrameId);
  };
}

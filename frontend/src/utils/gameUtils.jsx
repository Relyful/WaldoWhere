export function getClickPercent(e, gameElement) {
  const rect = gameElement.current.getBoundingClientRect();
    const mouseClickX = e.clientX;
    const mouseClickY = e.clientY;
    const elementX = rect.left;
    const elementY = rect.top;
    const result = {
      x: mouseClickX - elementX,
      y: mouseClickY - elementY,
    };
    const x = (result.x / rect.width) * 100;
    const y = (result.y / rect.height) * 100;
    return {x, y}
}
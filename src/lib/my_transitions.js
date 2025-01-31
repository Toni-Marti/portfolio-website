/* Seed is measured in 10s of characters per second */
export function typewriter(node, { speed = 1, character_delay = 0 }) {
  const valid =
    node.childNodes.length === 1 &&
    node.childNodes[0].nodeType === Node.TEXT_NODE;

  if (!valid) {
    throw new Error(
      `This transition only works on elements with a single text node child`
    );
  }

  const text = node.textContent;
  const duration = (text.length + character_delay) / (speed * 0.01);
  const m = text.length + character_delay;
  const n = -character_delay;

  return {
    duration,
    tick: (t) => {
      const v = Math.trunc(m * t + n);
      const i = Math.max(0, v);
      node.textContent = text.slice(0, i);
      if (v < 0) {
        node.style.position = "absolute";
      } else {
        node.style.position = "static";
      }
    },
  };
}

export function appear(node, { delay = 0 }) {
  const duration = delay;
  const hidden_css = "opacity: 0; position: absolute;";
  const visible_css = "opacity: 1; position: static;";

  return {
    duration,
    css: (t) => (t === 1 ? visible_css : hidden_css),
  };
}

let nextEntityId = 0;

export const createEntity = (components) => ({
    id: nextEntityId++,
    components: { ...components }
});

export const Position = (x, y) => ({ position: { x, y } });
export const Renderable = (className) => ({ renderable: { className } });
export const CanvasComponent = (context, width, height) => ({ context, width, height });
// Module aliases
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse;

// Create an engine
const engine = Engine.create(),
      world = engine.world;

// Create a renderer
const render = Render.create({
    element: document.body,
    canvas: document.getElementById('world'),
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#f0f0f0'
    }
});

Render.run(render);

// Create a runner
const runner = Runner.create();
Runner.run(runner, engine);

// Add walls
const walls = [
    Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 50, { isStatic: true }),
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, { isStatic: true }),
    Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true }),
    Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, window.innerHeight, { isStatic: true })
];
Composite.add(world, walls);

// Add balls
for (let i = 0; i < 50; i++) {
    const radius = Math.random() * 30 + 10;
    const ball = Bodies.circle(Math.random() * window.innerWidth, Math.random() * window.innerHeight, radius, {
        restitution: 0.9,
        friction: 0.005,
        render: {
            fillStyle: `hsl(${Math.random() * 360}, 100%, 50%)`
        }
    });
    Composite.add(world, ball);
}

// Add mouse control
const mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
              stiffness: 0.2,
              render: {
                  visible: false
              }
          }
      });

Composite.add(world, mouseConstraint);

// Keep the canvas size updated
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
});

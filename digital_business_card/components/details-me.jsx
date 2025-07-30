export function MainDetails() {
  return (
    <div className="main-details-container">
      <div className="main-header">
        <span>Kuruhaku / README.md</span>
        <img src="/pencil.svg" alt="edit svg" />
      </div>

      <div className="main-body">
        <h1>Lance Ong</h1>

        <p>
          A front-end developer that will specialize in React from the
          Philippines
        </p>
        <p>⤷ 🌱 I'm currently learning React</p>
        <p>⤷ 🔭 I'm currently working on L.Custom - React</p>

        <h2>Tech Stacks:</h2>
        <div className="tech-stacks-image">
          <img src="/html5.png" alt="html" />
          <img src="/css.png" alt="css" />
          <img src="/javascript.png" alt="javascript" />
          <img src="/react.png" alt="react" />
          <img src="/node-js.png" alt="node-js" />
          <img src="/express.png" alt="express" />
          <img src="/mysql.png" alt="mysql" />
          <img src="/postgresql.png" alt="postgresql" />
        </div>

        <h2>Rarely Use Tech Stacks:</h2>
        <div className="tech-stacks-image">
          <img src="/python.png" alt="python" />
          <img src="/java.png" alt="java" />
          <img src="/php.png" alt="php" />
        </div>
      </div>
    </div>
  );
}

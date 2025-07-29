export function Navbar() {
  return (
    <header>
      <nav>
        <img src="../src/assets/react-logo.png" alt="React Logo" />
        <span>ReactsFacts</span>
      </nav>
    </header>
  );
}

export function Page() {
  return (
    <main>
      <h1>Fun facts about React</h1>
      <ul className="facts-list">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 100k stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  );
}

export function Footer() {
  return (
    <footer>
      <p>© 2020 development. All rights reserved</p>
    </footer>
  );
}

export function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="about-image">
        <img src="/placeholder.jpg" alt="placeholder profile image" />
      </div>
      <div className="about-name">
        <span>Lance A. Ong</span>
        <span>Kuruhaku</span>
      </div>
      <div className="about-details">
        <div>Daily life cycle: Wake up, Code, Eat, Sleeps</div>
        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
}

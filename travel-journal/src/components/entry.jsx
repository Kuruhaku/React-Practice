export function Entry(props) {
  return (
    <main>
      <article className="journal-entry">
        <div className="entry-image">
          <img src={props.entry.img.src} alt={props.entry.img.alt} />
        </div>

        <div className="entry-details">
          <img className="marker" src="/marker.png" alt="location pin" />
          <span className="country">{props.entry.country}</span>
          <a href={props.entry.googleMapsLink}>View on Google Maps</a>
          <h2 className="entry-title">{props.entry.title}</h2>
          <p className="trip-dates">{props.entry.dates}</p>
          <p className="entry-text">{props.entry.text}</p>
        </div>
      </article>
    </main>
  );
}

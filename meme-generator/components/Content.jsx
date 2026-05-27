import { useState } from "react";

export default function Content() {
  const [meme, setMeme] = useState({
    topText: "Test",
    bottomText: "Test",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input type="text" placeholder="One does not simply" name="topText" />
        </label>

        <label>
          Bottom Text
          <input type="text" placeholder="Walk into Mordor" name="bottomText" />
        </label>

        <button>Get a new meme image 🖼</button>
      </div>

      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}

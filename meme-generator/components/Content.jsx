import { useEffect, useState } from "react";

export default function Content() {
  const [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Modor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    console.log("rendered");
    fetch(`https://api.imgflip.com/get_memes`)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const randomImage = allMemes[randomIndex].url;
    console.log(randomImage);
    setMeme((prevMeme) => ({
      ...prevMeme,
      imageUrl: randomImage,
    }));
  }

  function handleChange(event) {
    console.log(event.currentTarget);
    const { name, value } = event.currentTarget;

    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
          />
        </label>

        <button onClick={getRandomImage}>Get a new meme image</button>
      </div>

      <div className="meme">
        <span>{meme.imageUrl}</span>
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}

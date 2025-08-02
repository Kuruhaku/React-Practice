export function Cards(props) {
  const cast = props.movie.cast.map((cast, index) => {
    return (
      <li key={index} className="w-24 rounded-2xl bg-gray-200 py-1 text-center">
        {cast}
      </li>
    );
  });

  return (
    <>
      <div className="cardContainer w-full max-w-sm cursor-pointer rounded-xl border bg-white shadow-md duration-200 ease-in-out hover:scale-105">
        <div className="card-image">
          <img
            className="w-full rounded-xl"
            src="/placeholder.png"
            alt="card image"
          />
        </div>

        <div className="card-body p-4">
          <h1 className="text-xl font-[500]">{props.movie.title}</h1>
          <div className="card-rating flex gap-2 text-sm font-[400]">
            <p className="text-yellow-300">{props.movie.ratingStars}</p>
            <p>
              {props.movie.rating} {props.movie.reviews}
            </p>
          </div>
          <p className="my-4 text-sm font-[500]">{props.movie.genre}</p>
          <p className="line-clamp-3 min-h-15 overflow-y-auto pr-3 text-justify text-sm font-[400] text-gray-500">
            {props.movie.description}
          </p>
          <hr className="my-3" />
          <h2 className="text-base font-[500]">Subtitle</h2>
          <ul className="mt-2 mb-4 flex flex-wrap gap-2 text-xs font-[500]">
            {cast}
          </ul>
          <button className="mt-2 w-full cursor-pointer rounded border bg-blue-500 px-4 py-2 text-white duration-150 ease-in-out hover:border-blue-500 hover:bg-white hover:text-blue-500">
            Watch
          </button>
        </div>
      </div>
    </>
  );
}

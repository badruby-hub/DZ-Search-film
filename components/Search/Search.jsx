
export function Movie({ movies }) {
    return  <>
                 <div className='container'>   {movies.map((movie) => (
                        <figure key={movie.imdbID}>
                            <img src={movie.Poster} alt={movie.Title} />
                            <figcaption>{movie.Title} ({movie.Year})</figcaption>
                        </figure>
                    ))}
                    </div>
        </>
}

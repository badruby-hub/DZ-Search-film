import classes from './Search.module.css';
export function Movie({ movies }) {
    return  <>
                 <div className={classes.container}>   {movies.map((movie) => (
                        <figure className={classes.group} key={movie.imdbID}>
                            <img className={classes.poster} src={movie.Poster} alt={movie.Title} />
                            <figcaption className={classes.name}>{movie.Title} ({movie.Year})</figcaption>
                        </figure>
                    ))}
                    </div>
        </>
}

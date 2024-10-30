//React повторно не будет рендерить компонент Movie, а вместо этого вернёт уже отрендеренный экземпляр из кэша.
import { memo } from 'react';
import classes from './Search.module.css';
export  const Movie2 = memo(function Movie({ movies }) {
    console.debug("Search.jsx/movie render")
    return  <>
                 <div className={classes.container}>   {movies.map((movie) => (
                        <figure className={classes.group} key={movie.imdbID}>
                            <img className={classes.poster} src={movie.Poster} alt={movie.Title} />
                            <figcaption className={classes.name}>{movie.Title} ({movie.Year})</figcaption>
                        </figure>
                    ))}
                    </div>
        </>
})

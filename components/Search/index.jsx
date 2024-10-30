import { useState, useEffect, } from "react";
import { Movie2 } from "./Search";
import classes from './Search.module.css';

export function ResultMovie() {
    return  <div className={classes.main}>
            <MovieTest1 />
        </div>
}

function MovieTest1() {
    const [nameMovie, setNameMovie] = useState("red"),
          [movies, setMovies] = useState([]),
          [error, setError] = useState("");
          console.debug('MovieTest1 render' );


    const handleSearch =  async () => {
        console.debug('handleSearch render' );

        if (!nameMovie) return
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&s=${nameMovie}`);
            const data = await response.json();
            
            if (data.Response === "True") {
                setError([]);
                setMovies(data.Search);
            } else {
                setMovies([]);
                setError(data.Error); 
            }
        } catch (err) {
            setError("Ошибка при получении данных.");
        }
        
    };

    useEffect(() => {
        console.debug("useEffect")
        handleSearch();
    }, []);
    

    return   <>
        <div className={classes.block}>
            <input className={classes.search}
                type="search" 
                value={nameMovie} 
                onChange={(e) => setNameMovie(e.target.value)} 
                placeholder="Введите название фильма"
            />
            <button className={classes.button} onClick={handleSearch}>Поиск</button>
        </div>
        <Movie2 movies={movies} />
        </>
   }

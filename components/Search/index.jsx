import { useState, useEffect } from "react";
import { Movie } from "./Search";

export function ResultMovie() {
    return  <>
            <MovieTest1 />
        </>
}

function MovieTest1() {
    const [nameMovie, setNameMovie] = useState("red"),
          [movies, setMovies] = useState([]),
          [error, setError] = useState("");


    const handleSearch = async () => {
        if (!nameMovie) return
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=a2b07930&s=${nameMovie}`);
            const data = await response.json();
            
            if (data.Response === "True") {
                setError([]);
                setMovies(data.Search); // Сохраняем найденные фильмы
            } else {
                setMovies([]);
                setError(data.Error); // Отображаем ошибку, если фильм не найден
            }
        } catch (err) {
            setError("Ошибка при получении данных.");
        }
        
    };

    useEffect(() => {
        handleSearch();
    }, []);
    

    return   <>
        <div className="block-1">
            <input 
                type="search" 
                value={nameMovie} 
                onChange={(e) => setNameMovie(e.target.value)} 
                placeholder="Введите название фильма"
            />
            <button onClick={handleSearch}>Поиск</button>
            {error && <p>{error}</p>}
        </div>
        <Movie movies={movies} />
        </>
   }

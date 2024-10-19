import { useState } from "react";
import { Movie } from "./Search";


export function ResultMovie() {
    return<>
    <MovieTest1/>
    </>
}

function MovieTest1() {
const nameMovie = useState("Нету фильмов");
    return <fieldset>
        <input type="search" value={nameMovie} />
        <Movie nameMovie={nameMovie}/>
    </fieldset>
}
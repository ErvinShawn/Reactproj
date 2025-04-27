import React, { useEffect, useState } from "react";
import MovieCard from "./mociecard";
import { db } from "./firebase";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";

const Home = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState({
        id: "",
        url: "",
        title: "",
        releasedate: "",
        is_fav: false
    });
    const [movieList, setMovieList] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const fetchMovie = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "movies"));
            const movieList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMovieList(movieList);
            setFilteredMovies(movieList); // Initialize filtered movies
        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    useEffect(() => {
       
        const filtered = movieList.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [search, movieList]);

    const addMovie = async () => {
        if (!movies.title.trim()) {
            alert("Empty title");
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "movies"), {
                url: movies.url,
                title: movies.title,
                releasedate: movies.releasedate,
                is_fav: movies.is_fav,
            });
            await updateDoc(docRef, { id: docRef.id });
            setMovies({
                id: "",
                url: "",
                title: "",
                releasedate: "",
                is_fav: false,
            });
            fetchMovie();
            alert("Movie added successfully!");
        } catch (err) {
            console.error("Error adding movie:", err);
            alert(err);
        }
    };

    const handleImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "Test_Preset");
        data.append("cloud_name", "diq0bcrjl");

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/diq0bcrjl/image/upload", {
                method: "POST",
                body: data,
            });

            const result = await res.json();
            if (result.url) {
                setMovies((prev) => ({ ...prev, url: result.url }));
            }
        } catch (err) {
            alert("Failed to upload image");
        }
    };

    return (
        <div className="home">
            <form className="search-form">
                <input
                    type="text"
                    placeholder="Enter movie name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>


            <div className="movies-grid">
                {filteredMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>

            <div>
                <form onSubmit={(e) => { e.preventDefault(); addMovie(); }}>
                    <input
                        type="text"
                        placeholder="Enter title"
                        value={movies.title}
                        onChange={(e) => setMovies({ ...movies, title: e.target.value })}
                    />
                    <input
                        type="date"
                        value={movies.releasedate}
                        onChange={(e) => setMovies({ ...movies, releasedate: e.target.value })}
                    />
                    <input
                        type="file"
                        onChange={handleImage}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};

export default Home;

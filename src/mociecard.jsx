import React from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const MovieCard = ({ movie}) => {
    const deleteMovie = async (id) => {
        try {
          await deleteDoc(doc(db, "movies", id));
          alert("Movie deleted successfully.");
          
        } catch (err) {
          console.error("Failed to delete movie. Error:", err.message);
          alert("Failed to delete movie. Check console for details.");
        }
      };
      

  const toggleFav = async (id, status) => {
    try {
      await updateDoc(doc(db, "movies", id), { is_fav: !status });
      alert("Favorite status updated!");
    } catch (err) {
      console.error("Error updating favorite status:", err);
      alert("Failed to update favorite status.");
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} />
        <div className="movie-overlay">
          <button onClick={() => toggleFav(movie.id, movie.is_fav)}>Fav</button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.releasedate}</p>
        <button onClick={() => deleteMovie(movie.id)}>Del</button>
      </div>
    </div>
  );
};

export default MovieCard;

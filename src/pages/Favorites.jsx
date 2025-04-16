import { useEffect, useState } from "react";

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Favorite APODs</h1>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-400">You haven’t added any favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                        <div key={item.date} className="bg-zinc-800 rounded shadow p-4">
                            <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                            {item.media_type === "image" ? (
                                <img  
                                    src={item.url}
                                    alt={item.title}
                                    className="rounded w-full h-48 object-cover"
                                />
                            ) : (
                                <iframe
                                    src={item.url}
                                    title={item.title}
                                    className="w-full aspect-video rounded"
                                    allowFullScreen
                                />
                            )}
                            <p className="text-sm text-gray-400 mt-2">{item.date}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Favorites;
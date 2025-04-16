import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaStar, FaRegStar } from "react-icons/fa";

const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

function Browse() {
    const [date, setDate] = useState('');
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem("favorites");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        if (!date) return;

        setLoading(true);
        setError(null);

        fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("No image found for this date.");
            }
            return res.json();
        })
        .then(data => {
            setApod(data);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setApod(null);
            setLoading(false);
        });
    }, [date]);

    function toggleFavorite(apod) {
        const isFav = favorites.some(item => item.date === apod.date);
        
        const updated = isFav
            ? favorites.filter(item => item.date !== apod.date)
            : [...favorites, apod];

        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    }

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Browse APOD by Date</h1>

            <div className="flex justify-center mb-6">
                 <DatePicker 
                    selected={date ? new Date(date) : null}
                    onChange={(newDate) => {
                        const formatted = newDate.toISOString().split("T")[0];
                        setDate(formatted);
                    }}
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    minDate={new Date("1995-06-16")}
                    placeholderText="Pick a date"
                    className="bg-zinc-800 text-white p-2 rounded shadow w-48 text-center caret-transparent"
                    calendarClassName="bg-zinc-900 text-white"
                    showYearDropdown
                    showMonthDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={30}
                 />
            </div>

            {error && (
                <div className="text-center mt-6 flex flex-col items-center gap-4">
                    <img  
                        src="/src/assets/blackhole.jpg"
                        alt="Black Hole"
                        className="w-64 h-auto rounded shadow-lg"
                    />
                    <p className="text-cyan-400 font-semibold text-lg animate-pulse drop-shadow">
                        {error}
                    </p>
                </div>
            )}

            {loading && 
                <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-500/30"></div>
                </div>
            }

            {apod && !loading && (
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-2">{apod.title}</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        {format(new Date(apod.date), 'dd/MM/yyyy')}
                    </p>
                    {apod.media_type === 'image' ? (
                        <div className="relative">
                            <img 
                                src={apod.url} 
                                alt={apod.title} 
                                className="rounded shadow-lg w-full" />
                            <button type="button"
                                onClick={() => toggleFavorite(apod)}
                                className="absolute top-2 right-2 text-yellow-400 text-2xl hover:scale-110 transition-transform z-10"
                                title={favorites.some(item => item.date === apod.date) ? "Remove from favorites" : "Add to favorites"}
                            >
                                {favorites.some(item => item.date === apod.date) ? <FaStar /> : <FaRegStar />}
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <iframe
                                src={apod.url} 
                                title={apod.title}
                                className="w-full h-[500px] mb-4 rounded"
                                allow="fullscreen"
                            />
                            <button
                                onClick={() => toggleFavorite(apod)}
                                className="absolute top-2 right-2 text-yellow-400 text-2xl hover:scale-110 transition-transform z-10"
                                title={favorites.some(item => item.date === apod.date) ? "Remove from favorites" : "Add to favorites"}
                            >
                                {favorites.some(item => item.date === apod.date) ? <FaStar /> : <FaRegStar />}
                            </button>
                        </div>
                    )}

                    <div className="max-w-3xl mx-auto mt-6 px-4">
                        <p className="text-base sm:text-lg leading-relaxed text-gray-300 tracking-wide">
                            {apod.explanation}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Browse;
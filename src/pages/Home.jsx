import { useEffect, useState } from 'react';

function Home() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/apod`)
      .then(res => res.json())
      .then(data => {
        setApod(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-blue-500/30"></div>
        </div>
    );
  }
  

  return (
    <div className='min-h-screen bg-zinc-900 text-white p-6 text-center'>
        <h1 className='text-4xl font-bold text-center mb-6 tracking-wide'>
            Astronomy Picture of the Day
        </h1>

        <h2 className='text-2xl font-semibold text-center mb-1'>
            {apod.title}
        </h2>

        <p className='text-center text-sm text-gray-400 mb-6'>
            {apod.date}
        </p>

        {apod.media_type === 'image' ? (
            <img 
                src={apod.url} 
                alt={apod.title} 
                onLoad={() => setImageLoaded(true)}
                className={`w-full max-w-3xl mx-auto rounded-lg shadow-lg mb-6 transition-opacity duration-500 ease-in 
                ${imageLoaded ? "opacity-100" : "opacity-0"}`} 
            />
        ) : (
            <iframe 
            src={apod.url} 
            alt={apod.title}
            className='w-full max-w-3xl h-[500px] mx-auto mb-6 rounded-lg shadow-lg'
            allow='fullscreen' />
        )}
        <div className='max-w-3xl mx-auto mt-6 px-4'>
            <p className='text-base sm:text-lg leading-relaxed text-gray-300 tracking-wide'>
                {apod.explanation}
            </p>
        </div>
    </div>
  );
}

export default Home;

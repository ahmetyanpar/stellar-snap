export default async function handler(req, res) {
    const { date } = req.query;
  
    // If no date provided, use today's date
    const today = new Date().toISOString().split("T")[0];
    const targetDate = date || today;
  
    const apiKey = process.env.NASA_API_KEY;
  
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${targetDate}`
      );
  
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch APOD' });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching APOD' });
    }
}
// fetchOutline.js
const fetchOutline = async (data) => {
    try {
        const response = await fetch('http://accessibletechwriting.com/generateOutline', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result.outline;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default fetchOutline;

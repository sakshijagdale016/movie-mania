

function search() {
    var search = document.getElementById('search').value;
    search = encodeURIComponent(search);
    console.log(search);
   
    handleSubmit(search);
}

async function handleSubmit(search) {
    const url = 'https://streaming-availability.p.rapidapi.com/shows/search/title?country=IN&title=' + search + '&series_granularity=show&show_type=movie&output_language=en';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'ae0d19cad6msh3acc79efa19d655p152c31jsn0afcfa79194a',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            alert("Error fetching data");
            return;
        }
        const result = await response.json();
        console.log(result);
        
        if (result && result.length > 0) {
            const firstResult = result[0];
            const resultPageUrl = `result.html?result=${encodeURIComponent(JSON.stringify({
                title: firstResult.title,
                releaseYear: firstResult.releaseYear,
                rating: firstResult.rating,
                overview: firstResult.overview,
                cast: firstResult.cast,
                imageSet: {
                    verticalPoster: {
                        w480: firstResult?.imageSet?.verticalPoster.w480
                    }
                }
            }))}`;
            window.location.href = resultPageUrl;
        } else {
            alert('No results found');
        }
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('movie2').addEventListener('click', function() {
        handleSubmit(encodeURIComponent('Qala'));
    });
    document.getElementById('movie3').addEventListener('click', function() {
        handleSubmit(encodeURIComponent('Jab We Met'));
    });
    document.getElementById('movie4').addEventListener('click', function() {
        handleSubmit(encodeURIComponent('Drishyam 2'));
    });
});

// Kun sivu on ladattu
$(document).ready(function() {
    let allMovies = [];

    // Suoritetaan Ajax-haku Finnkino APIsta
    $.ajax({
        url: 'https://www.finnkino.fi/xml/Schedule/',
        method: 'GET',
        dataType: 'xml',
        success: function(response) {
            // Tallennetaan kaikki elokuvat muistiin
            $(response).find('Show').each(function() {
                const movie = {
                    title: $(this).find('Title').text(),
                    theatre: $(this).find('Theatre').text(),
                    startTime: $(this).find('dttmShowStart').text()
                };
                allMovies.push(movie);
            });

            // Näytetään kaikki elokuvat aluksi
            displayMovies(allMovies);
        },
        error: function() {
            alert('Tietojen lataus epäonnistui.');
        }
    });

    // Dropdownin kuuntelija
    $('#theatre-select').on('change', function() {
        const selectedTheatre = $(this).val();
        
        if (selectedTheatre) {
            // Suodatetaan valitun teatterin elokuvat
            const filteredMovies = allMovies.filter(movie => movie.theatre.includes(selectedTheatre));
            displayMovies(filteredMovies);
        } else {
            // Jos valinta tyhjä, näytetään kaikki elokuvat
            displayMovies(allMovies);
        }
    });

    // Funktio elokuvien näyttämiseen
    function displayMovies(movies) {
        $('#movies').empty(); // Tyhjennetään vanhat

        movies.forEach(movie => {
            const movieCard = `
                <div class="col-md-4">
                    <div class="movie-card">
                        <h5>${movie.title}</h5>
                        <p><strong>Teatteri:</strong> ${movie.theatre}</p>
                        <p><strong>Alkaa:</strong> ${movie.startTime}</p>
                    </div>
                </div>
            `;

            $('#movies').append($(movieCard).hide().fadeIn(1000));
        });
    }
});

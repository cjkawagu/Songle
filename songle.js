// Spotify API Implementation
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQCXWDV7fhY0ye_dhot0gmGy1AGc8q87pDWtaV4jdg_E7F-9IUAT6lnmuugliURBFmz9Z0vUFKbwVufCIeyZZfWFRUc1Io9W9DITvLkqVUcNrThWSpUQjhiRZtElYXZcXvF-mgiDfhzF3OXU8qcXKV79Beb3jlJ4kBINvtS6wjDYn2lOKeAI_QnLkiXo6mwq7PgWhpQ';
    const player = new Spotify.Player({
        name: 'Songle',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error(message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error(message);
    });

    player.connect();

    //GAME CODE// 

    //Instance Variables  
    var current_track;
    var songVal; 
    var numGuesses = 0;


    //Playback Control 
    // function startPlay() {
    //     player.resume(); 
    //     document.getElementById("togglePlay").src = "playButton.png";
    // }

    // function stopPlay(){
    //     player.pause();
    //     document.getElementById("togglePlay").src = "pauseButton.png";
    // }
    function pausePlay(){
        player.togglePlay(); 
    }

    function songTimeout() {
        player.seek(0);
        player.resume(); 
        if (numGuesses == 0){
            setTimeout(pausePlay, 1000);
        }
        if (numGuesses == 1){
            setTimeout(pausePlay, 3000);
        }
        if (numGuesses == 2){
            setTimeout(pausePlay, 5000);
        }
        if (numGuesses == 3){
            setTimeout(pausePlay, 8000);
        }
        if (numGuesses == 4){
            setTimeout(pausePlay, 10000);
        }
    }

    togglePlay.addEventListener('click', songTimeout);


    //Starting and Resetting Functionality
    function startFunc() {
        player.getCurrentState().then(state => {
            if (!state) {
                console.error('User is not playing music through the Web Playback SDK');
                return;
            }
            
            current_track = state.track_window.current_track;
            songVal = current_track.name;
            
            console.log('Currently Playing', current_track);
            
            //TESTING
            //document.getElementById("answer").innerHTML = answerVal; 
            });
        
        player.pause();
    }

    function resetFunc(){
        player.nextTrack();
        player.pausePlay();
        numGuesses = 0; 
        document.getElementById("numGuesses").innerHTML = numGuesses;
        document.getElementById("guess1").innerHTML = "_____";
        document.getElementById("guess2").innerHTML = "_____";
        document.getElementById("guess3").innerHTML = "_____";
        document.getElementById("guess4").innerHTML = "_____";
        document.getElementById("guess5").innerHTML = "_____";
        document.getElementById("answerLabel").innerHTML = "";
        document.getElementById("song").innerHTML = "";
        startFunc();
    } 

    start.addEventListener('click', startFunc);
    reset.addEventListener('click', resetFunc);


    // Guessing Functionality
    function checkGuess() {
        var guess = document.getElementById("guessField").value; 
        document.getElementById("guessField").value = "";
        numGuesses++; 

        if (numGuesses == 1){
            document.getElementById("guess1").innerHTML = guess;
        }
        if (numGuesses == 2){
            document.getElementById("guess2").innerHTML = guess;
        }
        if (numGuesses == 3){
            document.getElementById("guess3").innerHTML = guess;
        }
        if (numGuesses == 4){
            document.getElementById("guess4").innerHTML = guess;
        }
        if (numGuesses == 5){
            document.getElementById("guess5").innerHTML = guess;
            alert("YOU LOSE!");
            pausePlay();
        }

        document.getElementById("numGuesses").innerHTML = numGuesses;  

        if (numGuesses == 5){
            document.getElementById("answerLabel").innerHTML = "Answer: "; 
            document.getElementById("song").innerHTML = songVal;
        }

        console.log('Guess', guess);
        console.log('Correct Answer', songVal);

        if (guess == songVal){
            document.getElementById("answerLabel").innerHTML = "Answer: "
            document.getElementById("song").innerHTML = songVal; 
            pausePlay(); 
            alert("YOU WIN!"); 
        }

    } 
    submitGuess.addEventListener('click', checkGuess);
}
/*
    Search Bar Option
*/
let songs = []
let playlists = []
async function fetchSongData() {
    const response = await fetch("/songslist");
    const data = await response.json();
    return data; 
}

fetchSongData().then((data) => {
    songs = data.songsList
})

async function fetchPlaylistData() {
    const response = await fetch("/getplaylists");
    const data = await response.json();
    return data; 
}

fetchPlaylistData().then((data) => {
    
    console.log(data.id)
    let display_playlist = document.getElementById("display-playlist");

    for (let i = 0; i < data.playlists.length; i++) {
        const article = document.createElement('article');

        const userPlaylistDiv = document.createElement('div');
        userPlaylistDiv.className = 'user-playlist';

        const img = document.createElement('img');
        img.src = "images/profile_pic.jpg";

        const playlistP = document.createElement('p');
        playlistP.textContent = data.playlists[i]["name"];

        userPlaylistDiv.appendChild(img);
        userPlaylistDiv.appendChild(playlistP);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-playlist';
        const removeImg = document.createElement('img');
        removeImg.className = 'minus-pic';
        removeImg.src = 'icons/minus.png';
        removeImg.alt = 'remove playlist';
        removeButton.appendChild(removeImg);

        article.appendChild(userPlaylistDiv);
        article.appendChild(removeButton);

        display_playlist.appendChild(article);
        

        article.addEventListener('click', function(event) {
            if (!event.target.closest('.remove-playlist')) {
                
                // for (let i = 0; i < data.playlists[i].songs.length; i++) {
                //     console.log(data.playlist[i].songs[i])
                // }

                async function currPlaylistPost() {
                    await fetch("setcurrplaylist", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ playlist_id: data.playlists[i]._id })
                    })
                }
                
                currPlaylistPost();
            }
        })

        if (data.id == data.playlists[i]._id) {
            article.style.backgroundColor = 'rgb(255 255 255 / 3%)'
        }

        if (data.id == null && i == 0) {
            article.style.backgroundColor = 'rgb(255 255 255 / 3%)'
        }

        
    }
})

function search_bar() {
    let search_results = document.querySelector(".search-results");
    let search_input = document.getElementById("searchInput").value;
    search_input = search_input.toLowerCase();
    console.log(search_input)
    search_results.innerHTML = '';

    for (let i = 0; i < songs.length; i++) {
        if (songs[i]["name"].toLowerCase().includes(search_input)) {
            const songContainer = document.createElement('div');
            songContainer.className = 'song-container';
        
            const songContent = document.createElement('div');
            songContent.className = 'song-content';
        
            const img = document.createElement('img');
            img.src = songs[i]["imageLoco"];
        
            const titleP = document.createElement('p');
            titleP.className = 'song-title';
            titleP.textContent = songs[i]["name"];
        
            const artistP = document.createElement('p');
            artistP.className = 'artist-title';
            artistP.textContent = songs[i]["artist"];
        
            songContent.appendChild(img);
            songContent.appendChild(titleP);
            songContent.appendChild(artistP);
        
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'button-container';
        
            const addButton = document.createElement('button');
            addButton.className = 'add-song';
            const addImg = document.createElement('img');
            addImg.src = "icons/plus.png";
            addImg.alt = 'add playlist';
            addButton.appendChild(addImg);
        
            const playButton = document.createElement('button');
            playButton.className = 'play-song';
            const playImg = document.createElement('img');
            playImg.src = "icons/play.png";
            playImg.alt = 'play song';
            playButton.appendChild(playImg);

            buttonContainer.appendChild(addButton);
            buttonContainer.appendChild(playButton);
        
            songContainer.appendChild(songContent);
            songContainer.appendChild(buttonContainer);
        
            search_results.appendChild(songContainer);
            

            addButton.addEventListener("click", function() {
                async function addSongPost() {
                    await fetch("addsong", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ song: songs[i] })
                    })
                }
    
                addSongPost();
            }); 


        }

        

        }

        if (search_input == 0) {
            search_results.innerHTML = '';
        }
    }

const modal = document.querySelector(".modal-edit");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".add-playlist");
const closeModalBtn = document.querySelector(".btn-close");


const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};


closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});


const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

};
openModalBtn.addEventListener("click", openModal);


async function addPlaylist() {
    await fetch("addplaylist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ song: song })
    })
}
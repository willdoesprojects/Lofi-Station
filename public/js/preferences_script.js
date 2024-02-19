/*
    Search Bar Option
*/
let songs = []
let playlists = []
let session_id = -1


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

async function addPlaylist() {
    await fetch("addplaylist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ song: song })
    })
}

async function currPlaylistPost(id) {
    await fetch("setcurrplaylist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlist_id: id })
    })
}

async function removePlaylistPost(id) {
    await fetch("removeplaylist", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playlist_id: id })
    })
}

function remove_playlist(id) {
    for (let i = 0; i < playlists.length; i++) {
        if (id == playlists[i]._id) {
            playlists = playlists.filter(item => item._id !== id);
            break;
        }
    }
}

fetchPlaylistData().then((data) => {
    let display_playlist = document.getElementById("display-playlist");

    playlists = data.playlists;

    if (data.id == null) {
        session_id = playlists[0]._id;
        currPlaylistPost(playlists[0]._id);
    }

    else {
        session_id = data.id;
    }

    for (let i = 0; i < playlists.length; i++) {
        const article = document.createElement('article');

        article.id = playlists[i]._id;

        const userPlaylistDiv = document.createElement('div');
        userPlaylistDiv.className = 'user-playlist';

        const img = document.createElement('img');
        img.src = "images/profile_pic.jpg";

        const playlistP = document.createElement('p');
        playlistP.textContent = playlists[i]["name"];

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
            let children = display_playlist.children;

            for (let j = 0; j < children.length; j++) {
                if (children[j].id == session_id) {
                    children[j].style.backgroundColor = '';
                    break;
                }
                
            }
            
            if (!event.target.closest('.remove-playlist')) {
                currPlaylistPost(playlists[i]._id);
            }

            session_id = playlists[i]._id
            article.style.backgroundColor = 'rgb(255 255 255 / 3%)'
            const table = document.getElementById("song-table");

            table.innerHTML = '';
            table.innerHTML += 
            `<tr>
                <th>#</th>
                <th>Title</th>
                <th>Album</th>
                <th>Date Added</th>
                <th>Duration</th>
                <th class="test"></th>
            </tr>`

            for (let j = 0; j < playlists[i].songs.length; j++) {
                song_to_table(playlists[i].songs[j], j+1);
            }
        });
        
        //when page first boots up
        if (session_id == playlists[i]._id) {
            article.style.backgroundColor = 'rgb(255 255 255 / 3%)'
            for (let j = 0; j < playlists[i].songs.length; j++) {
                    song_to_table(playlists[i].songs[j], j+1);
                }
        }

        removeButton.addEventListener("click", function(event) {
            event.stopPropagation();

            let children = display_playlist.children;
            const table = document.getElementById("song-table");

            if (session_id == article.id) {
                if (children.length == 1) {
                    removePlaylistPost(article.id);
                    display_playlist.removeChild(article);
                    remove_playlist(article.id);
                    table.innerHTML = '';
                } 
                
                else {
                    removePlaylistPost(article.id);
                    display_playlist.removeChild(article);
                    remove_playlist(article.id);

                    session_id = children[0].id
                    currPlaylistPost(session_id);

                    table.innerHTML = '';
                    table.innerHTML += 
                    `<tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Album</th>
                        <th>Date Added</th>
                        <th>Duration</th>
                        <th class="test"></th>
                    </tr>`
                    
                    for (let j = 0; j < playlists[0].songs.length; j++) {
                        console.log(playlists[0].songs[j]);
                        song_to_table(playlists[0].songs[j], j+1);
                    }
                    
                    children[0].style.backgroundColor = 'rgb(255 255 255 / 3%)'
                }
            }
                
            else {
                removePlaylistPost(article.id);
                display_playlist.removeChild(article);
                remove_playlist(article.id);
            }
        
        });
    }

    
})

function reindexTable() {
    const songRows = document.querySelectorAll('.song-row');
    songRows.forEach((row, index) => {
        row.querySelector('.index').textContent = index + 1;
    });
}

function song_to_table(song, index) {
    
    const table = document.getElementById("song-table");

    const songRow = document.createElement('tr');
    songRow.className = 'song-row';

    const tdIndex = document.createElement('td');
    tdIndex.textContent = index; 
    tdIndex.className = "index";

    const tdTitle = document.createElement('td');
    const divTitleContainer = document.createElement('div');
    divTitleContainer.className = 'title-container';

    const img = document.createElement('img');
    img.src = song.imageLoco;
    divTitleContainer.appendChild(img);

    const divTitleArtistNames = document.createElement('div');
    divTitleArtistNames.className = 'title-artist-names';

    const h4 = document.createElement('h4');
    h4.textContent = song.name;
    divTitleArtistNames.appendChild(h4);

    const small = document.createElement('small');
    small.textContent = song.artist;
    divTitleArtistNames.appendChild(small);

    divTitleContainer.appendChild(divTitleArtistNames);
    tdTitle.appendChild(divTitleContainer);

    const tdAlbum = document.createElement('td');
    tdAlbum.textContent = song.album;

    const tdDateAdded = document.createElement('td');
    tdDateAdded.textContent = song.date; 

    const tdDuration = document.createElement('td');
    tdDuration.textContent = song.duration;

    const tdRemove = document.createElement('td');
    const buttonRemove = document.createElement('button');
    buttonRemove.className = 'remove-song';

    const imgMinus = document.createElement('img');
    imgMinus.className = 'minus-pic';
    imgMinus.src = 'icons/minus.png';
    imgMinus.alt = 'remove song';

    buttonRemove.appendChild(imgMinus);
    tdRemove.appendChild(buttonRemove);

    [tdIndex, tdTitle, tdAlbum, tdDateAdded, tdDuration, tdRemove].forEach(td => songRow.appendChild(td));

    table.appendChild(songRow);

    buttonRemove.addEventListener("click", function(){
        async function removeSongPost() {
            await fetch("removesong", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ song: song })
            })
        }

        for (let i = 0; i < playlists.length; i++) {
            if (playlists[i]._id == session_id) {
                playlists[i].songs = playlists[i].songs.filter(item => item._id !== song._id)
                break;
            }
        }
        
        removeSongPost()
        table.removeChild(songRow);
        reindexTable();

    });
    
}

function search_bar() {
    let search_results = document.querySelector(".search-results");
    let search_input = document.getElementById("searchInput").value;
    search_input = search_input.toLowerCase();
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

                let children = document.getElementById("song-table").children;
            
                song_to_table(songs[i], children.length);

                for (let j = 0; j < playlists.length; j++) {
                    if (playlists[j]._id == session_id) {
                        playlists[j].songs.push(songs[i]);
                        break;
                    }
                }

            }); 
            
        }

        }

        if (search_input == 0) {
            search_results.innerHTML = '';
            search_results.innerHTML += `<h1>Begin your adventure by a song.</h1>`;
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



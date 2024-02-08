/*
    Search Bar Option
*/
songs = []

async function fetchSongData() {
    const response = await fetch("/songslist");
    const data = await response.json();
    return data; 
}

fetchSongData().then((data) => {
    songs = data.songsList
    console.log(songs)
})



function search_bar() {
    let search_results = document.querySelector(".results");
    let search_input = document.getElementById("searchInput").value;
    search_input = search_input.toLowerCase();

    search_results.innerHTML = '';

    for (let i = 0; i < song_dj_list.length; i++) {
        if (song_dj_list[i].hasOwnProperty('name')) {
            if (song_dj_list[i]["name"].toLowerCase().includes(search_input)) {
                const result = document.createElement("li");
                const text = document.createTextNode(song_dj_list[i]["name"]);
                result.appendChild(text);
                
                const text2 = document.createTextNode("Add");
                const btn = document.createElement("button");
                
                btn.appendChild(text2);
                
                const song = song_dj_list[i];

                btn.addEventListener("click", function() {
                    result.removeChild(btn);
                    search_results.removeChild(result);
                    

                    async function addFavSongPost() {
                        await fetch("addsongtofavorites", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ song: song })
                        })
                    }
        

                    addFavSongPost();
                }); 


            result.appendChild(btn);
            search_results.appendChild(result)
            }

            
        }

        else {
            if (song_dj_list[i]["djOwner"].toLowerCase().includes(search_input)) {
                
                const result = document.createElement("li");
                const text = document.createTextNode(song_dj_list[i]["djOwner"]);
                result.appendChild(text);
                
                const text2 = document.createTextNode("Add");
                const btn = document.createElement("button");
                
                btn.appendChild(text2);
                
                const dj = song_dj_list[i];

                btn.addEventListener("click", function() {
                    result.removeChild(btn);
                    search_results.removeChild(result);
                    

                    async function addDJPost() {
                        await fetch("djaddqueue", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ dj: dj })
                        })
                    }

                    addDJPost();
                }); 

                result.appendChild(btn);

                search_results.appendChild(result)
            }
        }
         
            

            

            
            
            

            // if (song_dj_list[i]["type"] == "dj" && search_input.length != 0) {
            //     btn.addEventListener("click", function() {
            //         result.removeChild(btn);
            //         liked_djs.appendChild(result);
            //     }); 
            // }
            
            

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

//   for (let i = 0; i < favoriteSongList["favoriteSongs"].length; i++) {
//     const liElement = document.createElement("li");
//     const text = document.createTextNode(favoriteSongList["favoriteSongs"][i]["name"]);
//     liElement.appendChild(text);
//     liked_songs.appendChild(liElement);
//   }

//   const likedSongList = document.querySelectorAll(".liked-songs li");


//   for (let i = 0; i < likedSongList.length; i++) {
//         const text = document.createTextNode("Remove");
//         const btn = document.createElement("button");
            
//         btn.appendChild(text);
        
//         const song = favoriteSongList["favoriteSongs"][i];

//         btn.addEventListener("click", function() {
//             liked_songs.removeChild(likedSongList[i])
            
//             async function removeFavSongPost() {
//                 await fetch("removefavoritesong", {
//                     method: "POST",
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ song: song })
//                 })
//             }
            
//             removeFavSongPost();
            
//         }); 
        
//         likedSongList[i].appendChild(btn);
//   }
};
openModalBtn.addEventListener("click", openModal);

// async function fetchFavoriteSongData() {
//     const response = await fetch("/getfavoritesongs");
//     const data = await response.json();
//     return data; 
// }

// fetchFavoriteSongData().then((data) => {
//     favoriteSongList = data;
//     openModalBtn.addEventListener("click", openModal);
// })


// async function fetchDJData() {
//     const response = await fetch("/getdjs");
//     const data = await response.json();
//     return data; 
// }

// fetchDJData().then((data) => {
//     dj_list = data;
//     openModalBtn2.addEventListener("click", openModal2);
// })
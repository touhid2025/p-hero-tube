function removeClass(){
    const activeButtons = document.getElementsByClassName('active');
    for(let btn of activeButtons){
        btn.classList.remove('active');
    }
}


function loadCategories(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}


function loadVideos(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((response) => response.json())
.then((data) => {
    removeClass();
    document.getElementById('btn-all').classList.add('active');
    displayVideos(data.videos);
})
}


const loadCategoryVideos = (id) => {
    const url = `
    https://openapi.programming-hero.com/api/phero-tube/category/${id}
    `;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeClass()
        const clickButton = document.getElementById(`btn-${id}`);
        clickButton.classList.add('active');
        console.log(clickButton)
        displayVideos(data.category);
    })
}


function displayCategories(categories){
    const categoryContainer = document.getElementById('category-container');
    for(let cat of categories){
       const categoryDiv = document.createElement('div');
       categoryDiv.innerHTML = `
       <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn hover:bg-red-500 hover:text-white btn-sm">${cat.category}</button>
       `;
       categoryContainer.appendChild(categoryDiv);
    }
}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML='';
    if(videos.length == 0){
        videoContainer.innerHTML=`
        <div class="py-20 col-span-full flex flex-col justify-center items-center">
            <img class="w-[200px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `
        return;
    }

    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="card bg-base-100">
  <figure class="relative">
    <img class="w-full sm:h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      <span class="absolute bottom-2 right-2 bg-black text-white text-sm rounded-md">3 hrs 56 min ago</span>
  </figure>
  <div class="flex items-center gap-2 py-5">
     <div class="profile">
        <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
     </div>
     <div class="intro">
        <h2 class="text-sm font-bold">${video.title}</h2>
        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
            <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=SRJUuaAShjVD&format=png" alt="">
        </p>
        <p class="text-sm text-gray-400">${video.others.views}</p>
     </div>
  </div>
</div>
        `;
        videoContainer.append(videoCard)
    });
        
    
};

loadCategories();

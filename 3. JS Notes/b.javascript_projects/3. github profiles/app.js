// console.log('console added')
let API = 'https://api.github.com/users/';

let profileName = document.getElementById('inp');
let cardContainer = document.getElementById('card-container');

async function searchProfile() {
    cardContainer.style.display = 'flex'
    const response = await fetch(`${API}${profileName.value}`);
    const data = await response.json();
    // console.log(data)
    let html = '';
    html += ` <div class="profile_img"><img src="${data.avatar_url}" alt=""></div>
    <div class="description">
      <h3 class="username">${data.name}</h3>
      <p class="desc">${data.bio}
      </p>
      <div class="reposBox">
        <p>${data.followers} <strong>Follower</strong></p>
        <p>${data.following} <strong>Following</strong></p>
        <p>${data.public_repos} <strong>Repos</strong></p>
      </div>   <div id="repos">


      </div>`
    cardContainer.innerHTML = html;
    getRepos();
}

async function getRepos() {
    const reposEl = document.getElementById("repos");

    let reposHtml = '';
    const repoResponse = await fetch(`https://api.github.com/users/${profileName.value}/repos`);
    const repoData = await repoResponse.json();
    repoData.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
    }).slice(0, 10).map((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })


    // const sorted = repoData.sort((a, b) => {
    //     return b.stargazers_count - a.stargazers_count;
    // }).slice(0, 10).map((repo) => {
    //     // console.log(e.html_url, e.name)
    //     let reposHtml = ` <a class="repo" href="${repo.html_url}" target="_blank">${repo.name}</a>`;
    //     return reposHtml;
    // })
    // console.log(sorted)
    // reposEl.insertAdjacentHTML('afterbegin', sorted);
}


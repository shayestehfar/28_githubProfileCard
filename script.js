const form = document.getElementById('input-form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const API_URL = 'https://api.github.com/users/'

// getUser('Shayestehfar')
async function getUser(username) {
  try {
    const { data } = await axios(API_URL + username)
    createUserCard(data)
    getRepos(username)
  } catch (err) {
    console.log(err)
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(API_URL + username + '/repos')
    addReposToCard(data)
  } catch (err) {
    console.log(err)
  }
}

function createUserCard(user) {
  const cardHtml = `
  <div class="card" id="card">
  <div class="avatar">
    <img src="${user.avatar_url}" alt="${user.name}" />
  </div>
  <div class="user-info">
    <h2>${user.name}</h2>
    <p>
    ${user.bio}
    </p>
    <ul>
      <li>${user.followers}<strong>Followers</strong></li>
      <li>${user.following}<strong>Following</strong></li>
      <li>${user.public_repos} <strong>Repos</strong></li>
    </ul>
  </div>
  <div id="repos">
  
  </div>
</div>
  `
  main.innerHTML = cardHtml
}
function addReposToCard(repos) {
  const reposEl = document.getElementById('repos')
  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement('a')
    repoEl.classList.add('repo')
    repoEl.href = repo.html_url
    repoEl.target = '_blank'
    repoEl.innerText = repo.name
    reposEl.appendChild(repoEl)
  })
}
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const user = search.value
  getUser(user)

  search.value = ''
})

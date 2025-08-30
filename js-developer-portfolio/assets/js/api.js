

async function fetchProfileData() {
  const url = 'https://raw.githubusercontent.com/anathiare/js-developer-portfolio/refs/heads/patch-1/data/profile.json'
  const fetching = await fetch(url)
  updateProfileInfo(profileData)
}
          

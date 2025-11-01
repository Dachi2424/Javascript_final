
function signUp(e){
  e.preventDefault()

  let formInfo = new FormData(e.target)
  let finalForm = Object.fromEntries(formInfo)

  fetch("https://api.everrest.educata.dev/auth/sign_up", {
    method: "POST",
    headers:{
      accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(finalForm)
  }).then(res => res.json())
  .then(data => {
    console.log(data)
  })
  .catch(err => console.error(err))
}
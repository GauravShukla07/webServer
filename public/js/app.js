const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  p1.textContent = "Loading Weather..."
  p2.textContent = ""
  const loc = document.querySelector('input').value;
  fetch(`/weather?location=${loc}`).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        p1.textContent = data.error
      }
      else 
      {
        console.log(data)
        p1.textContent = data.place
        let li = document.createElement('li')
        li.textContent = data.weather
        p2.appendChild(li)
        li = document.createElement('li')
        li.textContent = data.temperature
        p2.appendChild(li)
        li = document.createElement('li')
        li.textContent = data.feelslike
        p2.appendChild(li)
      }
    })
  })
})
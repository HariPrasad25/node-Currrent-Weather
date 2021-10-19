//require('isomorphic-fetch')

/*fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
            console.log(data)
    })
})*/
//console.log('hello')


const weathersearch = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')



weathersearch.addEventListener('submit', (e) => {
    e.preventDefault()

    //console.log(search.value)
    msgOne.textContent = "Loading.."
    msgTwo.textContent=""
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               
                msgOne.textContent = 'Enter the address in box'
            }
            
            else {
                msgOne.textContent = data.place + ', ' + data.ctry + '.'
                msgTwo.textContent = 'Now Temperature is ' + data.Temp + ' Celcius. And it\'s ' + data.wd + '. But the temperature feels like ' + data.feel + ' Celcius.'
            }

        })
    })
})


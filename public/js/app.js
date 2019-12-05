console.log('something')


//create an event listner for the submit button which execute the callback funtion

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    message1.textContent = 'Loading . . . '
    message2.textContent = ''
    const value =searchElement.value
    if(!value){
        console.log('no input')
        message2.textContent = 'no input'
    }
    else{
        fetch('/weather/?address=' + value).then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
            message2.textContent = data.error
        }
        else{
            message1.textContent = data.location
            message2.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

    }
})
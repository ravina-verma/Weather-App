const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#message-1')
const msgtwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    msgone.textContent="Loading......"
            msgtwo.textContent=""
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {msgone.textContent=data.error
            console.log(data.error)}
        else
        {
            console.log(data)
            msgone.textContent=data.location
            msgtwo.textContent=" Forcast: " + data.forcast + " Temperature: " + data.Temperature + " Humidity: " + data.humidity}

    })
})
})
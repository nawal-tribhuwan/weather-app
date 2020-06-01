console.log('Client side java script called..')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent='loading ....'
    messageTwo.textContent=''

    fetch('http://localhost:3000/weather?address='+search.value).then((res)=>{

    
        res.json().then((data)=>{

            if (!data.error)    {
                messageOne.textContent = data.place
                messageTwo.textContent = data.forecast
                console.log(data)
            }
            else {
                messageOne.textContent = 'Error'
                messageTwo.textContent = data.error
            }
        })

    })
  
  
})
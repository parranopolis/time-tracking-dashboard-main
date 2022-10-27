const $jsonData = './data.json'
const $col2 = document.querySelector('.col2')

const setAttributeF = (obj,time)=>{
    let timeChoose 
    let {title,timeframes} = obj
    const current = timeframes[time.toLowerCase()].current
    const previous = timeframes[time.toLowerCase()].previous
    if(time == 'Daily')timeChoose = 'Day'
    if(time == 'Weekly')timeChoose = 'Week'
    if(time == 'Monthly')timeChoose = 'Month'
    let attributesArray = [title,current,timeChoose,previous]
    return attributesArray
}
const createTemplate = (data) =>{
    const main = document.createElement('card-template')
    main.setAttribute('title',data[0])
    main.setAttribute('current',data[1])
    main.setAttribute('time',data[2])
    main.setAttribute('previous',data[3])
    $col2.appendChild(main)
}

const upDateTemplateData = (data) =>{
    console.log('updating data of components')
    const main = document.querySelectorAll('card-template')
    main.forEach(element =>{
        console.log(element)
        element.setAttribute('title',data[0])
        element.setAttribute('current',data[1])
        element.setAttribute('time',data[2])
        element.setAttribute('previous',data[3])
    })
    // console.log(main)
}

const option = document.querySelectorAll('.option')

option.forEach(element => {
    element.addEventListener('click', (e)=>{
        const textContent = e.target.textContent
        let tag = e
        const desActice = document.querySelector('.active')
        if(desActice != null){
            desActice.classList.remove('active')
        }
        tag.target.classList.add('active')
        fetch($jsonData)
            .then(res => res.json())
            .then(data => {
                if($col2.childElementCount == 0){
                    for (let i = 0; i < data.length; i++) {
                        let key = data[i]
                        const setAttribute = setAttributeF(key,textContent)
                        createTemplate(setAttribute)
                    }
                }else{
                    const main = document.querySelectorAll('card-template')
                    main.forEach(element => {
                        element.parentElement.removeChild(element)
                    })
                    for (let i = 0; i < data.length; i++) {
                        let key = data[i]
                        
                        const setAttribute = setAttributeF(key,textContent)
                        createTemplate(setAttribute)
                    }
                }
            })
            .catch(err => console.error(err))
    })

});

class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: 'open'})
    }

    static get observedAttributes(){
        // return ['title','url']
        return ['title','current','previous','time']
    }

    attributeChangedCallback(attr,oldVal,newVal){
        if(attr === 'title'){
            this.title = newVal
        }
        if(attr === 'time'){
            this.time = newVal
        }
        if(attr === 'current'){
            this.current = newVal
        }
        if(attr === 'previous'){
            this.previus = newVal
        }
       
        
    }

    getStyles(){
        const color = {
            "Work": "hsl(15, 100%, 70%)",
            "Play": "hsl(195, 74%, 62%)",
            "Study": "hsl(348, 100%, 68%)",
            "Exercise": "hsl(145, 58%, 55%)",
            "Social": "hsl(264, 64%, 52%)",
            "Self_Care": "hsl(43, 84%, 65%)",
        }
        const find = Object.keys(color)
        let background
        for(let i =0 ; i < find.length; i++){
            let key = find[i];
            if(key === this.title) {
                background = color[key]
            }
        }
        
        return`
            <style>
                :host{
                    --primary-color: hsl(235, 46%, 20%);
                    --secondary-color: rgb(63,57,119);
                    --font-size-primary: 14px;
                    --col2-background-color : red;
                    margin-bottom: -1rem;
                }@media (max-width: 700px){
                    .col2-Card-Information{
                        background: var(--primary-color);
                        height: 4.5rem;
                        border-radius: 1rem;
                        padding: 1rem 2rem;
                        position: relative;
                        z-index: 10;
                        bottom: 2.5rem;
                    }
                    .col2-Card-Information:hover{
                        background: var(--secondary-color);
                    }
                    .col2-row1,.col2-row2{
                        display: flex;
                        justify-content: space-between;
                    }
                    .col2-row1 .row1-title{
                        font-size: var(--font-size-primary);
                        font-weight: 400;
                    }
                    .col2-row2{
                        align-items: center;
                    }
                    .col2-row2-hour{
                        font-size: 3rem;
                    }
                    .col2-row2-time{
                        color: rgb(162, 152, 255);
                    }
                    .col2-Background{
                        height: 5rem;
                        border-radius: 1rem;
                        position: relative;
                        z-index: 9;
                        top: 0;
                    }
                    .${this.title}{
                        background-color: ${background};
                    }
                    .col2-Background-Image{
                        float: right;
                    }
                }   
                
            </style>
        `
    }
    getTemplate(){
        const firstletter = this.title.charAt()
        const letterLowerCase = firstletter.toLowerCase()
        const nameIcon = this.title.replace(firstletter,letterLowerCase)
        const card = document.createElement('template')
        card.innerHTML = `
            <div class="col2-Background ${this.title}">
                <img alt='image-card' class='col2-Background-Image' src='./images/icon-${nameIcon}.svg'>
            </div>
            <article class="col2-Card-Information DarkBlue-Color">
                <div class='col2-row1'>
                    <span class='row1-title'>
                        ${this.title}
                    </span>
                    <span class='row1-Icon'>
                        <img src="./images/icon-ellipsis.svg" alt="">
                    </span>
                </div>
                <div class='col2-row2'>
                    <span class='col2-row2-hour'>
                        ${this.current}hrs
                    </span>
                    <span class='col2-row2-time'>
                        Last ${this.time} - ${this.previus}hrs
                    </span>
                </div>
            </article>
            ${this.getStyles()}
        `
        return card
    }
    render(){
        this.shadowRoot.appendChild(this.getTemplate().content.cloneNode('true'))
    }
    connectedCallback(){
        this.render()
    }
}

customElements.define('card-template', Card)
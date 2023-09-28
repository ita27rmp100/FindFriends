// goal's tag
customElements.define('new-goal',class extends HTMLElement{
    connectedCallback(){
        let title = this.getAttribute('title')
        let details = this.getAttribute('details')
        this.innerHTML =`
                    <div class="card">
                        <div class="card-header">
                            <h5>${title}</h5>
                        </div>
                        <div class="card-body">${details}</div>
                    </div>`
        this.setAttribute('class','col m-3')
    }
})
// service's tag
customElements.define('new-service',class extends HTMLElement{
    connectedCallback(){
        let description = this.getAttribute('details') ,
            img = this.getAttribute('img')
        this.innerHTML = `
            <div class="card" >
                <img src="images/services/${img}" class="card-img-top" alt="...">
                <div class="card-body">
                <p class="card-text">${description}</p>
                <a href="${this.getAttribute('src')}" class="btn btn-primary social">اطلب الخدمة</a>
                </div>
            </div>`
        this.setAttribute('class','col m-3')
    }
})
// statistics 
customElements.define('new-ach',class extends HTMLElement{
    connectedCallback(){
        this.innerHTML=`<div class="card bg-transparent text-light stCard">
                            <div class="card-body">
                            <h3  id=${this.getAttribute('idCild')} >${this.getAttribute('value')}</h3>
                            <h6>${this.getAttribute('of')}</h6>
                            </div>
                        </div>`
        this.setAttribute('class','col m-3')
    }
})
// jQuery code
    // scrolling settings
$(window).scroll(
    function() {
        let height = $('body').css('height').replace('px','')
        let progress = (pageYOffset*150)/height
        $('#loading').attr('aria-valuenow',progress)
                    .css('width',`${progress}%`)
        if (pageYOffset>='300') {
            $('#arrow').fadeIn(1500)
        } else {
            $('#arrow').fadeOut(1500)
        }
        if (pageYOffset>='2350') {
            setTimeout(() => {
                $('id').fadeOut()
            }, 1000);
        }
    }
)
    // statistics counter
function counter(id) {
    let value = Number($(id).text())
    console.log(value)
    $(id).text('0')
    for (let i = 0; i <= value; i++) {
        setTimeout(() => {
            $(id).text(`${i}`)
        },100);
    }
}
$(document).ready(
    function() {
        //  social media settings
        $('.social').attr({
            'data-toggle':'modal',
            'data-target':'#modal',
            'target':'_blank'
        }).addClass('btnLink');
        // statistics
        $('.status').slideDown()
        counter('#students')
        counter('#courses')
        counter('#lectures')
        counter('#followers')
        //  events
        $('.btnLink').click(
            function(params) {
                let link = $(this).attr('href')
                $('#confirm').click(function() {
                    $('#modal').modal('toggle')
                    window.location = link
                })
            }
        )
        $('#arrow').click(
            function() {
                window.location = '#'
            }
        )
        $('.chapter').addClass('pt-4 pb-4 h-75 text-center')
        $('label').addClass('p-1 ')
        // courses
        $('.headerCourse').fadeTo(500,1)
        $('body').fadeTo(5,1)
    }
)

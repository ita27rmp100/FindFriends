// selection bar 
let moods = ['login','signup'] , indexMode = 1
function toogleMood(){
    // chosen
    $(`#${moods[Math.abs(indexMode-1)]}`).addClass('btn-outline-dark')
    $(`#${moods[Math.abs(indexMode-1)]}`).removeClass('btn-light')
    // replaced one
    $(`#${moods[indexMode]}`).addClass('btn-light')
    $(`#${moods[indexMode]}`).removeClass('btn-outline-dark')
    indexMode = Math.abs(indexMode-1)
}


// edit on navbar according to title
$(document).ready(
    function(){
        $("label").addClass("btn p-3 active col-5")
        if((document.title).includes("chating") == false){
            $(".headForms").remove()
        }
    }
)
// edit on navbar according to title
$(document).ready(
    function(){
        if((document.title).includes("chating") == false){
            $(".headForms").remove()
        }
    }
)
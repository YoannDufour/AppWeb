var isBall = 0;

$(document).ready(function () {
    $("#myModal").modal({
        show: 'true'
    });
})


function incant() {
    size = document.getElementById("Incantation").value.length;
    const Incantation = "Qui gobe une noix de coco fait confiance à son anus";
    document.getElementById("Incantation").value = Incantation.substring(0, size);
}


function changeDisplay() {
    if (isBall == 0) {
        document.getElementById("global_form").style.display = "none";
        isBall = 1;
        document.getElementById("truthBall").style.display = "initial";
        document.getElementById("ball_container").onclick = function () {
            turnBall();
            YESNO();
            this.onclick = null;
        };
        return;
    }
    if (isBall == 1) {
        document.getElementById("global_form").style.display = "initial";
        isBall = 0;
        document.getElementById("truthBall").style.display = "none";
        document.getElementById("ball_container").classList.remove("ball_back");
        document.getElementById("meme").src = "";
        document.getElementById("reponse").innerHTML = "";
        document.getElementById("meme").classList.remove("appear");
        document.getElementById("retry").classList.remove("appear");
        return;
    }
}

function turnBall() {
    document.getElementById("ball_container").classList.add("ball_back");
}



function YESNO() {
    var answer;
    var imageURL;
    var data;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            data = xhr.responseText;
            data = JSON.parse(data);
            answer = data.answer
            imageURL = data.image;
            document.getElementById("meme").src = imageURL;
            document.getElementById("reponse").innerHTML = answer.toUpperCase();
        }
    }
    xhr.open('GET', 'https://yesno.wtf/api');
    xhr.send(null);
    setTimeout(function () {
        document.getElementById("meme").classList.add("appear");
        document.getElementById("retry").classList.add("appear");
    }, 2000);
}
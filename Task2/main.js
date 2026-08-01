function changetheme() {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-white");
}

function changeButtonText() {

    let btn = document.getElementById("btn-get-start");

    btn.innerText = "Welcome! 🎉";
}
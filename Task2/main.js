function changetheme() {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("text-white");
}

function changeButtonText() {

    let btn = document.getElementById("btn-get-start");

    btn.innerText = "Welcome! 🎉";
}
const form = document.querySelector(".complainForm")
const btn = document.querySelector(".submit")
const complaintCategory = document.querySelector("#category");
const complaintType = document.querySelector("#type");
const Description = document.querySelector("#Description");
const locationInput = document.querySelector("#Location");
const time = document.querySelector("#Time");
const date = document.querySelector("#date");
const tittle = document.querySelector("#tittle")


btn.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/complain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            complaintCategory: complaintCategory.value,
            complaintType: complaintType.value,
            Description: Description.value,
            tittle: tittle.value,
            Location: locationInput.value,
            time: time.value,
            date: date.value
        })

    }).then((res) => {
        // console.log(res);
        return res.json();
    }).then((task) => {
        const data = task;
        if(task)
        {
            alert("complain added");
            window.location.href = "dashboard.html"
        }
        console.log(task);
    }).catch((err) => {
        console.log(err);
    })

}); 

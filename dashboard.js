// ===============================Dashboard JavaScript ===============================

const complaintList = document.querySelector("#complaintList")

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
    });
});

// // Search Complaint
const searchInput = document.querySelector(".search input");
const tableRows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    tableRows.forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});

// // Notification Bell
// const bell = document.querySelector(".fa-bell");

// bell.addEventListener("click", () => {
//     alert("📢 No new notifications.");
// });

// Dashboard Cards Animation
const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0) scale(1)";

    });

});



document.getElementById("newComplaint").addEventListener("click", () => {
    window.location.href = "complainForm.html";
});

document.getElementById("newComplaint1").addEventListener("click", () => {
    window.location.href = "complainForm.html";
});

document.getElementById("myComplain").addEventListener("click", () => {
    window.location.href = "#complaintList";
});


// View Buttons
document.querySelectorAll("table button").forEach(btn => {

    btn.addEventListener("click", () => {

        alert("Complaint Details Page");

    });

});

// Hero Button
// document.querySelector(".hero button").addEventListener("click", () => {

//     window.location.href = "complainForm.html";

// });

// Logout
// const logout = document.querySelector(".fa-right-from-bracket");

// logout.addEventListener("click", () => {

//     let confirmLogout = confirm("Do you want to logout?");

//     if (confirmLogout) {

//         window.location.href = "index.html";

//     }

// });

// // Welcome Message
// window.onload = function () {

//     console.log("Welcome to ResolveHub Dashboard");

// }

fetch("http://127.0.0.1:3000/stats")
    .then(res => res.json())
    .then(data => {

        document.getElementById("Total").innerText = data.total;
        document.getElementById("pending").innerText = data.pending;
        document.getElementById("resolved").innerText = data.resolved;
        document.getElementById("progress").innerText = data.progress;

    });

let complain = [

]

function loadComplain() {

    fetch("http://127.0.0.1:3000/complain")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            complain = data;
            renderComplain();
            // console.log(complain);
        })
        .catch((err) => {
            console.log(err);
        })

}

function renderComplain() {
    complaintList.innerHTML = ""
    complain.forEach((comp) => {
        complaintList.innerHTML += `
         <tr>

            <td>CMP101</td>

            <td>${comp.complaintCategory}</td>

            <td><span class="pending">${comp.status}</span></td>

            <td>${comp.date}</td>

            <td><button onclick="viweComplain('${comp._id}')">View</button></td>

        </tr>`
    })

}

const details = document.querySelector(".details")
async function viweComplain(id) {

    try {
        const complaint = await fetch(`http://127.0.0.1:3000/complain/${id}`)
        const NewComplain = await complaint.json();
        // console.log(NewComplain);
        renderOneComplain(NewComplain)
    }
    catch (err) {
        console.log(err);
    }

}

function renderOneComplain(NewComplain) {
    details.innerHTML = `
            <h2>Complaint Details</h2>

            <p><strong>ID :</strong> CMP001</p>

            <p><strong>Citizen :</strong> Ankit Dhakad</p>

            <p><strong>Category :</strong>${NewComplain.complaintCategory} </p>


            <p><strong>Description :</strong> ${NewComplain.Description}.</p>

            <p><strong>Date :</strong>${NewComplain.date} </p>

            `
}

loadComplain();
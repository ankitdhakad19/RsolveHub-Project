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

const complaintList = document.querySelector(".complaintList")


function renderComplain() {
    complaintList.innerHTML = ""
    complain.forEach((comp) => {
        complaintList.innerHTML += `
         <tr>

            <td>CMP001</td>

            <td>Ankit</td>

            <td>${comp.complaintCategory}</td>

            <td>${comp.date}</td>

            <td><span class="pending">${comp.status}</span></td>

            <td><button onclick="viweComplain('${comp._id}')" >View</button></td>

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

            <label>Status</label>

            <select class="status">

                <option>Pending</option>

                <option>In Progress</option>

                <option>Resolved</option>

            </select>

            <br><br>

            <button onclick="updateStatus('${NewComplain._id}')" >Update Status</button>
            `
}




async function updateStatus(id) {
    try {
        const status = document.querySelector(".status");
        console.log(status)
        const res = await fetch(`http://127.0.0.1:3000/complain/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status.value
            })
        });


        const data = await res.json();

        console.log("Updated:", data);

        loadComplain();
        if (data) {
            alert("updated")
        }
    } catch (err) {
        console.log(err);
    }
}

loadComplain();
import baseURL from "./baseURL.js"
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');
let loding_container=document.getElementById("loding_container")
menu.onclick = () => {
	menu.classList.toggle('fa-times');
	navbar.classList.toggle('active');
};

window.onscroll = () => {
	menu.classList.remove('fa-times');
	navbar.classList.remove('active');
};


let loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"))
if (!loggedInUser) {
    window.location.href="../index.html"
}
let loggedInUserEmail = loggedInUser.email;
console.log(loggedInUser)


let totallength;
getClasslength(loggedInUser._id)
async function getClasslength(id) {
    try {
        loding_container.style.display="block";
        let fetchingData = await fetch(baseURL + `/class/searchByUserID/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${loggedInUserEmail}`
            }
        })
        let temp = await fetchingData.json()
        if (fetchingData.ok) {
            loding_container.style.display="none";
            totallength = temp.classes.length
            renderUserInfo(totallength)
        } else {
            console.log(temp)
            alert(fetchingData.message)
        }
    } catch (error) {
        loding_container.style.display="none";
        alert('Server Error')
        console.log(error.message)
    }

}

let allclientinfo = document.getElementById("clientinfo")

function renderUserInfo(totallength) {
    allclientinfo.innerHTML = ''
    allclientinfo.innerHTML = `<div id="clientname">
<div id="profimgdiv">
    <img src=${renderProfileImg()} alt="" id="profileimg">
</div>
<div id="clientnamediv">
    <p>Hi, ${loggedInUser.name}</p>
    <p>Welcome back - Let's get Started! </p>
    
</div>

</div>
`
}







function renderTotalClass(count) {
    if (count <= 0) {
        return ` <p class="notclassrender">You didn't join any class.</p>
<p class="notclassrender">For join class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>`
    } else {
        return `<div id="notclassdiv">
    <p class="notclassrender">Total classes joind by you is ${count}.</p>
<p class="notclassrender">For join more class <a id='searchanc' href="./userSearchClass.html">click here.</a></p>
</div>`
    }
}




getClass(loggedInUser._id)
async function getClass(id) {
    try {
        let fetchingData = await fetch(baseURL + `/class/searchByUserID/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${loggedInUserEmail}`
            }
        })
        let temp = await fetchingData.json()
        if (fetchingData.ok) {
            console.log(temp)
            renderderAllData(temp.classes)
        } else {
            console.log(temp)
            alert(fetchingData.message)
        }
    } catch (error) {
        alert('Server Error')
        console.log(error.message)
    }

}



// let divForRender = document.getElementsByClassName("card")
let divForRender = document.getElementById("cardcontainer")

                async function renderderAllData(allData) {
                    // console.log(allData)
                    divForRender.innerHTML = ""
                    let map_allData = allData.map(elem => {
                        return `                            
                        <div class="card">
                        <div class="left1">
                            <p class="day">On ${elem.classDate[8]}${elem.classDate[9]}th </p>
                            <span class="time">At ${elem.classTime}</span>
                        </div >
                        <div class="information">
                            <h4> <a href=./classDetails.html?id=${elem._id} >${elem.title}</a></h4>
                            <span>${elem.seatOccupied} Seats Booked in ${elem.seatTotal} Seats </span>
                            <br>
                            <span>Total Price: ₹ ${elem.price}</span>
                        </div>
                        <div class="classinfo">
                            <span class="classinfoname"><b>Class : </b>${elem.activity}</span>
                        </div>
                        <a class="joinclassbutton " data-id=${elem._id}>Details</a>
                        </div>
                                                                `
                
                    })




                // for (let i = 0; i < divForRender.length; i++) {
                //     divForRender[i].innerHTML = map_allData.join("")
                //   }

                  divForRender.innerHTML = map_allData.join("")

    let joicClassbtn = document.querySelectorAll('.joinclassbutton')
    joicClassbtn.forEach(elem => {
        elem.addEventListener('click', (event) => {
            let id = event.target.dataset.id;
            window.location.assign(`./classDetails.html?id=${id}`)
        })
    })
}

function checkvenue(venue, locationOrLink) {
    if (venue === "online") {
        return 'Online-via Zoom'
    } else {
        return `Venue - At ${locationOrLink}`
    }
}


function renderImages(actname) {
    let allImagesData = {
        yoga: ["../Images/Classes_Images/yoga1.jpg", "../Images/Classes_Images/yoga2.jpg", "../Images/Classes_Images/yoga3.jpg"],
        cardio: ["../Images/Classes_Images/boxing1.jpg", "../Images/Classes_Images/aerobics2.jpg", "../Images/Classes_Images/crossfit1.jpg"],
        swimming: ["../Images/Classes_Images/swimming1.jpg", "../Images/Classes_Images/swimming2.jpg", "../Images/Classes_Images/swimming3.jpg"],
        running: ["../Images/Classes_Images/football1.jpg", "../Images/Classes_Images/football2.jpg", "../Images/Classes_Images/football3.jpg"],
        zumba: ["../Images/Classes_Images/zumba1.jpg", "../Images/Classes_Images/zumba2.jpg", "../Images/Classes_Images/zumba3.jpg"],
        aerobics: ["../Images/Classes_Images/aerobics1.jpg", "../Images/Classes_Images/aerobics2.jpg", "../Images/Classes_Images/aerobics3.jpg"],
        ballet: ["../Images/Classes_Images/ballet1.jpg", "../Images/Classes_Images/ballet2.jpg", "../Images/Classes_Images/ballet3.jpg"],
        basketball: ["../Images/Classes_Images/basketball1.jpg", "../Images/Classes_Images/basketball2.jpg", "../Images/Classes_Images/basketball3.jpg"],
        boxing: ["../Images/Classes_Images/boxing1.jpg", "../Images/Classes_Images/boxing3.jpg", "../Images/Classes_Images/boxing2.jpg"],
        crossfit: ["../Images/Classes_Images/crossfit1.jpg", "../Images/Classes_Images/crossfit3.jpg", "../Images/Classes_Images/crossfit2.jpg"],
        cycling: ["../Images/Classes_Images/cycling1.jpg", "../Images/Classes_Images/cycling2.jpg", "../Images/Classes_Images/cycling3.jpg"],
        football: ["../Images/Classes_Images/football1.jpg", "../Images/Classes_Images/football2.jpg", "../Images/Classes_Images/football3.jpg"],
        kickboxing: ["../Images/Classes_Images/kickboxing1.jpg", "../Images/Classes_Images/kickboxing2.jpg", "../Images/Classes_Images/kickboxing3.jpg"],
        singing: ["../Images/Classes_Images/singing1.jpg", "../Images/Classes_Images/singing3.jpg", "../Images/Classes_Images/singing2.jpg"],
        weighttraining: ["../Images/Classes_Images/weighttraining1.jpg", "../Images/Classes_Images/weighttraining2.jpg", "../Images/Classes_Images/weighttraining3.jpg"],
        dance: ["../Images/Classes_Images/dance1.jpg", "../Images/Classes_Images/dance2.jpg", "../Images/Classes_Images/dance3.jpg"]
    }
    let newactname = actname.toLowerCase()
    let name = allImagesData[`${newactname}`]

    let imgLink = getRandomItem(name)
    return (imgLink)
}

function getRandomItem(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let item = arr[randomIndex];
    return item;
}

function renderProfileImg() {
    let arr = ["../imgs/Profile_Images/1680420864318.png", "../imgs/Profile_Images/1680420887007.png", "../imgs/Profile_Images/1680420927232.png", "../imgs/Profile_Images/1680420953188.png", "../imgs/Profile_Images/1680420980976.png", "../imgs/Profile_Images/1680421002568.png", "../imgs/Profile_Images/1680421096922.png"]
    // let arr=["https://images.pexels.com/photos/10929340/pexels-photo-10929340.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/5094997/pexels-photo-5094997.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/4401806/pexels-photo-4401806.jpeg?auto=compress&cs=tinysrgb&w=600","https://images.pexels.com/photos/16015725/pexels-photo-16015725.jpeg?auto=compress&cs=tinysrgb&w=600"]

    let imgLink = getRandomItem(arr)
    return imgLink
}

// showing user's name on nav bar
let user_name=document.getElementById("user_name");

user_name.innerText=loggedInUser.name;

function logoutFun(){
    sessionStorage.clear();
    window.location.href="../index.html"
}

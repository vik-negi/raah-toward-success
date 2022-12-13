

const profile = document.getElementById("profile");
const submissions = document.getElementById("submissions");
const resources = document.getElementById("resources");4

profile.addEventListener("click" , ()=>{
    console.log("called navigation button")
    if(submissions.classList.contains("active")){
        submissions.classList.toggle("active");
        profile.classList.toggle("active")
    }
    if(resources.classList.contains("active")){
        resources.classList.toggle("active");
        profile.classList.toggle("active");
    }
})
submissions.addEventListener("click" , ()=>{
    console.log("called navigation button")
    if(profile.classList.contains("active")){
        profile.classList.toggle("active")
        submissions.classList.toggle("active");
    }
    if(resources.classList.contains("active")){
        resources.classList.toggle("active");
        submissions.classList.toggle("active");
    }
})
resources.addEventListener("click" , ()=>{
    console.log("called navigation button")
    if(profile.classList.contains("active")){
        profile.classList.toggle("active")
        resources.classList.toggle("active");
    }
    if(submissions.classList.contains("active")){
        submissions.classList.toggle("active");
        resources.classList.toggle("active");
    }
})





const profile = document.getElementById("profileButton");
const submissions = document.getElementById("submissionButton");
const resources = document.getElementById("resourcesButton");
const updates = document.getElementById("updates");
const copyButton = document.getElementById("copy_button");




const submissionTexts = document.getElementsByClassName("submission-text");



const link = window.location.href;


const firstTime = () => {
    if(link.includes("profile")){
        profile.classList.toggle("active");
    }else if(link.includes("submissions")){
        submissions.classList.toggle("active");
    }else{
        resources.classList.toggle("active");
    }
}


firstTime();



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
    if(updates.classList.contains("active")){
        updates.classList.toggle("active");
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
    if(updates.classList.contains("active")){
        updates.classList.toggle("active");
        submissionTexts.classList.toggle("active");
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
    if(updates.classList.contains("active")){
        updates.classList.toggle("active");
        resources.classList.toggle("active");
    }
})
updates.addEventListener("click" , ()=>{
    console.log("called navigation button")
    if(profile.classList.contains("active")){
        profile.classList.toggle("active")
        updates.classList.toggle("active");
    }
    if(submissions.classList.contains("active")){
        submissions.classList.toggle("active");
        updates.classList.toggle("active");
    }
    if(resources.classList.contains("active")){
        resources.classList.toggle("active");
        updates.classList.toggle("active");
    }
})



function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    // return text.replace(urlRegex, function(url) {
    //   return '<a href="' + url + '">' + url + '</a>';
    // })
    return text.replace(urlRegex, '<a href="$1">$1</a>');
}


const extracturls =  () =>{
    for( var i in submissionTexts){
        submissionTexts[i].innerHTML = urlify(submissionTexts[i].innerHTML);
    }
}


extracturls();



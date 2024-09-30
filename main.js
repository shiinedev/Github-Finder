const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const savedList = document.querySelector("#saved-list");
const resultList = document.querySelector("#result-list");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const a = document.querySelector("a");


const loadData = () =>{
    const oldData = getdataFromLocal();
    oldData.forEach(element => {
        addToDom(element);
        savedList.style.display = "none";
    });
}
document.addEventListener("DOMContentLoaded",loadData);

a.addEventListener("click", (e) =>{
    e.preventDefault();
    h1.textContent = "Go back";
    h2.textContent = "Saved Users";
    a.textContent = "Clear users";
    savedList.style.display = "none";
     searchForm.style.display = "none";
     resultList.style.display = "grid";
     h1.addEventListener("click", () =>{
        h1.textContent = "Github Finder";
        h2.textContent = "Home";
        a.textContent = "saved users";
        savedList.style.display = "none";
        searchForm.style.display = "flex";
        resultList.style.display = "none";
     })
     
})
const fetchUsersData = async (e) =>  {
    e.preventDefault();
    try {
        if(searchInput.value === ""){
            alert("enter user name")
        }else{
            const response = await fetch(`https://api.github.com/users/${searchInput.value}`);
            const res = await response.json() ;
           if(res.name == null){
                alert("enetr right user name");
           }else{
            let userData = {
                id: Date.now(),
                userImg : res.avatar_url,
                userLogin : res.login,
                userName : res.name,
                userfollowers :res.followers,
                userFollowing : res.following

            }
            addToDom(userData)
           }
            
        }
       
        
       
        
    } catch (error) {
        console.log(error);
        
    }
   
}

searchForm.addEventListener("submit", fetchUsersData);
const addToDom = (data) =>{
    savedList.style.display = "flex";
    savedList.innerHTML = ` <img src="${data.userImg}" alt="">
            <h3 class="name">${data.userLogin}</h3>
            <h6 class="username">@${data.userName}</h6>
            <span class="followers">followers : ${data.userfollowers}</span>
            <span class="following">following : ${data.userFollowing}</span>
            <button class="save-btn">save</button>`;

            const div = document.createElement("div");
            div.className = "result-item";
            div.innerHTML = ` <img src="${data.userImg}" alt="">
            <h3 class="name">${data.userLogin}</h3>
            <h6 class="username">@${data.userName}</h6>
            <span class="followers">followers : ${data.userfollowers}</span><br>
            <span class="following">following : ${data.userFollowing}</span><br>
             <button class="delete-btn">Delete</button>`
    // resultList.innerHTML += ` <div class="result-item">
    //         <img src="${data.userImg}" alt="">
    //         <h3 class="name">${data.userLogin}</h3>
    //         <h6 class="username">@${data.userName}</h6>
    //         <span class="followers">followers : ${data.userfollowers}</span>
    //         <span class="following">following : ${data.userFollowing}</span>
    //          <button class="delete-btn">Delete</button>
    //     </div>`

    resultList.appendChild(div);
     const deleteBtn = div.querySelector(".delete-btn");
        
            attachHandle(savedList,data,deleteBtn,div);
            
            
}

const attachHandle = (saved,data,deleteBtn,div) =>{
    const saveBtn = saved.querySelector(".save-btn");
    
    saveBtn.addEventListener("click", () => {
        addToLocal(data);
        alert('user saved successfully!');
    })
    deleteBtn.addEventListener("click", ()=>{
        let oldData = getdataFromLocal();
   oldData =  oldData.filter(element => element.id != data.id);
       localStorage.setItem("data", JSON.stringify(oldData));
       div.remove();
         alert("user deleted successfully");
     })
}


const addToLocal = (data) => {
    let oldData = getdataFromLocal();
     oldData.push(data)
    localStorage.setItem("data",JSON.stringify(oldData));
}

const getdataFromLocal = () =>{
    const oldData = JSON.parse(localStorage.getItem("data")) || [];
   return oldData;
     
}

// button active or not
const allBtn = document.querySelectorAll('.nav-btn');
allBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        allBtn.forEach(item => {
            item.classList.remove('bg-[#4A00FF]', 'text-white');
            item.classList.add('text-[#64748B]');
        });
        this.classList.add('bg-[#4A00FF]', 'text-white');
        this.classList.remove('text-[#64748B]');
    });
});

// load data
let allIssues = [];

const loadIssue = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            allIssues = data.data;
            displayIssue(allIssues);
        });
};
loadIssue();

//display
const displayIssue = (issues) => {
    const container = document.getElementById('issue-container1');
    container.innerHTML = "";
    document.getElementById("issue-count").innerText = issues.length + " Issues";
    container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10";

    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500';



        //lables map

        const labelsHTML = issue.labels.map(label =>
            `<button class="px-1 py-1 text-[10px] rounded-lg mr-1 mb-1 capitalize  border border-gray-300 ${label === 'bug' ? 'text-red-500 bg-[#FEECEC] px-5 py-2 border border-red-500'
                : label === 'enhancement' ? 'text-green-500 bg-[#ECFDF5] py-2 border border-green-500'
                    : label === 'documentation' || label === 'help wanted' ? 'text-[#F59E0B] bg-[#FFF6D1]  py-2 border border-[#F59E0B-500'
                        : 'text-gray-700 bg-gray-200'}">
        ${label}
    </button>`
        ).join('');


        // Create card element
        const card = document.createElement("div");
        card.className = `card bg-white shadow-lg border-t-4 ${borderColor} p-4 cursor-pointer`;

        card.innerHTML = `
<div class="flex items-center justify-between gap-2 mb-2">
    <img src="${(issue.priority === 'high' || issue.priority === 'medium')
                ? './assets/open-status.png'
                : './assets/Closed- Status .png'
            }" class="w-8 h-8" />

    <span class="text-xs font-bold capitalize px-3 py-1  rounded-lg ${issue.priority === 'high'
                ? 'text-[#EF4444] bg-[#FEECEC]'
                : issue.priority === 'medium'
                    ? 'text-[#F59E0B] bg-[#FFF6D1]'
                    : 'text-[#9CA3AF] bg-[#F3E8FF]'
            }">
        ${issue.priority}
    </span>

    
</div>
        
          
            <h3 class="font-semi-bold text-[14px">${issue.title}</h3>
            <p class="text-[12px] text-gray-500 my-2 line-clamp-2">The navigation menu doesn't collapse properly on mobile devices...</p>

 <div class="flex  my-2 justify-between mx-auto ">
        ${labelsHTML}


    </div>
    <span class=" text-gray-300 m-0  my-4 " > <hr> </span>

            <div class="flex flex-col text-left text-[#64748B] items-start mt-4">

               <div>  <span class="text-xs">#1by john_doe
               </span></div>
  
               <div>  <span class="text-xs ">1/15/2024</span></div> 
                </div>
              

                
           
        `;

        // Add click listener for Details button

        card.addEventListener("click", () => loadSingleIssue(issue.id));
        const btn = card.querySelector("button");
        btn.addEventListener("click", () => loadSingleIssue(issue.id));

        container.appendChild(card);
    });
};

//filter part
const navBtns = document.querySelectorAll(".nav-btn");

// All
navBtns[0].addEventListener("click", () => displayIssue(allIssues));

// Open
navBtns[1].addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayIssue(openIssues);
});

// Closed
navBtns[2].addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayIssue(closedIssues);
});

//search part
const searchInput = document.querySelector('input[type="search"]');
searchInput.addEventListener('input', () => {
    const text = searchInput.value.toLowerCase();
    const filtered = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(text) ||
        issue.description.toLowerCase().includes(text)
    );
    displayIssue(filtered);
});

//modal part
const loadSingleIssue = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(data => showModal(data.data));
};

const showModal = (issue) => {

const labelsHTML = issue.labels.map(label =>
`<button class="px-2 py-1 text-xs rounded-lg mr-1 mb-1 capitalize border border-gray-300
${label === 'bug' ? 'text-red-500 bg-[#FEECEC] border-red-500'
: label === 'enhancement' ? 'text-green-500 bg-[#ECFDF5] border-green-500'
: label === 'documentation' || label === 'help wanted'
? 'text-[#F59E0B] bg-[#FFF6D1] border-[#F59E0B]'
: 'text-gray-700 bg-gray-200'}">
${label}
</button>`
).join('');





    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        

    <h2 class="text-xl font-bold mb-4">${issue.title}</h2>

        


<div class=" flex  items-start justify-start"><ul class="flex flex-wrap gap-4 text-sm text-gray-700">
            <li class="    bg-green-500 px-4 py-1 text-white text-center rounded-md"> ${issue.status}</li>
            <li>${issue.author}</li>
           
           
            <li> ${issue.createdAt}</li>
        </ul></div>
<div class="flex gap-2 flex-wrap my-3">
${labelsHTML}
</div>
        
  <p class="my-5 text-[13px]">${issue.description}</p>


   <div class=" flex justify-start items-center gap-25 capitalize">
   <div class="">
   <p> Assignee</p>
   <p class="font-bold"> ${issue.author}</p>
   
   </div>
   <div class="">
   <p> Priority</p>
   <p class="font-bold bg-red-500 rounded-md border border-red-500 text-center text-white px-3 py-1 capitalize" >  ${issue.priority}</p>
   </div>
   </div>
        
    `;
    document.getElementById("issue_modal").showModal();
};
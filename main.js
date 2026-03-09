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

            <div class="flex flex-col text-left text-[#64748B] items-start mt-4">

               <div>  <span class="text-xs">#1by john_doe
               </span></div>
  
               <div>  <span class="text-xs ">1/15/2024</span></div> 
                </div>
              

                <button class="btn btn-xs btn-primary">Details</button>
           
        `;

        // Add click listener for Details button
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
    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <h2 class="text-xl font-bold mb-2">${issue.title}</h2>
        <p class="mb-3">${issue.description}</p>
        <p><b>Status:</b> ${issue.status}</p>
        <p><b>Author:</b> ${issue.author}</p>
        <p><b>Priority:</b> ${issue.priority}</p>
        <p><b>Label:</b> ${issue.label}</p>
        <p><b>Created:</b> ${issue.createdAt}</p>
    `;
    document.getElementById("issue_modal").showModal();
};
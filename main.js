
// nav btn part 


const allBtn = document.querySelectorAll('.nav-btn');
allBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        allBtn.forEach(item => {
            item.classList.remove('bg-[#4A00FF]', 'text-white');
            item.classList.add('text-[#64748B]');


        }
        );

this.classList.add('bg-[#4A00FF]', 'text-white');
        this.classList.remove('text-[#64748B]');

    });
});

// data load

const loadIssue =()=>{

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then ((res) => res.json())

.then(json => displayIssue(json))
};


const displayIssue =(issue)=>{

    console.log(issue);
}
loadIssue();
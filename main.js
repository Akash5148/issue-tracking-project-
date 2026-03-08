
// nav btn part 


const allBtn = document.querySelectorAll('.nav-btn');
allBtn.forEach(btn => {
    btn.addEventListener('click', function () {
        allBtn.forEach(iteam => {
            iteam.classList.remove('bg-[#4A00FF]', 'text-white');
            iteam.classList.add('text-[#64748B]');


        }
        );

this.classList.add('bg-[#4A00FF]', 'text-white');
        this.classList.remove('text-[#64748B]');

    });
}
);
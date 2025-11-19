//accessing the extensions for the data json file and diplaying them...

const container = document.querySelector('.extension-list');


let extensions = [];
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        extensions = data;

        document.dispatchEvent(new Event('extensionsLoaded'));
    })

document.addEventListener('extensionsLoaded', () =>{
    displayExtension(extensions);
})


function addEventListeners(){
    const removeBtns = document.querySelectorAll('.removeBtn');

    removeBtns.forEach(removeBtn =>{
        removeBtn.addEventListener('click',removeExtension);
    })

    const toggleBtns = document.querySelectorAll('.bottom-sec > div');

    toggleBtns.forEach(toggleBtn => {
        toggleBtn.addEventListener('click',function(e){
            toggle(e);

            const filterBtns = document.querySelectorAll('.filters > button');

            filterBtns.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.click();
                }
            });
        });
    })
}


function removeExtension(e) {

    

    const extensionElement = e.target.closest('.extension');

    const nameToRemove = extensionElement.querySelector('h3').textContent;
    const confirmation = confirm(`do you want to remove ${nameToRemove} extension?`);

    if (confirmation) {
        extensionElement.remove();

        extensions = extensions.filter(ext => ext.name !== nameToRemove);
    }else{
        return;
    }

}

function toggle(e) {
    const toggleElement = e.target.closest('.toggle-switch-on') || 
                        e.target.closest('.toggle-switch-off');

    const extensionElement = e.target.closest('.extension');

    toggleElement.classList.toggle('toggle-switch-on');
    toggleElement.classList.toggle('toggle-switch-off');

    extensions.forEach(extension=>{
        if (extension.name === extensionElement.querySelector('h3').textContent) {
            extension.isActive = !extension.isActive;
        }
    })
}


//filtering the extensions...

const activeBtn = document.querySelector('.BtnActive');
const inactiveBtn = document.querySelector('.BtnInActive');
const allBtn = document.querySelector('.BtnAll');

activeBtn.addEventListener('click', ()=>{
    const ext = extensions.filter(ext=>ext.isActive===true);
    displayExtension(ext);

    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    allBtn.classList.remove('active');

})

// Add the missing event listeners
inactiveBtn.addEventListener('click', () => {
    const ext = extensions.filter(ext => ext.isActive === false);
    displayExtension(ext);

    inactiveBtn.classList.add('active');
    activeBtn.classList.remove('active');
    allBtn.classList.remove('active');
})

allBtn.addEventListener('click', () => {
    displayExtension(extensions);
    
    allBtn.classList.add('active');
    activeBtn.classList.remove('active');
    inactiveBtn.classList.remove('active');
})



//displaying after a filter...
function displayExtension(exts){

    container.innerHTML='';
        exts.forEach(extension =>{
        const extHtml = `
        <div class="extension">
            <div class="top-sec">
                <img src="${extension.logo}" alt="">
                <div class="details">
                    <h3>${extension.name}</h3>
                    <p>${extension.description}</p>
                </div>
            </div>

            <div class="bottom-sec">
                    <button class="removeBtn">Remove</button>
                <div class="${extension.isActive? 'toggle-switch-on': 'toggle-switch-off'}">
                    <div class="slider"></div>
                </div>
            </div>
        </div>
        `;

        container.innerHTML += extHtml;
    })

    //checking if it is in night mode or dark mode...
    const themeBtn = document.querySelector('.themeBtn');

    if (themeBtn.getAttribute('src')!=='assets/images/icon-sun.svg') {
        const extensions = document.querySelectorAll('.extension');
        const paragraphs = document.querySelectorAll('.details p');
    
        extensions.forEach(ext => ext.classList.toggle('light'));
        paragraphs.forEach(p => p.classList.toggle('light'));
    }
    addEventListeners();
}


//night light and day light toggle functionality...

const body = document.querySelector('body');
const styleBar = document.querySelector('.style-bar');
const themeBtn = document.querySelector('.themeBtn');
const filterBtns = document.querySelectorAll('.filters > button');
const extension = document.querySelector('.extension');
const para = document.querySelector('.details p');
const rmvBtn = document.querySelectorAll('.removeBtn')


themeBtn.addEventListener('click', ()=>{
    // Toggle theme classes...
    body.classList.toggle('light');
    styleBar.classList.toggle('light');
    themeBtn.classList.toggle('light');
    
    // Update theme button icon...
    if(themeBtn.classList.contains('light')){
        themeBtn.setAttribute('src','assets/images/icon-moon.svg');
    } else {
        themeBtn.setAttribute('src','assets/images/icon-sun.svg');
    }
    
    // Apply to ALL extensions, paragraphs and filters...
    const extensions = document.querySelectorAll('.extension');
    const paragraphs = document.querySelectorAll('.details p');
    
    extensions.forEach(ext => ext.classList.toggle('light'));
    paragraphs.forEach(p => p.classList.toggle('light'));
    
    filterBtns.forEach(btn => btn.classList.toggle('light'));

    rmvBtn.forEach(btn=> btn.classList.toggle('light'))
})


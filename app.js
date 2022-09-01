// load all phones from api 

const loadPhones = async (search = 'iphone') => {
    const url = 'https://openapi.programming-hero.com/api/phones?search='+search;
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data);
}

// display all phones from api to UI 

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML=``;
    const noMessage = document.getElementById('no-found-message');
    if(phones.length === 0){
        noMessage.classList.remove('d-none');
    }else{
        noMessage.classList.add('d-none');
    }
    const showAll = document.getElementById('see-all');    
    if(phones.length >10){
        phones= phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.brand}</p>
              <button id="load-phone-details" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Specifications</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggolSpinner(false);
}
loadPhones();

// search button

document.getElementById('search-btn').addEventListener('click', function(){
    toggolSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhones(searchValue);
    searchField.value ='';
})

// toggol spinner 

const toggolSpinner = isLoading=>{
    const loadingStatus = document.getElementById('show-spinner');
    if(isLoading){
        loadingStatus.classList.remove('d-none');
    }else{
        loadingStatus.classList.add('d-none');
    }
}

// load phone details 

const loadPhoneDetails =(id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data));
}
const displayModal = details =>{
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = details.name;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML=`
    <p>Brand: ${details.brand}</p>
    <p>storage: ${details.mainFeatures ? details.mainFeatures.storage : 'Not available'}</p>
    <p>Display size: ${details.mainFeatures ? details.mainFeatures.displaySize : 'Not available'}</p>
    <p>ChipSet: ${details.mainFeatures ? details.mainFeatures.chipSet : 'Not available'}</p>
    <p>Memory: ${details.mainFeatures ? details.mainFeatures.memory : 'Not available'}</p>
    <p>Release date: ${details.releaseDate ? details.releaseDate : 'Not available'}</p>
    <p>Sensors: ${details.mainFeatures.sensors ? details.mainFeatures.sensors : 'Not available'}</p>
    <p>WLAN: ${details.others ? details.others.WLAN : 'Not available'}</p>
    <p>Bluetooth: ${details.others ? details.others.Bluetooth : 'Not available'}</p>
    <p>GPS: ${details.others ? details.others.GPS : 'Not available'}</p>
    <p>NFC: ${details.others ? details.others.NFC : 'Not available'}</p>
    <p>Radio: ${details.others ? details.others.Radio : 'Not available'}</p>
    <p>USB: ${details.others ? details.others.USB : 'Not available'}</p>
    `;
}
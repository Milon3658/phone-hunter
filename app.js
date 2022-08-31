const loadPhones = async (search = 'iphone') => {
    const url = 'https://openapi.programming-hero.com/api/phones?search='+search;
    const res = await fetch(url)
    const data = await res.json();
    displayPhones(data.data);
}
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
              <button id="load-phone-details" onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
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
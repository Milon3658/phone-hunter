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
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.slug}</p>
              <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
}
loadPhones();
document.getElementById('search-btn').addEventListener('click', function(){
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhones(searchValue);
    searchField.value ='';
})
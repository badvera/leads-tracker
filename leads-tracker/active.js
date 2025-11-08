
let myLeads = [];
const inputEl = document.querySelector('.input');
const saveBtn = document.querySelector('.save-btn');
const links = document.querySelector('.links');
const delBtn = document.querySelector('.del-btn');
const tabBtn = document.querySelector('.tab-btn');
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
      myLeads = leadsFromLocalStorage
      render(myLeads);
}

tabBtn.addEventListener('click', () => {

      chrome.tabs.query({
            active: true, currentWindow: true
      }, function (tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem('myLeads', JSON.stringify(myLeads));
            render(myLeads);
      })

})

function render(leads) {

      let listItems = '';
      for (let i = 0; i < leads.length; i++) {
            listItems += `
            <li>
                  <a href='${leads[i]}' target='_blank'> ${leads[i]} 
                  </a>
            </li>`;
      }
      links.innerHTML = listItems;
}

saveBtn.addEventListener('click', () => {
      myLeads.push(inputEl.value);
      inputEl.value = '';
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);

});

delBtn.addEventListener('dblclick', () => {
      myLeads = [];
      localStorage.clear();
      render(myLeads);
})




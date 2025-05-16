let myLeads = [];

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");


const saveLead = () => {
    if (!inputEl.value) {
        return;
    }
    myLeads.push(inputEl.value);
    ulEl.innerHTML += `<li><a href="${inputEl.value}" target="_blank">${inputEl.value}</a></li>`;
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
};

const render = (leads) => {
    const result = leads.map(
        (lead) => `<li><a href="${lead}" target="_blank">${lead}</a></li>`
    ).join("");
    ulEl.innerHTML = result;
};

document.getElementById("input-btn").addEventListener("click", saveLead);
document.getElementById("delete-btn").addEventListener("dblclick", () => {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadFromLocalStorage) {
    myLeads = leadFromLocalStorage;
    render(myLeads);
}

document.getElementById("tab-btn").addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
     myLeads.push(tabs[0].url);
     localStorage.setItem("myLeads", JSON.stringify(myLeads));
     render(myLeads);
    });

});
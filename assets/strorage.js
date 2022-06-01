const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
};

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
        
        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
            // Fungsi pop() di atas merupakan fungsi untuk menghapus nilai index terakhir pada array, 
            //sehingga ukuran array historyData tidak akan pernah lebih dari 5. 
            //Hal ini kita terapkan agar riwayat kalkulasi yang muncul adalah lima hasil kalkulasi terakhir oleh pengguna.
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    } 
}

// Mengembalikan nilai array dari localStorage 
//jika sudah memiliki nilai melalui JSON.parse()
function showHistory() {
    if (checkForStorage) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    historyList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr'); 
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();
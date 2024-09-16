function calcBirthDate(id) {
    let birthDate = new Date()
    birthDate.setDate(Number(id.slice(5, 7)))
    birthDate.setMonth(Number(id.slice(3, 5)) - 1)
    birthDate.setFullYear(Number("20".concat(id.slice(1, 3))));
    return birthDate;
}

function calcAge(date) {
    let birthDate = new Date(date);
    let today = new Date();

    let diffYears = today.getFullYear() - birthDate.getFullYear();
    let diffMonths = today.getMonth() - birthDate.getMonth();
    let diffDays = today.getDate() - birthDate.getDate();

    if (diffDays < 0) {
        let prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        diffDays += prevMonth.getDate();
        diffMonths--;
    }

    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    return { diffYears, diffMonths, diffDays };
}

function getGovernment(id) {
    const governorates = {
        "01": "Cairo",
        "02": "Alexandria",
        "03": "Port Said",
        "04": "Suez",
        "11": "Damietta",
        "12": "Dakahlia",
        "13": "Sharkia",
        "14": "Qalyubia",
        "15": "Kafr El Sheikh",
        "16": "Gharbia",
        "17": "Monufia",
        "18": "Beheira",
        "19": "Ismailia",
        "21": "Giza",
        "22": "Beni Suef",
        "23": "Fayoum",
        "24": "Minya",
        "25": "Asyut",
        "26": "Sohag",
        "27": "Qena",
        "28": "Aswan",
        "29": "Luxor",
        "31": "Red Sea",
        "32": "New Valley",
        "33": "Matrouh",
        "34": "North Sinai",
        "35": "South Sinai",
        "88": "Foreigners"
    };
    return governorates[id.slice(7, 9)] || "Unkown Government";
}

function getGender(id) {
    return id.charAt(12) % 2 === 0 ? "Female" : "Male";
}

document.getElementById("submit").addEventListener("click", function () {
    let id = document.getElementById("inputID").value;
    let result = document.getElementById("result");
    let error = document.getElementById("error");
    let spans = document.querySelectorAll("#result p span:last-child");
    for (const span of spans) {
        span.innerHTML = ""
    }
    // check Errors
    if (id === "" || isNaN(Number(id))) {
        result.style.display = 'none';
        error.style.display = "block";
        error.innerHTML = "Error: Invalid ID!! please try again.";
        return;
    }
    error.style.display = 'none';
    result.style.display = 'block';
    // calc birthDate
    let birthData = calcBirthDate(id);
    spans[0].innerHTML = `${birthData.getDate()} / ${birthData.getMonth() + 1} / ${birthData.getFullYear()}`
    // calc age
    let age = calcAge(birthData);
    spans[1].innerHTML = `${age.diffYears} year(s), ${age.diffMonths} month(s) and ${age.diffDays} day(s)`;
    // set government
    spans[2].innerHTML = getGovernment(id);
    // set gender
    spans[3].innerHTML = getGender(id);
})

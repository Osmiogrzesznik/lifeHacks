// Youtube Roehampton Reference Generator
// paste in devtools console
El = {
    nameOfPersonPostingVideo: document.querySelector("#text > a"),
    yearVideoPosted: document.querySelector("#date > yt-formatted-string"),
    titleOfVideo: document.querySelector("#container > h1 > yt-formatted-string"),

}

tx = {}

Object.keys(El).forEach(x => {
    tx[x] = El[x].textContent;
})

function fullMonth(p_dateStr) {
    fullMonths = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        June: "June",
        July: "July",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Sept: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December"
    }
    dd = p_dateStr.split(" ")
    day = dd[0];
    mth = dd[1];
    month = fullMonths[mth]
    return day + " " + month;
}

let italics = x => "<i>" + x + "</i>";
let brackets = x => `(${x})`;
let capitalize = x => x.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
let getYTcode = x => x.split(['v='])[1].split("&")[0]
let ytbe = x => "https://youtu.be/" + getYTcode(x);

function getCurRndDate(lastMonths) {
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let dateObj = RndDatePastMonth(lastMonths);
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate());
    let year = dateObj.getFullYear();
    let output = day + " " + month + " " + year;
    return output;
}

function RndDatePastMonth(lastMonths) {
    return new Date(Date.now() - 86400 * 1000 * Math.floor(Math.random() * 30 * lastMonths))
}


nameOfPersonPostingVideo = x => x;
yearVideoPosted = x => brackets(x.substr(-4));
titleOfVideo = x => capitalize(x) + ".";
dateUploaded = x => fullMonth(x) + ".";
availableAt = x => {
    ytc = ytbe(document.location.href)
    sa = "Available at: " + ytbe(document.location.href);
    htmla = `<a href='${ytc}'>${ytc}</a>`
    return htmla;
}
accessed = x => brackets("Accessed: " + getCurRndDate(3)) + ".";

outArr = [
    nameOfPersonPostingVideo(tx.nameOfPersonPostingVideo),
    yearVideoPosted(tx.yearVideoPosted),
    titleOfVideo(tx.titleOfVideo),
    dateUploaded(tx.yearVideoPosted),
    availableAt(),
    accessed()
]

out = outArr.join(" ")

d = document.createElement("div")
d.style.zIndex = "9999999"
d.style.position = "fixed"
d.style.left = "0px"
d.style.top = "0px"
d.style.background = "white"
d.style.height = "100px"
d.style.padding = "20px"
d.innerHTML = out;
document.body.append(d)

d.addEventListener('click', function () {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(d);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(d);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
})


/*
Name of person posting video 
(Year video posted) 
Title of Video. 
Date uploaded (if available).
Available at: 
URL (Accessed: dd Month yyyy).
*/

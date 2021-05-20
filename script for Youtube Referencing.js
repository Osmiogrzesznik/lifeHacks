// Youtube Roehampton Reference Generator
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

const italics = x => "<i>" + x + "</i>";
const brackets = x => `(${x})`;
const capitalize = x => x.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
const getYTcode = x => x.split(['v='])[1].split("&")[0]
const ytbe = x => "https://youtu.be/" + getYTcode(x);

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
availableAt = x => "Available at: " + ytbe(document.location.href);
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
/*
Name of person posting video 
(Year video posted) 
Title of Video. 
Date uploaded (if available).
Available at: 
URL (Accessed: dd Month yyyy).
*/
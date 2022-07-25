
//cards
let card = select('.cards').innerHTML; //storing cards in variable

select('.cards').innerHTML = ''; //clearing cards container

//adding three cards to card container
select('.cards').innerHTML += card.replace('{{chartLine}}', 'chartLineone');
select('.cards').innerHTML += card.replace('{{chartLine}}', 'chartLinetwo');
select('.cards').innerHTML += card.replace('{{chartLine}}', 'chartLinethree');


const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
    labels: labels,
    datasets: [
    {
        label: "My First dataset",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 10, 5, 2, 20, 30, 45],
    },
    ],
};

const configLineChart = {
    type: "line",
    data,
    options: {},
};

var chartLine = new Chart(
    document.getElementById("chartLineone"),
    configLineChart
);

var chartLinetwo = new Chart(
    document.getElementById("chartLinetwo"),
    configLineChart
);

var chartLinethree = new Chart(
    document.getElementById("chartLinethree"),
    configLineChart
);

//barchart

const labelsBarChart = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
];
const dataBarChart = {
    labels: labelsBarChart,
    datasets: [
    {
        label: "My First dataset",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 10, 5, 2, 20, 30, 45],
    },
    ],
};

const configBarChart = {
    type: "bar",
    data: dataBarChart,
    options: {},
};

var chartBar = new Chart(
    document.getElementById("chartBar"),
    configBarChart
);
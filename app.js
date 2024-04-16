
const cityInput = document.querySelector('.enterCity');
const myForm = document.querySelector('#myform');
const apiKey = 'df6e716f5f174930b3191204240204';
const errorDis = document.querySelector('.err')
const container = document.querySelector('.container')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log('hello')
    const city = getCity()
    handleRecivingData(city)


})

function getCity() {
    const cityValue = cityInput.value.trim()

    if (cityValue == '') {
        cityInput.setAttribute('placeholder', 'please insert a valid city')
        return;
    }
    return cityValue;


}

async function handleRecivingData(city) {
    try {
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        const response = await fetch(apiUrl);

        if (!response.ok) {


            container.textContent = 'could not find city'
        }

        const data = await response.json()
        console.log(data);
        displayData(data)
        return data;



    } catch (error) {
        console.error('Error fetching data:', error)

    }



}

function displayData(data) {
    container.textContent = ''

    const { location: { name }, current } = data
    const { temp_c, humidity, condition: { text, icon } } = current;


    const cityName = document.createElement('h1')
    cityName.classList.add('cityDs');
    cityName.textContent = name;

    const humidityDS = document.createElement('p')
    humidityDS.classList.add('humDis');
    humidityDS.textContent = `Humidity ${humidity}%`;

    const tempDS = document.createElement('p')
    tempDS.classList.add('tempDs');
    tempDS.textContent = `Temp ${temp_c} \u00B0`;


    const descDS = document.createElement('p')
    descDS.classList.add('descDs');
    descDS.textContent = text;



    const emojiDS = document.createElement('div')
    emojiDS.classList.add('emoji');
    emojiDS.innerHTML = icon

    container.append(cityName, humidityDS, tempDS, descDS)



}
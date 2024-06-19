import { useState } from 'react'

export const WeatherApp = () => {

    let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    let API_KEY = '29ec8257d758ea669241db7aab6c8701'
    let celcius = 273.15

    const [city, setCity] = useState('')
    const [dataClime, setDataClime] = useState(null)

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (city.length > 0) fetchClime()
    }


    const fetchClime = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}`)
            const data = await response.json()
            setDataClime(data)
        } catch (error) {
            console.error('Ocurrio un problema: ', error)
        }
    }


    return (
        <div className='container'>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={city}
                    onChange={handleChangeCity}
                />
                <button type='submit'>Search</button>
            </form>
            {
                dataClime && (
                    <div className='clime'>
                        <h2>{dataClime.name}</h2>
                        <p>Temperature: {parseInt(dataClime?.main?.temp - celcius)}°C</p>
                        <p>Weather: {dataClime.weather[0].description}</p>
                        <img src={`https://openweathermap.org/img/wn/${dataClime.weather[0].icon}@2x.png`}/>
                    </div>
                )
            }
        </div>

    )
}

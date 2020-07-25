import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card';

const api_key = process.env.REACT_APP_WEATHER_API;
// console.log(' ===my Key ==== ', process.env.REACT_APP_WEATHER_API)

const weatherURL=`api.openweathermap.org/data/2.5/forecast?zip=10025,&appid=${api_key}`

export default class Weather extends Component {
    state = {
        fullData : [],
        dailyData : []
    }

    componentDidMount = () =>{
        axios.get(weatherURL)
        .then (data => {
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            this.setState({
                fullData: data.list,
                dailyData: dailyData
            } ) 
        })
        .catch(err => console.error(err.message));
    }

formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
      }

    render() {

        

        return (
            <div className="container">
            <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
            <h5 className="display-5 text-muted">New York, US</h5>
              <div className="row justify-content-center">
      
                {this.formatDayCards()}
      
              </div>
            </div>
        )
    }
}

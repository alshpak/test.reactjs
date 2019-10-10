import React from 'react';

class Freez extends React.Component {
    constructor(props) {
        super(props)
        console.log("Init freez")
        this.delayCheck = 100
        this.delaySkip = 50
        this.state = { date: new Date(), events: props.events }
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), this.delayCheck)
    }
    componentWillUnmount() {
        clearInterval(this.timeID)
    }
    tick() {
        this.setState((state, props) => {
            let prev = state.date
            let now = new Date()
            let events = state.events.slice()
            let duration = now.getTime() - prev.getTime()
            if (duration >= this.delayCheck + this.delaySkip) {
                events.push({
                    date: prev,
                    duration: duration,
                    key: events.length
                })
            }
            return {
                date: now,
                events: events
            }
        })
    }
    componentWillReceiveProps(nextProps) {
      this.setState(
        { date: new Date(), events: nextProps.events }
      );
    }
    render() {
        return (
            <div>
                <h1>Measurements</h1>
                {this.state.events.map(event =>
                    <div key={"freez_item" + event.key}>{event.date.toLocaleTimeString()} - {event.duration}</div>
                )}
            </div>
        )
    }
}

export default Freez

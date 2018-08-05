import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
    top: {
        marginTop: '20px'
    },
    textField: {
        margin: '10px',
        width: '300px'
    }
}

class AddEventPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {
                eventName: '',
                description: '',
                latne: '',
                latsw: '',
                lonne: '',
                lonsw: '',
            }   
        }
    }

    saveNewEvent() {
        console.log(this.state.event)
    }

    handleChange = eventName => event => {
        let newEvent = Object.assign({}, this.state.event);
        newEvent[eventName] = event.target.value;
        this.setState({event: newEvent});
    };

    render() {
        return (
            <div>
                <form noValidate autoComplete="off" style={styles.top}>
                    <TextField id="eventName" label="Event Name" value={this.state.event.eventName}
                        onChange={this.handleChange('eventName')} style={styles.textField}/>

                    <TextField id="description" label="Description" value={this.state.event.description}
                    onChange={this.handleChange('description')} style={styles.textField}/>

                    <TextField id="latne" label="Lat NE" value={this.state.event.latne}
                    onChange={this.handleChange('latne')} type="number" style={styles.textField}/>

                    <TextField id="lonne" label="Lon NE" value={this.state.event.lonne}
                    onChange={this.handleChange('lonne')} type="number" style={styles.textField}/>

                    <TextField id="latse" label="Lat SW" value={this.state.event.latsw}
                    onChange={this.handleChange('latse')} type="number" style={styles.textField}/>

                    <TextField id="lonse" label="Lon SW" value={this.state.event.lonsw}
                    onChange={this.handleChange('lonse')} type="number" style={styles.textField}/>
                </form>
                <Button variant="contained" type="submit" color="primary" onClick={() => {this.saveNewEvent()}} >
                    Submit
                </Button>
            </div>
        )
    }
}

export default AddEventPage;
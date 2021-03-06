import React, { Component } from 'react';

import Card from '@material-ui/core/Card';

const styles = {
  card: {
    margin: '30px',
    maxWidth: '450px',
    borderRadius: '30px',
    minHeight: '300px',
    backgroundPosition: 'center',
    position: 'relative'
  },
  title: {
    textAlign: 'left',
    margin: '26px',
    color: 'white',
    textDecoration: 'none'
  },
  description: {
    textAlign: 'left',
    position: 'absolute',
    bottom: 0,
    color: 'white',
    width: '90%',
    margin: '25px',
    textDecoration: 'none'
  },
  outsideLands: {
    backgroundImage: 'url(' + require('../assets/OutsideLands.png') + ')',
    backgroundSize: '460px'
  },
  coachella: {
    backgroundImage: 'url(' + require('../assets/OutsideLands.png') + ')',
    backgroundSize: '500px'
  },  
  outsideHacks: {
    backgroundImage: 'url(' + require('../assets/twitch.png') + ')',
    backgroundSize: '500px'
  }
};

class EventCard extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    console.log(props.eventData);
  }

  formatName(string) {
    var spacedString = string.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    return spacedString.charAt(0).toUpperCase() + spacedString.slice(1);
  }

  render() {
    return (
        <div>
          <Card style = {{...styles.card,...styles[this.props.eventData.name]}} elevation={ 4 }>
            <div>
              <h3 style = { styles.title }>
                { this.formatName(this.props.eventData.name) }
              </h3>
              <p style = { styles.description } >
                { this.props.eventData.data.description }
              </p>
            </div>
          </Card>
        </div>
    );
  }
}

export default EventCard;

import React, { Component } from 'react';
import Map from '../components/Map';

class map extends Component {
    
    render() {
        return (
            <div >
                <Map cords={{lat: 55.6760, lon:12.568}}></Map>
            </div>
        );
    }
}

export default map;
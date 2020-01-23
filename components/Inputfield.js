import React, { Component } from 'react';
import { transports } from "./Map";


class Inputfield extends Component {
    createFields() {
        let fields = [];

        for (const input in this.props.inputs) {
            fields.push( 
                <div key={input} className="form-group">

                <label htmlFor={input}>
                    {input}
                </label>
                    <input className="form-control" type={this.props.inputs[input].type} placeholder={input} onChange={this.props.onChange} name={input} value={this.props.inputs[input].value}></input>
                </div>
                )
       }

       return fields;
    }

    render() {
        return (
            <div className="col-5 col-lg-2" id="form">
              {this.createFields()}   
              <div  className="form-group">
              <label htmlFor="Transport">transport</label>
              <select value={this.props.transportSelect} className="form-control" onChange={this.props.selectOnChange}>
                        {
                            transports.map(obj => {
                            return <option key={obj.label} value={obj.value}>{obj.label}</option>
                            })
                        }
                    </select>
              </div>
              <button type="button" className="btn btn-primary" onClick={this.props.onClick}>Søg</button>
              <style jsx>{`
             #form { 
                z-index: 2;
                padding: 1rem;
                margin-top:100px;
                background-color: rgba(255,255,255,.6);
             }
            `}</style>     
            </div>
        );
    }
}

export default Inputfield;
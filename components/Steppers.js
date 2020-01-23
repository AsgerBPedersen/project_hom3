import React, { Component } from "react";
import { transports } from "./Map";
import Head from "next/head";

class Steppers extends Component {
  state = {
    open: true,
    stepper: null
  };

  click = () => {
    this.setState({
      open: false
    });
  };

  componentDidMount = () => {
    this.stepper = new Stepper(document.querySelector(".bs-stepper"));
  };

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { adresse, rejsetid, ankomst } = this.props.inputs;
    const { stepper } = this.state;
    return (
      <div className="stepper">
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bs-stepper/dist/css/bs-stepper.min.css"
          ></link>
        </Head>
        <button className="btn btn-danger m-2" onClick={this.click}>
          Luk
        </button>

        <div className="mb-5 p-4 bg-white shadow-sm">
          <h3>Linear stepper</h3>
          <div id="stepper1" className="bs-stepper linear">
            <div className="bs-stepper-header" role="tablist">
              <div className="step active" data-target="#test-l-1">
                <button
                  type="button"
                  className="step-trigger"
                  role="tab"
                  id="stepper1trigger1"
                  aria-controls="test-l-1"
                  aria-selected="true"
                >
                  <span className="bs-stepper-circle">1</span>
                  <span className="bs-stepper-label">Email</span>
                </button>
              </div>
              <div className="bs-stepper-line"></div>
              <div className="step" data-target="#test-l-2">
                <button
                  type="button"
                  className="step-trigger"
                  role="tab"
                  id="stepper1trigger2"
                  aria-controls="test-l-2"
                  aria-selected="false"
                  disabled="disabled"
                >
                  <span className="bs-stepper-circle">2</span>
                  <span className="bs-stepper-label">Password</span>
                </button>
              </div>
              <div className="bs-stepper-line"></div>
              <div className="step" data-target="#test-l-3">
                <button
                  type="button"
                  className="step-trigger"
                  role="tab"
                  id="stepper1trigger3"
                  aria-controls="test-l-3"
                  aria-selected="false"
                  disabled="disabled"
                >
                  <span className="bs-stepper-circle">3</span>
                  <span className="bs-stepper-label">Validate</span>
                </button>
              </div>
            </div>
            <div className="bs-stepper-content">
              <form onSubmit={this.onSubmit}>
                <div
                  id="test-l-1"
                  role="tabpanel"
                  className="bs-stepper-pane active dstepper-block"
                  aria-labelledby="stepper1trigger1"
                >
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                    ></input>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.stepper.next()}
                  >
                    Next
                  </button>
                </div>
                <div
                  id="test-l-2"
                  role="tabpanel"
                  className="bs-stepper-pane"
                  aria-labelledby="stepper1trigger2"
                >
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    ></input>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.stepper.previous()}
                  >
                    Previous
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => this.stepper.next()}
                  >
                    Next
                  </button>
                </div>
                <div
                  id="test-l-3"
                  role="tabpanel"
                  className="bs-stepper-pane text-center"
                  aria-labelledby="stepper1trigger3"
                >
                  <button
                    className="btn btn-primary mt-5"
                    onClick={() => this.stepper.previous()}
                  >
                    Previous
                  </button>
                  <button type="submit" className="btn btn-primary mt-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bs-stepper/dist/js/bs-stepper.min.js"></script>

        {/* <div className="step col m-3 p-4 p-4 ">
                    <h2 className="display-4">Find boliger indenfor en bestemt rejsetid!</h2>
                    <p>Med denne app kan du finde boliger som ligger indenfor en hvis rejsetid, med det transportmiddel du vælger.</p>
                    <p>Find f.eks. boliger nær din arbejdsplads, eller tæt på din familie.</p>
                </div>
                <div className="step col m-3 p-4 d-flex flex-column">
                    <h3 className="m-4">Hvor vil du hen?</h3>
                    <div className="form-group d-flex flex-column">
                    
                        <label >
                        Adresse
                        </label>
                        <input className="form-control" type={adresse.type} placeholder="adresse" onChange={this.props.onChange} name="adresse" value={adresse.value}></input>
                        <h3 className="m-4">Hvornår vil du ankomme?</h3>
                    <div className="form-group d-flex flex-column">
                    
                        <label >
                        Ankomst
                        </label>
                        <input className="form-control" type={ankomst.type} placeholder="ankomst" onChange={this.props.onChange} name="ankomst" value={ankomst.value}></input>

                </div>
                </div>
                </div>
               
                <div className="step col m-3 p-4  d-flex flex-column">
                <h3 className="m-4">Hvad lang rejsetid?</h3>
                    <div className="form-group d-flex flex-column">
                    
                        <label >
                        Rejsetid
                        </label>
                        <input className="form-control" type={rejsetid.type} placeholder="Rejsetid" onChange={this.props.onChange} name="Rejsetid" value={rejsetid.value}></input>

                </div>
                    <h3 className="m-4">Hvilket transportmiddel vil bruge?</h3>
                    <label></label>
                    <select className="form-control">
                        {
                            transports.map(obj => {
                            return <option value={obj.value}>{obj.label}</option>
                            })
                        }
                    </select>
                </div> */}

        <style jsx>{`
          .test123 {
            background-color: rgba(255, 255, 255);
            height: 100%;
            width: 100%;
          }
          .stepper {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            height: 100%;
            width: 100%;
            ${this.state.open ? "z-index: 5;" : "z-index-0"}
            background-color: rgba(0,0,0,.6);
          }
          .step {
            background-color: rgba(255, 255, 255);
          }
        `}</style>
      </div>
    );
  }
}

export default Steppers;

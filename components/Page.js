import React, { Component } from 'react';
import Header from './Header';
import Head from 'next/head'
class Page extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                </Head>
                {/* <Header></Header> */}
                {this.props.children}
            </div>
        );
    }
}

export default Page;
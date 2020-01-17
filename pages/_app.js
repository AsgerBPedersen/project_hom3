import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from '@apollo/react-hooks';
import Page from '../components/Page'
import withApollo from '../lib/withApollo';
class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps, apollo } = this.props
    return (
        <Container>
          <ApolloProvider client={apollo}>
            <Page>
                <Component></Component>
            </Page>
          </ApolloProvider>
        </Container>
    )
  }
}

export default withApollo(MyApp)
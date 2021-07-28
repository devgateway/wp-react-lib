import React from 'react'
import {AppContext} from "./Context"

const LocalizedProvider = (CustomProvider) => (props) => (
  <AppContext.Consumer>
    {({locale}) => <CustomProvider locale={locale} {...props} />}
  </AppContext.Consumer>)

export default LocalizedProvider

import React from 'react'
import {AppContext} from "./Context"

const LocalizedProvider = (CustomProvider) => (props) => (
  <AppContext.Consumer>
    {(data) => <CustomProvider locale={data?.locale} {...props} />}
  </AppContext.Consumer>)

export default LocalizedProvider

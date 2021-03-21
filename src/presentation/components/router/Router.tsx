import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

type RouterProps = {
    makeLogin: () => JSX.Element
    makeSignup: () => JSX.Element
}

const Router = ({ makeLogin, makeSignup }: RouterProps): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login'>{makeLogin()}</Route>
                <Route path='/signup'>{makeSignup()}</Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router

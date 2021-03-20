import { Signup } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

type RouterProps = {
    makeLogin: () => JSX.Element
}

const Router = ({ makeLogin }: RouterProps): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login'>{makeLogin()}</Route>
                <Route path='/signup'>
                    <Signup />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router

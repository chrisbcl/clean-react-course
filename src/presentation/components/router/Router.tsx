import { Login } from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const Router = (): JSX.Element => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router

import { createBrowserRouter } from 'react-router-dom';

import { Home } from './home'
import { Detail } from './detail';
import { NotFound } from './notfound';

import { Layout } from '../components/layout'; 

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/detail/:cripto',
                element: <Detail/>
            },
            {
                path: '*',
                element: <NotFound/>
            }
        ]
    }
])


export { router };
import { render } from 'preact'
import { App } from './app.jsx'
import './index.css'

console.log('Hello from main.jsx')

render(<App />, document.getElementById('app'))

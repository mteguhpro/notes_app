import { BrowserRouter } from 'react-router-dom'
import ContentRoute from './container/root/ContentRoute'
import NavRoute from './container/root/NavRoute'

function App() {

  return (
    <BrowserRouter>
      <NavRoute/>
      <ContentRoute/>
    </BrowserRouter>
  )
}

export default App

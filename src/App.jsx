import Heading from './components/Heading'
import Contracts from './components/Contracts'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <div>
      <Heading title="Contract Management" />
      <Contracts />
      <Toaster />
    </div>
  )
}

export default App

import './App.css'
import Header from './components/Header'
import SearchSection from './components/SearchSection'


function App() {
  return (
    <div className="app">
      <Header />
      <SearchSection />
      
      <main>
        <h2>Welcome to Assemblé</h2>
        <p>Create your own virtual exhibition from museum collections</p>
      </main>
    </div>
  )
}

export default App

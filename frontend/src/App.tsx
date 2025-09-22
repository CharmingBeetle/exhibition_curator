import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'



function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      
      <main>
        <h2>Welcome to Assemblé</h2>
        <p>Create your own virtual exhibition from museum collections</p>
      </main>
    </div>
  )
}

export default App

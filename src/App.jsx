import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import Card from "./components/card"
import { users } from "./assets/users"
import { ExtendedCard } from './components/cardExtended'

export default function App() {
    const [input, setInput] = useState('');

    const userData = users.filter(user => user.fullName.toLowerCase().includes(input.toLowerCase()));

    // For debugging purposes
    console.log(userData)
    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <div className="main">
                        <div>
                            <input type="text" placeholder='Search for user...' onChange={(e) => setInput(e.target.value)} value={input} />
                        </div>
                        <div>
                            {
                                userData.map(item => <Card key={item.fullName} {...item} />)
                            }
                            {
                                <p>User not found</p>
                            }
                        </div>
                    </div>
                } />
                <Route path='/user/:id' element={<ExtendedCard users={users} />} />
            </Routes>
        </Router>
    )
}
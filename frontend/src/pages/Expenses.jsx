import { useState, useEffect } from 'react'
import api from "../api"
import { ToggleScreenMode } from "../components/ToggleScreenMode"
import { LogoutButton } from "../components/LogoutButton"
import { useNavigate } from "react-router-dom"

const Expenses = () => {
    const [expenses, setExpenses] = useState([])
    const [newAmount, setNewAmount] = useState("")
    const [newContent, setNewContent] = useState("")
    const navigate = useNavigate()

    // useEffect(() => {
    //     getExpenses()
    // }, [])

    const getExpenses = () => {
        api
            .get("/api/expenses/")
            .then((res) => res.data)
            .then((data) => {
                setExpenses(data)
            })
            .catch((err) => alert(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        api
            .post("/api/expenses/", { amount: newAmount, content: newContent })
            .then((res) => {
                if (res.status === 201) alert("Expense created")
                else alert("Failed to create expense")
                getExpenses()
                setNewAmount("")
                setNewContent("")
            })
            .catch((err) => alert(err))
    }

    console.log(expenses)

    return (
        <div className="max-w-screen-xl mx-auto py-5 px-5">
            <section className="max-w-screen-xl flex flex-row justify-end gap-5">
                <button className='border border-yellow-300 bg-yellow-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300' onClick={() => navigate("/")}>
                    Add note
                </button>
                <ToggleScreenMode />
                <LogoutButton />
            </section>
            <div className="flex flex-col justify-between items-center my-5">
                <h2 className="text-3xl">Expenses</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="max-w-screen-sm mx-auto flex flex-col gap-3"
            >
                <label htmlFor="amount">Amount:</label>
                <input
                    className="py-2 px-2 border border-indigo-300 bg-indigo-100 rounded-md dark:text-gray-800"
                    type="text"
                    id="amount"
                    name="amount"
                    required
                    onChange={(e) => setNewAmount(e.target.value)}
                    value={newAmount}
                />

                <label htmlFor="content">Content:</label>
                <textarea
                    className="py-2 px-2 border border-indigo-300 bg-indigo-100 rounded-md dark:text-gray-800"
                    id="content"
                    name="content"
                    required
                    onChange={(e) => setNewContent(e.target.value)}
                    value={newContent}
                />

                <input
                    className="border border-indigo-300 bg-indigo-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300"
                    type="submit"
                    value="Submit"
                />
            </form>
        </div>
    )
}


export default Expenses
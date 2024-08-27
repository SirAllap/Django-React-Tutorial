import { useEffect } from 'react'

export const ToggleScreenMode = () => {
    const handleToggleMode = () => {
        console.log("clicked")
        const currentTheme = localStorage.getItem("theme")

        if (currentTheme === "dark") {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
        }
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light"
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [])

    return (
        <button className='border border-indigo-300 bg-indigo-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300' onClick={handleToggleMode}>
            Change Mode (Dark/Light)
        </button>
    )
}

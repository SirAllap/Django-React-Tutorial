/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import api from '../api'
import { ToggleScreenMode } from '../components/ToggleScreenMode'
import { LogoutButton } from '../components/LogoutButton'

const Home = () => {
	const [notes, setNotes] = useState([])
	const [editId, setEditId] = useState(null)
	const [editedTitle, setEditedTitle] = useState('')
	const [editedContent, setEditedContent] = useState('')
	const [newTitle, setNewTitle] = useState('')
	const [newContent, setNewContent] = useState('')

	useEffect(() => {
		getNotes()
	}, [])

	const getNotes = () => {
		api.get('/api/notes/')
			.then((res) => res.data)
			.then((data) => {
				setNotes(data)
			})
			.catch((err) => alert(err))
	}

	const deleteNote = (id) => {
		api.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert('Note deleted')
				else alert('Failed to delete note')
				getNotes()
			})
			.catch((err) => alert(err))
	}

	const createNote = (e) => {
		e.preventDefault()
		api.post('/api/notes/', { content: newContent, title: newTitle })
			.then((res) => {
				if (res.status === 201) alert('Note created')
				else alert('Failed to make note')
				getNotes()
				setNewTitle('')
				setNewContent('')
			})
			.catch((err) => alert(err))
	}

	const startEditNote = (note) => {
		setEditId(note.id)
		setEditedTitle(note.title)
		setEditedContent(note.content)
	}

	const applyEditNote = (id) => {
		api.put(`/api/notes/update/${id}/`, { title: editedTitle, content: editedContent })
			.then((res) => {
				if (res.status === 200) alert('Note updated')
				else alert('Failed to update note')
				getNotes()
				setEditId(null)
			})
			.catch((err) => alert(err))
	}

	const cancelEdit = () => {
		setEditId(null)
	}

	return (
		<div className='max-w-screen-xl mx-auto py-5 px-5'>
			<section className='max-w-screen-xl flex flex-row justify-end gap-5'>
				<ToggleScreenMode />
				<LogoutButton />
			</section>
			<section>
				<div className='flex flex-col justify-between items-center my-5'>
					<h2 className='text-3xl'>Notes</h2>
					<h2 className='text-xl'>Create a Note</h2>
				</div>
				<form onSubmit={createNote} className='max-w-screen-sm mx-auto flex flex-col gap-3'>
					<label htmlFor='title'>Title:</label>
					<input
						className='py-2 px-2 border border-indigo-300 bg-indigo-100 rounded-md dark:text-gray-800'
						type='text'
						id='title'
						name='title'
						required
						onChange={(e) => setNewTitle(e.target.value)}
						value={newTitle}
					/>

					<label htmlFor='content'>Content:</label>
					<textarea
						className='py-2 px-2 border border-indigo-300 bg-indigo-100 rounded-md dark:text-gray-800'
						id='content'
						name='content'
						required
						onChange={(e) => setNewContent(e.target.value)}
						value={newContent}
					/>

					<input className='border border-indigo-300 bg-indigo-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300' type='submit' value='Submit' />
				</form>
				<hr className='my-5' />
				<div className='flex flex-col gap-10 max-w-screen-sm mx-auto'>
					{notes.map((note) => (
						<div key={note.id} className='border-2 border-dotted border-indigo-400 rounded-lg py-5 px-3 flex flex-col gap-5'>
							<section className="max-w-xl mx-auto flex flex-col gap-2">
								<section className='flex flex-row align-middle justify-between'>
									<h3 className='text-xl font-bold'>Title:</h3>
									{editId !== note.id ? (
										<span className='py-1 px-2 font-normal w-full capitalize-first'>{note.title}</span>
									) : (
										<input
											className='ml-2 py-1 px-2 w-full border border-indigo-300/40 bg-transparent rounded-md'
											type='text'
											id='title'
											name='title'
											required
											onChange={(e) => setEditedTitle(e.target.value)}
											value={editedTitle}
										/>
									)}
								</section>
								<section className='flex flex-row align-middle justify-between'>
									<p className='text-xl font-bold'>Content:</p>
									{editId !== note.id ? (
										<span className="py-1 px-2 font-normal w-full capitalize-first">{note.content}</span>
									) : (
										<textarea
											className='ml-2 py-1 px-2 w-full border border-indigo-300/40 bg-transparent rounded-md'
											id='content'
											name='content'
											required
											onChange={(e) => setEditedContent(e.target.value)}
											value={editedContent}
										/>
									)}
								</section>
							</section>
							<section className='w-full flex align-middle justify-end gap-2'>
								{editId !== note.id ? (
									<>
										<button className='border border-indigo-300 bg-indigo-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300' onClick={() => startEditNote(note)}>Edit</button>
										<button className='border border-red-300 bg-red-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-red-500 transition-all duration-300' onClick={() => deleteNote(note.id)}>Delete</button>
									</>
								) : (
									<>
										<button className='border border-green-300 bg-green-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-green-500 transition-all duration-300' onClick={() => applyEditNote(note.id)}>Apply</button>
										<button className='border border-yellow-300 bg-yellow-500 py-2 px-5 min-w-20 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300' onClick={cancelEdit}>Cancel</button>
									</>
								)}
							</section>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}

export default Home

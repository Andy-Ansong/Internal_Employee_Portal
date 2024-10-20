import React, { FormEvent, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './styles.css'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'

interface Event {
  _id?: string
  title: string
  date: Date
  description: string
  isPublicHoliday: boolean
  isPrivate: boolean
  createdBy: { userId?: string, email: string }
  receivers: Array<string>
}

const Events: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [newEventTitle, setNewEventTitle] = useState<string>('')
  const [newEventDescription, setNewEventDescription] = useState<string>('')
  const [newEventPublicHoliday, setNewEventPublicHoliday] = useState<boolean>(false)
  const [newEventPrivate, setNewEventPrivate] = useState<boolean>(false)
  const [newEventReceivers, setNewEventReceivers] = useState<string>('')
  const navigate = useNavigate()

  // Editing state for events
  const [editingEventId, setEditingEventId] = useState<string|null>(null)
  const [editingEventTitle, setEditingEventTitle] = useState<string>('')
  const [editingEventDescription, setEditingEventDescription] = useState<string>('')
  const [editingEventReceivers, setEditingEventReceivers] = useState<string>('')
  const [editingEventPublicHoliday, setEditingEventPublicHoliday] = useState<boolean>(false)
  const [editingEventPrivate, setEditingEventPrivate] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleDayClick = (date: Date) => {
    setSelectedDate(date)
  }

  const handleAddEvent = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (!selectedDate || !newEventTitle.trim() || !selectedDate){
      setError("Please fill in data")
      setIsLoading(false)
      return
    }
    const newEvent: Event = {
      title: newEventTitle,
      date: selectedDate,
      description: newEventDescription,
      isPublicHoliday: newEventPublicHoliday,
      isPrivate: newEventPrivate,
      createdBy: { email: "" },
      receivers: newEventReceivers ? newEventReceivers.split(',').map((receiver) => receiver.trim()) : []
    }

    axios.post("http://localhost:3030/api/v1/events", newEvent, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(res => {
      setEvents([...events, res.data.event])
      setNewEventTitle('')
      setNewEventDescription('')
      setNewEventPublicHoliday(false)
      setNewEventPrivate(false)
      setNewEventReceivers('')
      setIsLoading(false)
    }).catch(err => {
      if(err.status === 401)
        navigate('/auth')
      setError(err.response?.data?.message || "Failed to add event")
      setIsLoading(false)
    })
  }

  const handleEditEvent = (id: string) => {
    const eventToEdit = events.find(event => event._id === id)
    if (!eventToEdit) return
  
    setEditingEventId(id)
    setEditingEventTitle(eventToEdit.title)
    setEditingEventDescription(eventToEdit.description)
    setEditingEventReceivers(eventToEdit.receivers.join(', '))
    setEditingEventPublicHoliday(eventToEdit.isPublicHoliday)
    setEditingEventPrivate(eventToEdit.isPrivate)
  }

  const handleSaveEdit = () => {
    if (!editingEventId) return
  
    const updatedEvent = {
      title: editingEventTitle,
      description: editingEventDescription,
      receivers: editingEventReceivers.split(',').map(receiver => receiver.trim()),
      isPublicHoliday: editingEventPublicHoliday,
      isPrivate: editingEventPrivate,
    }
    axios.patch(`http://localhost:3030/api/v1/events/${editingEventId}`, updatedEvent, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then(res => {
      const updatedEventData = res.data.event
      setEvents(prevEvents => {
        return prevEvents.map(event =>
          event._id === editingEventId ? updatedEventData : event
        )
      })
      resetEditingState()
      console.log("Event updated successfully:", updatedEventData)
    })
    .catch(err => {
      console.error("Error updating event:", err)
    })
  }
  
  const resetEditingState = () => {
    setEditingEventId(null)
    setEditingEventTitle('')
    setEditingEventDescription('')
    setEditingEventReceivers('')
    setEditingEventPublicHoliday(false)
    setEditingEventPrivate(false)
  }

  useEffect(() => {
    axios.get("http://localhost:3030/api/v1/events", {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }).then((res: AxiosResponse) => {
      console.log(res)
      setEvents(res.data.events)
    }).catch(err => {
        if(err.status === 401)
            navigate('/auth')
        setError(err.response.data.message)
    })
  }, [navigate])

  const handleDeleteEvent = (id: string) => {
    axios.delete(`http://localhost:3030/api/v1/events/${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }).then(() => {
      setEvents(events.filter(event => event._id != id))
    }).catch(err => {
      if(err.status === 401)
        navigate('/auth')
      setError(err.response.data.message)
    })
  }

  // Filter events by selected date
  const eventsForSelectedDate = events.filter((event) => {
    if (!selectedDate) return false
    const eventDate = new Date(event.date)
    return eventDate.toDateString() === selectedDate.toDateString()
  })

  // Custom tile content to highlight dates with events
  const tileContent = ({ date }: { date: Date }) => {
    const hasEvent = events.some(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
    return hasEvent ? <div className="event-indicator"></div> : null
  }

  return (
    <div className="events">
      <h1>Events</h1>
      <div className="events-container">
        <div className="events-left">
          <div className="calendar">
            <h2>Calendar</h2>
            <Calendar value={selectedDate} onClickDay={handleDayClick} tileContent={tileContent} />
          </div>
          <div className="add-event">
            <h2>Add Event</h2>
            <form onSubmit={handleAddEvent}>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                placeholder="Event Title"
              />
              <textarea
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                placeholder="Event Description"
              />
              <input
                type="text"
                value={newEventReceivers}
                onChange={(e) => setNewEventReceivers(e.target.value)}
                placeholder="Receivers (comma-separated)"
              />
              <div className='label-container'>
                <label>Public Holiday</label>
                <input
                  type="checkbox"
                  checked={newEventPublicHoliday}
                  onChange={(e) => setNewEventPublicHoliday(e.target.checked)}
                />
              </div>
              <div className='label-container'>
                <label>Private Event</label>
                <input
                  type="checkbox"
                  checked={newEventPrivate}
                  onChange={(e) => setNewEventPrivate(e.target.checked)}
                />
              </div>
              <span className='events-error'>{error}</span>
              <button type='submit'>
                {
                  isLoading?
                  <div className='button-loader'></div>
                  :<>Add Event</>
                }
              </button>
            </form>
          </div>
        </div>
        <div className="event-list">
          <h2>Events on {selectedDate?.toDateString()}</h2>
          {eventsForSelectedDate.length > 0 ? (
            <ul>
              {eventsForSelectedDate.map((event, index) => (
                <li key={index}>
                  {editingEventId === event._id ? (
                    <div className='editing-event'>
                      <h4>Title</h4>
                      <input
                        type="text"
                        value={editingEventTitle}
                        onChange={(e) => setEditingEventTitle(e.target.value)}
                        placeholder="Edit Title"
                      />
                      <h4>Description</h4>
                      <textarea
                        value={editingEventDescription}
                        onChange={(e) => setEditingEventDescription(e.target.value)}
                        placeholder="Edit Description"
                      />
                      <h4>Receivers</h4>
                      <input
                        type="text"
                        value={editingEventReceivers}
                        onChange={(e) => setEditingEventReceivers(e.target.value)}
                        placeholder="Edit Receivers"
                      />
                      <div className="label-container">
                        <label>Public Holiday</label>
                        <input
                          type="checkbox"
                          checked={editingEventPublicHoliday}
                          onChange={(e) => setEditingEventPublicHoliday(e.target.checked)}
                        />
                      </div>
                      <div className="label-container">
                        <label>Private Event</label>
                        <input
                          type="checkbox"
                          checked={editingEventPrivate}
                          onChange={(e) => setEditingEventPrivate(e.target.checked)}
                        />
                      </div>
                      <div className="events-button">
                        <button className="save" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button className="delete" onClick={() => setEditingEventId(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p><span>Title:</span> {event.title}</p>
                        <p><span>Description:</span> {event.description}</p>
                        <p><span>Created By:</span> {event.createdBy.email}</p>
                        <p><span>Receivers:</span> {event.receivers.join(', ')}</p>
                        <p><span>Public Holiday:</span> {event.isPublicHoliday ? 'Yes' : 'No'}</p>
                        <p><span>Private:</span> {event.isPrivate ? 'Yes' : 'No'}</p>
                      </div>
                      <div className="events-button">
                        <button className="edit" onClick={() => handleEditEvent(event._id!)}>
                          Edit
                        </button>
                        <button className="delete" onClick={() => handleDeleteEvent(event._id!)}>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Events


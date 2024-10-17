import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './styles.css'; // Import custom styles

interface Event {
    date: Date;
    title: string;
}

const Events: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<string>('');
    const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);
    const [editingEventTitle, setEditingEventTitle] = useState<string>('');

    // Handle day click from the calendar
    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
    };

    // Add a new event
    const handleAddEvent = () => {
        if (!newEvent.trim() || !selectedDate) return;

        setEvents([...events, { date: selectedDate, title: newEvent }]);
        setNewEvent('');
    };

    // Edit an existing event
    const handleEditEvent = (index: number) => {
        setEditingEventIndex(index);
        setEditingEventTitle(events[index].title);
    };

    // Save the edited event
    const handleSaveEdit = () => {
        if (editingEventTitle.trim() === '' || editingEventIndex === null) return;

        const updatedEvents = [...events];
        updatedEvents[editingEventIndex] = { ...updatedEvents[editingEventIndex], title: editingEventTitle };

        setEvents(updatedEvents);
        setEditingEventIndex(null);
        setEditingEventTitle('');
    };

    // Delete an event
    const handleDeleteEvent = (index: number) => {
        setEvents(events.filter((_, i) => i !== index));
    };

    // Filter events by selected date
    const eventsForSelectedDate = events.filter(
        (event) => selectedDate && event.date.toDateString() === selectedDate.toDateString()
    );

    // Custom tile content to highlight dates with events
    const tileContent = ({ date }: { date: Date }) => {
        const hasEvent = events.some(event => event.date.toDateString() === date.toDateString());

        return hasEvent ? (
            <div className="event-indicator"></div>
        ) : null;
    };

    return (
        <div className="events">
            <h1>Events</h1>
            <div className="calendar">
                <Calendar
                    value={selectedDate}
                    onClickDay={handleDayClick}
                    tileContent={tileContent} // Add custom content to highlight event dates
                />
            </div>
            <div className="add-event">
                <h2>Add Event</h2>
                <input
                    type="text"
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    placeholder="Event Title"
                />
                <button onClick={handleAddEvent}>Add Event</button>
            </div>
            <div className="event-list">
                <h2>Events on {selectedDate?.toDateString()}</h2>
                {eventsForSelectedDate.length > 0 ? (
                    <ul>
                        {eventsForSelectedDate.map((event, index) => (
                            <li key={index}>
                                {editingEventIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingEventTitle}
                                            onChange={(e) => setEditingEventTitle(e.target.value)}
                                        />
                                        <button onClick={handleSaveEdit}>Save</button>
                                        <button onClick={() => setEditingEventIndex(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        {event.title}
                                        <button onClick={() => handleEditEvent(index)}>Edit</button>
                                        <button onClick={() => handleDeleteEvent(index)}>Delete</button>
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
    );
};

export default Events;

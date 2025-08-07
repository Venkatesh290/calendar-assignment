import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Plus, X, AlertTriangle, Users, Video, Presentation, Settings, Briefcase, Coffee } from 'lucide-react';

const CalendarApp = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // month, week, day
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    duration: 60,
    type: 'meeting',
    location: '',
    description: ''
  });

  // Enhanced static events data with more realistic content
  const staticEvents = [
    {
      id: 1,
      title: "Team Standup",
      date: "2025-08-05",
      time: "09:00",
      duration: 30,
      type: "meeting",
      location: "Conference Room A",
      description: "Daily team sync and progress updates"
    },
    {
      id: 2,
      title: "Lunch with Steven",
      date: "2025-08-05",
      time: "12:30",
      duration: 60,
      type: "personal",
      location: "Downtown Bistro",
      description: "Business lunch discussion"
    },
    {
      id: 3,
      title: "Project Review",
      date: "2025-08-07",
      time: "14:00",
      duration: 90,
      type: "review",
      location: "Online - Zoom",
      description: "Q3 project milestone review"
    },
    {
      id: 4,
      title: "Client Presentation",
      date: "2025-08-08",
      time: "10:00",
      duration: 120,
      type: "presentation",
      location: "Client Office",
      description: "Product demo for stakeholders"
    },
    {
      id: 5,
      title: "Code Review Session",
      date: "2025-08-08",
      time: "15:30",
      duration: 60,
      type: "review",
      location: "Development Lab",
      description: "Weekly code quality review"
    },
    {
      id: 6,
      title: "Sprint Planning",
      date: "2025-08-12",
      time: "09:30",
      duration: 120,
      type: "planning",
      location: "Conference Room B",
      description: "Plan next sprint objectives"
    },
    {
      id: 7,
      title: "Design Workshop",
      date: "2025-08-15",
      time: "11:00",
      duration: 180,
      type: "workshop",
      location: "Creative Lab",
      description: "UX/UI design brainstorming session"
    },
    {
      id: 8,
      title: "All Hands Meeting",
      date: "2025-08-20",
      time: "16:00",
      duration: 60,
      type: "meeting",
      location: "Main Auditorium",
      description: "Company-wide quarterly update"
    }
  ];

  useEffect(() => {
    setEvents(staticEvents);
  }, []);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const fullMonthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  // Enhanced utility functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startingDayOfWeek = (firstDay.getDay() + 6) % 7;

    const days = [];

    // Previous month trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPrevMonth: true,
        fullDate: new Date(year, month - 1, prevMonth.getDate() - i)
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day: day,
        isCurrentMonth: true,
        isPrevMonth: false,
        fullDate: new Date(year, month, day)
      });
    }

    // Next month leading days
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day: day,
        isCurrentMonth: false,
        isPrevMonth: false,
        fullDate: new Date(year, month + 1, day)
      });
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null); // Reset selected date when changing months
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(today.getDate());
  };

  const isToday = (dayObj) => {
    if (!dayObj.isCurrentMonth) return false;
    return (
      dayObj.day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (dayObj) => {
    return dayObj.isCurrentMonth && dayObj.day === selectedDate;
  };

  const getEventsForDate = (dayObj) => {
    if (!dayObj.isCurrentMonth) return [];
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayObj.day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getEventTypeIcon = (type) => {
    const icons = {
      meeting: Users,
      review: Settings,
      presentation: Presentation,
      planning: Briefcase,
      workshop: Settings,
      demo: Video,
      personal: Coffee
    };
    return icons[type] || Users;
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50' },
      review: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' },
      presentation: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50' },
      planning: { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' },
      workshop: { bg: 'bg-pink-500', text: 'text-pink-600', light: 'bg-pink-50' },
      demo: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' },
      personal: { bg: 'bg-indigo-500', text: 'text-indigo-600', light: 'bg-indigo-50' }
    };
    return colors[type] || colors.meeting;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDateRange = (time, duration) => {
    const [hours, minutes] = time.split(':');
    const startTime = new Date();
    startTime.setHours(parseInt(hours), parseInt(minutes));
    const endTime = new Date(startTime.getTime() + duration * 60000);
    
    return `${formatTime(time)} - ${formatTime(endTime.toTimeString().slice(0, 5))}`;
  };

  const checkEventConflicts = (dayEvents) => {
    const conflicts = [];
    for (let i = 0; i < dayEvents.length; i++) {
      for (let j = i + 1; j < dayEvents.length; j++) {
        const event1 = dayEvents[i];
        const event2 = dayEvents[j];
        const start1 = new Date(`2000-01-01T${event1.time}`);
        const end1 = new Date(start1.getTime() + event1.duration * 60000);
        const start2 = new Date(`2000-01-01T${event2.time}`);
        const end2 = new Date(start2.getTime() + event2.duration * 60000);
        
        if (start1 < end2 && start2 < end1) {
          conflicts.push([event1.id, event2.id]);
        }
      }
    }
    return conflicts;
  };

  // Event management functions
  const handleAddEvent = () => {
    if (selectedDate) {
      const selectedDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      setNewEvent(prev => ({ ...prev, date: selectedDateStr }));
    }
    setShowAddEventModal(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const eventToAdd = {
        id: Date.now(),
        ...newEvent,
        duration: parseInt(newEvent.duration)
      };
      setEvents([...events, eventToAdd]);
      resetNewEvent();
      setShowAddEventModal(false);
    }
  };

  const resetNewEvent = () => {
    setNewEvent({
      title: '',
      date: '',
      time: '',
      duration: 60,
      type: 'meeting',
      location: '',
      description: ''
    });
  };

  const handleCancelAddEvent = () => {
    resetNewEvent();
    setShowAddEventModal(false);
  };

  const handleInputChange = (field, value) => {
    setNewEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const days = getDaysInMonth(currentDate);
  const selectedDateEvents = selectedDate ? getEventsForDate({ day: selectedDate, isCurrentMonth: true }) : [];
  const selectedDateConflicts = selectedDate ? checkEventConflicts(selectedDateEvents) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {monthNames[currentMonth]}' {currentYear}
                </h1>
                <p className="text-gray-600 text-sm mt-1 max-w-md">
                  Manage your schedule efficiently. View, create, and organize all your events in one place.
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Today
              </button>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all"
                  title="Previous month"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all"
                  title="Next month"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <button
                onClick={handleAddEvent}
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-2.5 rounded-lg flex items-center space-x-2 hover:from-gray-800 hover:to-gray-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="w-4 h-4" />
                <span className="font-medium">Add Event</span>
              </button>
            </div>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {daysOfWeek.map((day, index) => (
            <div key={day} className={`p-4 text-center font-semibold text-sm ${
              index >= 5 ? 'text-red-500' : 'text-gray-700'
            }`}>
              {day}
            </div>
          ))}
        </div>

        {/* Enhanced Calendar Grid */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-7 gap-0">
            {days.map((dayObj, index) => {
              const dayEvents = getEventsForDate(dayObj);
              const conflicts = checkEventConflicts(dayEvents);
              const hasConflicts = conflicts.length > 0;
              const isWeekend = index % 7 >= 5;
              const todayClass = isToday(dayObj);
              const selectedClass = isSelected(dayObj);

              return (
                <div
                  key={index}
                  className={`min-h-[140px] p-3 border-r border-b border-gray-50 relative cursor-pointer transition-all duration-200 ${
                    dayObj.isCurrentMonth
                      ? selectedClass
                        ? 'bg-blue-50 ring-2 ring-blue-200'
                        : todayClass
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                        : isWeekend
                        ? 'bg-red-25 hover:bg-red-50'
                        : 'bg-white hover:bg-gray-25'
                      : 'bg-gray-25'
                  } hover:shadow-md group`}
                  onClick={() => dayObj.isCurrentMonth && setSelectedDate(dayObj.day)}
                >
                  {/* Date number with enhanced styling */}
                  <div className={`text-lg font-bold mb-2 flex items-center justify-between ${
                    dayObj.isCurrentMonth
                      ? todayClass
                        ? 'text-blue-600'
                        : selectedClass
                        ? 'text-blue-700'
                        : isWeekend
                        ? 'text-red-500'
                        : 'text-gray-900'
                      : 'text-gray-400'
                  }`}>
                    <span>{String(dayObj.day).padStart(2, '0')}</span>
                    {hasConflicts && (
                      <AlertTriangle className="w-4 h-4 text-amber-500" title="Schedule conflicts!" />
                    )}
                  </div>
                  
                  {/* Enhanced Events Display */}
                  {dayObj.isCurrentMonth && (
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event, eventIndex) => {
                        const eventColor = getEventTypeColor(event.type);
                        const IconComponent = getEventTypeIcon(event.type);
                        
                        return (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1.5 rounded-lg ${eventColor.bg} text-white shadow-sm hover:shadow-md transition-all cursor-pointer group-hover:scale-105 ${
                              hasConflicts ? 'ring-1 ring-amber-300' : ''
                            }`}
                            title={`${event.title}\n${formatDateRange(event.time, event.duration)}\n${event.location}`}
                          >
                            <div className="flex items-center space-x-1">
                              <IconComponent className="w-3 h-3 flex-shrink-0" />
                              <span className="font-medium truncate">{event.title}</span>
                            </div>
                            <div className="text-[10px] opacity-90 mt-0.5">
                              {formatTime(event.time)}
                            </div>
                          </div>
                        );
                      })}
                      
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded-lg font-medium">
                          +{dayEvents.length - 3} more events
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Selected Date Details */}
        {selectedDate && (
          <div className="mt-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {fullMonthNames[currentMonth]} {selectedDate}, {currentYear}
              </h3>
              <div className="flex items-center space-x-2">
                {selectedDateConflicts.length > 0 && (
                  <div className="flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    {selectedDateConflicts.length} conflict{selectedDateConflicts.length !== 1 ? 's' : ''}
                  </div>
                )}
                <span className="text-sm text-gray-500">
                  {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedDateEvents.map(event => {
                  const eventColor = getEventTypeColor(event.type);
                  const IconComponent = getEventTypeIcon(event.type);
                  
                  return (
                    <div key={event.id} className={`p-4 rounded-xl border-l-4 ${eventColor.light} hover:shadow-md transition-shadow`} 
                         style={{borderLeftColor: eventColor.bg.replace('bg-', '#').replace('500', '500')}}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${eventColor.bg}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg">{event.title}</h4>
                          {event.description && (
                            <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDateRange(event.time, event.duration)}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location || 'No location specified'}
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${eventColor.text} ${eventColor.light}`}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No events scheduled for this date.</p>
                <button
                  onClick={handleAddEvent}
                  className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add an event
                </button>
              </div>
            )}
          </div>
        )}

        {/* Enhanced Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Create New Event</h3>
                  <button
                    onClick={handleCancelAddEvent}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Duration (minutes)
                      </label>
                      <select
                        value={newEvent.duration}
                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                        <option value={180}>3 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Event Type
                      </label>
                      <select
                        value={newEvent.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="review">Review</option>
                        <option value="presentation">Presentation</option>
                        <option value="planning">Planning</option>
                        <option value="workshop">Workshop</option>
                        <option value="demo">Demo</option>
                        <option value="personal">Personal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter location or meeting link"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Add event description..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    onClick={handleCancelAddEvent}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEvent}
                    disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
                  >
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarApp;
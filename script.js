document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYearDisplay = document.querySelector('.month-year');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');

    let currentDate = new Date();
    let events = {}; 

    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    function renderCalendar() {
        const daysInCalendar = [];
        for (let i = 0; i < firstDayIndex; i++) {
            daysInCalendar.push('');
        }
        for (let i = 1; i <= lastDateOfMonth; i++) {
            daysInCalendar.push(i);
        }
        const totalRows = Math.ceil(daysInCalendar.length / 7);
        calendarGrid.style.gridTemplateRows = `repeat(${totalRows}, 1fr)`;

        calendarGrid.innerHTML = '';
        daysInCalendar.forEach(day => {
            const dateBtn = document.createElement('button');
            dateBtn.className = 'date';
            dateBtn.innerText = day;

            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-header-title">Day ${day}</div>
                        <div class="close">&times;</div>
                    </div>
                    <hr />
                    <div class="modal-body">
                        <div class="events-list">
                            ${events[currentDate.toDateString()] && events[currentDate.toDateString()][day] ? 
                                events[currentDate.toDateString()][day].map(event => `<p>${event}</p>`).join('') : 'No events'}
                        </div>
                        <input type="text" class="event-input" placeholder="Add event" />
                        <button class="add-event-btn">Add Event</button>
                    </div>
                </div>
            `;
            
            dateBtn.addEventListener('click', () => {
                if (day === '') {
                    return;
                }
                modal.style.display = "block";
                const addEventBtn = modal.querySelector('.add-event-btn');
                const eventListDiv = modal.querySelector('.events-list');
                addEventBtn.addEventListener('click', () => {
                    const eventInput = modal.querySelector('.event-input');
                    const newEvent = eventInput.value.trim(); 
                    const key = currentDate.toDateString();

                    if (newEvent) {
                        if (!events[key]) {
                            events[key] = {};
                        }
                        if (!events[key][day]) {
                            events[key][day] = [];
                        }
                        events[key][day].push(newEvent);
                        eventInput.value = ''; 
                        eventListDiv.innerHTML = events[key][day].map(event => `<p>${event}</p>`).join('');
                    }
                });
            });

            const modalCloseBtn = modal.querySelector('.close');
            modalCloseBtn.addEventListener('click', () => {
                modal.style.display = "none";
            });

            window.addEventListener('click', (event) => {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });

            calendarGrid.appendChild(dateBtn);
            calendarGrid.appendChild(modal);
        });

        const options = {
            month: 'long',
            year: 'numeric'
        };
        monthYearDisplay.innerText = currentDate.toLocaleDateString('en-US', options);
    }

    const currentMonth = currentDate.getMonth();
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentMonth - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentMonth + 1);
        renderCalendar();
    });

    renderCalendar();
});

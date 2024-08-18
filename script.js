document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYearDisplay = document.querySelector('.month-year');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    
    let currentDate = new Date();
    let events = {};

    function renderCalendar() {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const firstDayIndex = firstDayOfMonth.getDay();
        const lastDateOfMonth = lastDayOfMonth.getDate();

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
        daysInCalendar.forEach(day=>{
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
                        <div class="event-list">
                            ${events[day] ? events[day].map(event=>`<p>${event}</p>`).join('') : 'No events'}
                        </div>
                        <input type="text" class="event-input" placeholder="Add event" />
                        <button class="add-event-btn">Add Event</button>
                    </div>
                </div>
            `;

            dateBtn.addEventListener('click', () => {
                if (day !== '') {
                    modal.style.display = "block";
                    const addEventBtn = modal.querySelector('.add-event-btn');
                    addEventBtn.addEventListener('click', () => {
                        const eventInput = modal.querySelector('.event-input');
                        const newEvent = eventInput.value;
                        if (newEvent) {
                            if (!events[day]) {
                                events[day] = [];
                            }
                            events[day].push(newEvent);
                            eventInput.value = '';
                            modal.querySelector('.events-list').innerHTML = events[day].map(event => `<p>${event}</p>`).join('');
                        }
                    });
                }
            });

            modal.querySelector('.close').addEventListener('click', ()=>{
                modal.style.display = "none";
            });

            window.addEventListener('click', (event)=>{
                if(event.target === modal) {
                    modal.style.display = "none";
                }
            });
            
            calendarGrid.appendChild(dateBtn);
            calendarGrid.appendChild(modal);
        });

        const options = { month: 'long', year: 'numeric' };
        monthYearDisplay.innerText = currentDate.toLocaleDateString('en-US', options);
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar(); 
});

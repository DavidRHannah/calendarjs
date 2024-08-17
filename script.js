document.addEventListener('DOMContentLoaded', function() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYearDisplay = document.querySelector('.month-year');
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');

    let currentDate = new Date();

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
        while (daysInCalendar.length < 35) { 
            daysInCalendar.push('');
        }

        calendarGrid.innerHTML = ''; 
        for (let day of daysInCalendar) {
            const dateDiv = document.createElement('div');
            dateDiv.className = 'date';
            dateDiv.innerText = day;
            calendarGrid.appendChild(dateDiv);
        }

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

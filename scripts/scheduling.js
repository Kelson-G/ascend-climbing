// Simple Carousel JS
const images = document.querySelectorAll('.carousel-images img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;

function showImage(idx) {
    images.forEach((img, i) => {
        img.style.display = i === idx ? 'block' : 'none';
        img.classList.toggle('active', i === idx);
    });
}

prevBtn.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
});

nextBtn.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
});

showImage(current);

// --- Calendar with Filtering ---

// Import the events array from events.js
import { events } from './events.js';

let currentDate = new Date();
let currentCategory = 'all';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderCalendar(date = new Date()) {
  const calendarDays = document.getElementById('calendarDays');
  const monthYear = document.getElementById('monthYear');
  const year = date.getFullYear();
  const month = date.getMonth();

  // Set header
  const monthName = date.toLocaleString('default', { month: 'long' });
  monthYear.textContent = `${monthName} ${year}`;

  // First day of the month
  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  // Last day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarDays.innerHTML = '';

  // Add day names
  dayNames.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell day-name';
    cell.textContent = day;
    calendarDays.appendChild(cell);
  });

  // Fill blank cells before first day
  for (let i = 0; i < startingDay; i++) {
    const blankCell = document.createElement('div');
    blankCell.className = 'calendar-cell';
    calendarDays.appendChild(blankCell);
  }

  // Fill days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`;

    const cell = document.createElement('div');
    cell.className = 'calendar-cell';

    // Highlight today
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      cell.classList.add('today');
    }

    const dayNum = document.createElement('div');
    dayNum.className = 'calendar-day-number';
    dayNum.textContent = day;
    cell.appendChild(dayNum);

    // Add events for this day, filtered by category
    events.forEach(event => {
      if (
        event.date === fullDate &&
        (currentCategory === 'all' || event.category === currentCategory)
      ) {
        const eventEl = document.createElement('div');
        eventEl.className = 'event';
        eventEl.textContent = event.title;
        cell.appendChild(eventEl);
      }
    });

    calendarDays.appendChild(cell);
  }

  // Fill trailing blank cells to complete the grid (if needed)
  const totalCells = startingDay + daysInMonth + dayNames.length;
  const remainder = totalCells % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i++) {
      const blankCell = document.createElement('div');
      blankCell.className = 'calendar-cell';
      calendarDays.appendChild(blankCell);
    }
  }
}

window.changeMonth = function(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar(currentDate);
};

// Filter buttons
document.querySelectorAll('.calendar-filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.getAttribute('data-category');
    renderCalendar(currentDate);
    // Highlight active filter
    document.querySelectorAll('.calendar-filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Initial render
renderCalendar(currentDate);
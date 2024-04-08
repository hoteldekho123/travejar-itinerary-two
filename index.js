document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("datepicker");
  const calendar = document.getElementById("calendar");
  const currentMonthYear = document.getElementById("currentMonthYear");
  const weekDaysContainer = document.getElementById("weekDays");
  const calendarBody = document.getElementById("calendarBody");

  // Function to generate calendar for a given month and year
  function generateCalendar(month, year) {
    calendarBody.innerHTML = '';
    weekDaysContainer.innerHTML = '';
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
      const weekDayCell = document.createElement('span');
      weekDayCell.textContent = day;
      weekDayCell.classList.add('week-day');
      weekDaysContainer.appendChild(weekDayCell);
    });

    // for (let i = 0; i < firstDayOfMonth; i++) {
    //   const emptyCell = document.createElement('span');
    //   calendarBody.appendChild(emptyCell);
    // }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateCell = document.createElement('span');
    dateCell.textContent = i;
    dateCell.classList.add('date');

    // Check if the date is in the past or is the current date
    if (new Date(year, month, i) <= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
      dateCell.classList.add('disabled');
    } else {
      dateCell.addEventListener('click', handleDateSelection); // Add event listener only for future dates
    }

    // Check if it's the current date
    if (i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
      dateCell.classList.add('current-date');
    }
      calendarBody.appendChild(dateCell);

      // Set prices dynamically (replace with your logic)
      const price = calculatePrice(year, month, i);
      if (price) {
        const priceTag = document.createElement('span');
        priceTag.textContent = '₹' + price;
        priceTag.classList.add('pricetotal');
        dateCell.appendChild(priceTag);
      }
    }

    currentMonthYear.textContent = `${monthNames[month]} ${year}`;
  }

  // Function to show/hide calendar
  function toggleCalendar() {
    calendar.classList.toggle('active');
  }

  // Function to handle date selection
  function handleDateSelection(e) {
    const selectedDate = e.target.textContent;
    const selectedMonthYear = currentMonthYear.textContent;
    input.value = `${selectedDate} ${selectedMonthYear}`;
    toggleCalendar();
    // Remove selected date class from previous selected date
    const selectedDateElem = calendarBody.querySelector('.selected-date');
    if (selectedDateElem) {
      selectedDateElem.classList.remove('selected-date');
    }
    // Add selected date class to current selected date
    e.target.classList.add('selected-date');
  }

  // Event listener for input click
  input.addEventListener("click", toggleCalendar);

  // Event listener for date selection
  calendarBody.addEventListener("click", handleDateSelection);

  // Initial setup
  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  generateCalendar(currentMonth, currentYear);

  // Event listener for previous month button
  document.getElementById("prevMonth").addEventListener("click", function() {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
  });

  // Event listener for next month button
  document.getElementById("nextMonth").addEventListener("click", function() {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
  });

  // Function to calculate price (replace with your logic)
  function calculatePrice(year, month, date) {
    // Example logic: price increases with the date number
    return date * 2;
  }
});
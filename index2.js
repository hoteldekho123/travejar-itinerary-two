document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("datepicker");
    const calendar = document.getElementById("calendar");
    const currentMonthYear = document.getElementById("currentMonthYear");
    const weekDaysRow = document.getElementById("weekDays");
    const calendarBody = document.getElementById("calendarBody");
    const calendarTable = document.getElementById("calendarTable");

    // Function to generate calendar for a given month and year
    function generateCalendar(month, year) {
        calendarBody.innerHTML = '';
        weekDaysRow.innerHTML = '';
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        weekDays.forEach(day => {
            const weekDayCell = document.createElement('th');
            weekDayCell.textContent = day;
            weekDaysRow.appendChild(weekDayCell);
        });

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('td');
            calendarBody.appendChild(emptyCell);
        }

        let dayCount = 1;
        for (let row = 0; row < 6; row++) {
            const newRow = document.createElement('tr');
            for (let col = 0; col < 7; col++) {
                if (row === 0 && col < firstDayOfMonth) {
                    // Empty cells before the first day of the month
                    newRow.insertCell();
                } else if (dayCount <= daysInMonth) {
                    const newCell = newRow.insertCell();
                    const cellContent = document.createElement('p');
                    cellContent.textContent = dayCount;
                    newCell.appendChild(cellContent);
                    newCell.classList.add('date');
                    if (dayCount === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
                        newCell.classList.add('current-date');
                    }
                    if (new Date(year, month, dayCount) < currentDate) {
                        newCell.classList.add('disabled');
                    }
                    dayCount++;

                    // Set prices dynamically (replace with your logic)
                    const price = calculatePrice(year, month, dayCount);
                    if (price) {
                        const priceTag = document.createElement('span');
                        priceTag.textContent = '₹' + price;
                        priceTag.classList.add('price');
                        newCell.appendChild(priceTag);
                    }
                }
            }
            calendarBody.appendChild(newRow);
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
    calendarBody.addEventListener("click", function(e) {
        if (!e.target.classList.contains('disabled')) {
            handleDateSelection(e);
        }
    });

    // Initial setup
    const currentDate = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    generateCalendar(currentMonth, currentYear);

    // Set input field value to today's date
    input.value = currentDate.getDate() + ' ' + monthNames[currentMonth] + ' ' + currentYear;

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


// custom select option 
document.addEventListener("DOMContentLoaded", function() {
    const customSelect = document.querySelector(".custom-select");
    const selectElement = customSelect.querySelector("select");
    const selectOptions = selectElement.querySelectorAll("option");
  
    const selectedDiv = document.createElement("div");
    selectedDiv.classList.add("select-selected");
    selectedDiv.innerHTML = selectOptions[0].innerHTML;
    customSelect.appendChild(selectedDiv);
  
    const selectItemsDiv = document.createElement("div");
    selectItemsDiv.classList.add("select-items");
    selectItemsDiv.style.display = "none"; // Set display to none initially
    selectOptions.forEach(option => {
      const optionDiv = document.createElement("div");
      optionDiv.innerHTML = option.innerHTML;
      optionDiv.addEventListener("click", function() {
        selectElement.value = option.value;
        selectedDiv.innerHTML = option.innerHTML;
        selectItemsDiv.querySelectorAll(".same-as-selected").forEach(div => {
          div.classList.remove("same-as-selected");
        });
        this.classList.add("same-as-selected");
      });
      selectItemsDiv.appendChild(optionDiv);
    });
    customSelect.appendChild(selectItemsDiv);
  
    selectedDiv.addEventListener("click", function(e) {
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.style.display = "block"; // Show select-items when clicked
      this.classList.toggle("select-arrow-active");
    });
  
    function closeAllSelect(elmnt) {
      const items = document.querySelectorAll(".select-items");
      items.forEach(item => {
        if (elmnt !== item.previousSibling) {
          item.style.display = "none"; // Hide select-items
          item.previousSibling.classList.remove("select-arrow-active");
        }
      });
    }
  
    document.addEventListener("click", function(e) {
      closeAllSelect(e.target);
    });
});

// step form JSON 
$(document).ready(function(){
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 1;
    var steps = $("fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){
    
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();
    
    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    next_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(++current);
    });
    
    $(".previous").click(function(){
    
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
    
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    previous_fs.css({'opacity': opacity});
    },
    duration: 500
    });
    setProgressBar(--current);
    });
    
    function setProgressBar(curStep){
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
    .css("width",percent+"%")
    }
    
    $(".submit").click(function(){
    return false;
    })
    
});

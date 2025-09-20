document.addEventListener("DOMContentLoaded", function () {
  // Selecting the elements
  const calculateBtn = document.getElementById("calculateBtn");
  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("loan");

  // Summary elements
  const monthlyPayment = document.getElementById("monthly");
  const totalPayment = document.getElementById("total");
  const totalInterest = document.getElementById("totalInterest");

  // Function to calculate the loan
  function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const interest = parseFloat(interestInput.value) / 100 / 12;
    const years = parseFloat(yearsInput.value) * 12;

    if (
      isNaN(principal) ||
      isNaN(interest) ||
      isNaN(years) ||
      principal <= 0 ||
      interest < 0 ||
      years <= 0
    ) {
      alert("Please enter valid positive numbers for all fields.");
      return;
    }

    // Calculate monthly payment
    const x = Math.pow(1 + interest, years);
    const monthly = (principal * x * interest) / (x - 1);

    if (isFinite(monthly)) {
      const totalPay = monthly * years;
      const totalInt = totalPay - principal;

      // Animate the results
      animateValue(monthlyPayment, 0, monthly, 1000);
      animateValue(totalPayment, 0, totalPay, 1000);
      animateValue(totalInterest, 0, totalInt, 1000);
    }
  }

  // Animation helper
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      element.innerText = current.toFixed(2);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Bind the event
  calculateBtn.addEventListener("click", calculateLoan);
});

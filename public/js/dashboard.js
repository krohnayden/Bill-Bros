const moment = require('moment');


const createTransactionHandler = async (event) => {
  event.preventDefault();

  const transaction = document.querySelector('#transaction-name').value.trim();
  let dueDate = document.querySelector('#transaction-date').value.trim();

  if (!dueDate) {
    dueDate = moment().format('MMDDYYYY');
  }

  const response = await fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify({ transaction, dueDate}),
    headers: { 'Content-Type': 'application/json'}
  });
  console.log(response, transaction, dueDate);

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.create').addEventListener('click', createTransactionHandler);




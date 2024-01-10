const createTransactionHandler = async (event) => {
  event.preventDefault();

  let name = document.querySelector('#transaction-name').value.trim();
  // let dueDate = document.querySelector('#transaction-date').value.trim();
  let amount_due = document.querySelector('#transaction-amount').value.trim();
  let description = document.querySelector('#transaction-desc').value.trim();
  let user_id = event.target.getAttribute('id')


  // if (transaction) {
  const response = await fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify({ name, amount_due, description, user_id}),
    headers: { 'Content-Type': 'application/json'}
  });
  console.log(response, name, amount_due, description, user_id);

  
  document.location.replace('/profile');

  


//   if (response.ok) {
//     document.location.replace('/profile');
//   } else {
//     alert(response.statusText);
//   }
// }
};
document.querySelector('.create').addEventListener('click', createTransactionHandler);




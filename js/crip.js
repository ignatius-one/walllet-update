const button = document.getElementById('box-day-nigth');
button.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    button.classList.toggle('active')
})


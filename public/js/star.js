const stars = document.querySelectorAll('input[name="rating"]');
let totalVotes = 0; 
stars.forEach(star => {
    star.addEventListener('change', () => {
        totalVotes++; 
        document.querySelector('.count').textContent = totalVotes; 

        console.log(`Total votes: ${totalVotes}`); 
    });
});


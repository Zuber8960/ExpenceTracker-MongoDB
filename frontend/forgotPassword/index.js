const form = document.querySelector('form');

form.addEventListener('click' , (e) => {
    e.preventDefault();
    if(e.target.className == 'forgotpassword'){
        let email = document.getElementById('email').value;
        // console.log(email);
        const userEmail = {email};
        axios.post(`http://localhost:3000/password/forgotpassword`,userEmail)
        .then(responce => {
            if(responce.status == 200){
                alert(responce.data.message);
                document.getElementById('email').value = null;
            }else{
                throw new Error(err);
            }
        })
        .catch(err => {
            console.log(err);
            if(err.response.status == 400){
                document.getElementById('email').value = null;
                return alert(err.response.data.message);
            }
            document.body.innerHTML += `<div class="error">Something went wrong !</div>`;
        });
    }

})
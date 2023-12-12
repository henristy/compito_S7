let url='https://striveschool-api.herokuapp.com/api/product/';
switch (location.pathname.split('/').pop()) {
    
    case 'back-office.html':

        document.addEventListener('DOMContentLoaded', () => {
           
            document.querySelector('ul a').addEventListener('click',() =>  {
                loadProducts(url);
            });
            document.querySelectorAll('#collapseFormAdd button')[1].addEventListener('click',() => {
                addOrModifyProduct(url, 'POST', document.querySelector('#mainName').value, document.querySelector('#mainDesc').value, document.querySelector('#mainPrice').value , document.querySelector('#mainURL').value, document.querySelector('#mainBrand').value);
            });
            document.querySelector('#prodArea').addEventListener('click', (e) => {
                let urlId=`https://striveschool-api.herokuapp.com/api/product/${e.target.parentNode.id}`;
                if(e.target.innerText === 'Modify') {
                    document.querySelector('#modalName').value = e.target.parentNode.parentNode.children[0].innerText;
                    document.querySelector('#modalDesc').value = e.target.parentNode.parentNode.parentNode.children[0].alt;
                    document.querySelector('#modalURL').value = e.target.parentNode.parentNode.parentNode.children[0].src;
                    document.querySelector('#modalPrice').value = e.target.parentNode.parentNode.children[1].innerText;
                    document.querySelector('#modalBrand').value = e.target.parentNode.parentNode.children[2].innerText;
                
                    document.querySelectorAll('#modifymodalToggle .modal-footer button')[1].addEventListener('click', () => {
                        addOrModifyProduct(urlId, 'PUT', document.querySelector('#modalName').value, document.querySelector('#modalDesc').value, document.querySelector('#modalPrice').value, document.querySelector('#modalURL').value, document.querySelector('#modalBrand').value);
                        loadProducts(url);
                    })
                } else if (e.target.innerText === 'Delete') {
                    document.querySelectorAll('#confirmModalToggle .card-footer button')[1].addEventListener('click', () => deleteProd(urlId));
                }
            })
        })

        loadProducts = async (link) => {
            try {
                const response = await fetch(link, {method: 'GET' , headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MzU3YmMwNTgzNTAwMTg1MjJmOGYiLCJpYXQiOjE3MDIzNzY4MjgsImV4cCI6MTcwMzU4NjQyOH0.MjvT4cKvFZKXVLGfHGyqbYtGq5pQJPQPFgyhZVVVXJw'}})
                const res= await response.json();
                console.log(res)
                document.querySelector('#prodArea').innerHTML='';
                res.forEach(obj => {
                    let card = `
                    <div class="col">
                        <div class="card">
                            <img src="${obj.imageUrl}" class="card-img-top" alt="${obj.description}">
                            <div class="card-body">
                                <h5 class="card-title">${obj.name}</h5>
                                <p class='card-text lead'>£ ${obj.price}</p>
                                <p class='card-text text-end'>${obj.brand}</p>
                                <div  id=${obj._id} class="card-footer">
                                    <a href="#modifyModalToggle" data-bs-toggle='modal' class="card-link btn btn-info btn-sm">Modify</a>
                                    <a href="#confirmModalToggle" data-bs-toggle='modal' class="card-link btn btn-outline-danger btn-sm">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div> `
                    document.querySelector('#prodArea').innerHTML += card; 
                });
                
            } catch (error) {
                console.error(error);
            }
        }

        addOrModifyProduct = async (link, metodo, prodName, prodDesc, prodPrice, prodUrl, prodBrand) => {
            try {
                const response = await fetch(link,  {method: metodo ,
                                    headers: {  "Content-Type": "application/json" ,Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MzU3YmMwNTgzNTAwMTg1MjJmOGYiLCJpYXQiOjE3MDIzNzY4MjgsImV4cCI6MTcwMzU4NjQyOH0.MjvT4cKvFZKXVLGfHGyqbYtGq5pQJPQPFgyhZVVVXJw'},
                                    body: JSON.stringify({
                                        name: prodName,
                                        description: prodDesc,
                                        price: prodPrice,
                                        imageUrl: prodUrl,
                                        brand: prodBrand
                                    })
                                    })
            } catch(error) {
                console.error('error:', error);
            }
        }


        deleteProd = async (link)  => {
            const response = await fetch(link, {method: 'DELETE' , headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4MzU3YmMwNTgzNTAwMTg1MjJmOGYiLCJpYXQiOjE3MDIzNzY4MjgsImV4cCI6MTcwMzU4NjQyOH0.MjvT4cKvFZKXVLGfHGyqbYtGq5pQJPQPFgyhZVVVXJw'}})
            const res= await response.json();
            console.log(res);
            loadProducts(url);
        }
    
}




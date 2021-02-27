'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    let adv = document.querySelector('.promo__adv'),
        bg = document.querySelector('.promo__bg'),
        genrePromo = bg.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        // addBtn = addForm.querySelector('button'),
        checkbox = addForm.querySelector('[type="checkbox"]');
    
    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkbox.checked;
        
        if (newFilm) {

            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    // Удаление рекламы
    const delAdv = (item) => {
        item.remove();
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    // Изменение жанра фильма
    genrePromo.textContent = 'Драма';
    
    // Изменение заднего фона постера
    bg.style.background = "url('img/bg.jpg')";

    function createList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);

        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1 + "."} ${film}
                    <div class="delete"></div>
                </li>
            `
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);

                createList(films, parent);
            })
        });
    };

    createList(movieDB.movies, movieList);    
    delAdv(adv);
}); 
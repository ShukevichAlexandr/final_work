const data = { 
    notes: [], // Массив для хранения заметок
    render() { // Основной метод рендеринга списка заметок
        const notesListContainer = document.querySelector('.notes-list');
        notesListContainer.innerHTML = '';

        for (let note of this.notes) {
            const li = document.createElement('li');
            const form = document.createElement('form');
            const containerDiv = document.createElement('div');
            const headerDiv = document.createElement('div');
            const titleP = document.createElement('p');
            const buttonsDiv = document.createElement('div');
            const likeButton = document.createElement('button');
            const trashButton = document.createElement('button');
            const descriptionSpan = document.createElement('span');

            titleP.dataset.noteId = note.id;
            titleP.className = 'notes-list-title';
            titleP.textContent = note.title || '';

            descriptionSpan.className = 'notes-list-description';
            descriptionSpan.textContent = note.content || '';

            likeButton.className = note.inFavorite ? 'like-filled-heart-icon' : 'like-heart-icon';
            likeButton.dataset.noteId = note.id;

            trashButton.className = 'trash';

            buttonsDiv.className = 'buttons';
            buttonsDiv.appendChild(likeButton);
            buttonsDiv.appendChild(trashButton);

            headerDiv.className = 'header-notes-list';
            headerDiv.style.backgroundColor = note.color; // Устанавливаем цвет фона шапки
            headerDiv.appendChild(titleP);
            headerDiv.appendChild(buttonsDiv);

            containerDiv.className = 'notes-list-container';
            containerDiv.appendChild(headerDiv);
            containerDiv.appendChild(descriptionSpan);

            form.action = '';
            form.appendChild(containerDiv);
            li.appendChild(form);
            notesListContainer.appendChild(li);
        }

        const totalCountEl = document.querySelector('.text-statistic');
        totalCountEl.textContent = `Всего заметок: ${this.notes.length}`;
    },
    renderFilter() { // Метод рендеринга избранных заметок
        const filteredNotes = this.notes.filter(note => note.inFavorite);
        const notesListContainer = document.querySelector('.notes-list');
        notesListContainer.innerHTML = '';

        for (let note of filteredNotes) {
            const li = document.createElement('li');
            const form = document.createElement('form');
            const containerDiv = document.createElement('div');
            const headerDiv = document.createElement('div');
            const titleP = document.createElement('p');
            const buttonsDiv = document.createElement('div');
            const likeButton = document.createElement('button');
            const trashButton = document.createElement('button');
            const descriptionSpan = document.createElement('span');

            titleP.dataset.noteId = note.id;
            titleP.className = 'notes-list-title';
            titleP.textContent = note.title || '';

            descriptionSpan.className = 'notes-list-description';
            descriptionSpan.textContent = note.content || '';

            likeButton.className = note.inFavorite ? 'like-filled-heart-icon' : 'like-heart-icon';
            likeButton.dataset.noteId = note.id;

            trashButton.className = 'trash';

            buttonsDiv.className = 'buttons';
            buttonsDiv.appendChild(likeButton);
            buttonsDiv.appendChild(trashButton);

            headerDiv.className = 'header-notes-list';
            headerDiv.style.backgroundColor = note.color; // Устанавливаем цвет фона шапки
            headerDiv.appendChild(titleP);
            headerDiv.appendChild(buttonsDiv);

            containerDiv.className = 'notes-list-container';
            containerDiv.appendChild(headerDiv);
            containerDiv.appendChild(descriptionSpan);

            form.action = '';
            form.appendChild(containerDiv);
            li.appendChild(form);
            notesListContainer.appendChild(li);
        }

        const totalCountEl = document.querySelector('.text-statistic');
        totalCountEl.textContent = `Всего заметок: ${filteredNotes.length}`;
    },
    addNote(noteData) { // Метод добавления новой заметки
        const newNote = {
            id: new Date().getTime(),
            title: noteData.title || '',
            content: noteData.content || '',
            color: noteData.color || '#F3DB7D', // Жёлтый цвет по умолчанию
            inFavorite: false
        };
        this.notes.push(newNote);
        this.render();
    }
};

data.render(); // Первоначальный рендеринг пустого списка заметок

// Вспомогательные функции вывода сообщений
function showDivWorning(words) {
    const worningDiv = document.querySelector('.worning-div-container');
    const pWorningText = document.querySelector('.worning-text');
    pWorningText.textContent = words;
    worningDiv.style.display = 'block';
    setTimeout(() => {
        worningDiv.style.display = 'none';
    }, 2000);
}

function showDivDone(words) {
    const doneDiv = document.querySelector('.done-div-container');
    const pDoneText = document.querySelector('.done-text');
    pDoneText.textContent = words;
    doneDiv.style.display = 'block';
    setTimeout(() => {
        doneDiv.style.display = 'none';
    }, 2000);
}

// Глобальная переменная для хранения выбранного цвета
let selectedColor = '#F3DB7D'; // Начальный цвет по умолчанию (желтый)

// Пример работы с атрибутом data-


//  <article class="product-card" data-product-id="12345">
//    <h2>Красивый чайник</h2>
//    <p>Цена: 1999 руб.</p>
//  </article>

// const productCard = document.querySelector('.product-card');
// const productID = productCard.getAttribute('data-product-id'); // Вернет "12345"
// console.log(productID); // Выведет "12345"


// тег <article>
// Данный тег предназначен для обозначения автономного раздела страницы, который может существовать самостоятельно и 
// представлять законченное содержание (статья, новость, пост в блоге и т.д.).



// Соответствие имени цвета и HEX-кода
const colorMap = {
    purple: '#E77DF3',
    red: '#F37D7D',
    blue: '#7DE1F3',
    green: '#C2F37D',
    yellow: '#F3DB7D'
};

// Инициализация палитры цветов
function initColors() {
    const colorsItems = document.querySelectorAll('.color-container .colors-items li');
    colorsItems.forEach(circle => {
        circle.addEventListener('click', () => {
            // Снимаем выделение со всех кружочков
            colorsItems.forEach(otherItem => otherItem.classList.remove('selected'));
            // Выделяем выбранный кружочек
            circle.classList.add('selected');
            // Запоминаем выбранный цвет
            const colorName = circle.getAttribute('data-color');
            selectedColor = colorMap[colorName]; // Берём HEX-код из карты цветов
        });
    });
}

// Вызываем функцию initColors()
initColors();

// Обработчик события создания новой заметки
const createBtn = document.querySelector('.create_elem');
createBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const titleInput = document.querySelector('.name-note');
    const titleValue = titleInput.value.trim(); 

    const contentTextarea = document.querySelector('.description-note');
    const contentValue = contentTextarea.value.trim(); 

    if (!titleValue || !contentValue) { 
        showDivWorning('Оба поля ввода должны быть заполнены');
        return;
    }

    if (titleValue.length > 50) {
        showDivWorning('Название заметки не может содержать более 50 символов');
        titleInput.value = ''; 
        contentTextarea.value = '';
        return;
    }

    // Передача выбранного цвета при создании заметки
    data.addNote({ title: titleValue, content: contentValue, color: selectedColor }); 

    showDivDone('Заметка успешно создана');

    titleInput.value = ''; 
    contentTextarea.value = '';

    // Если фильтр настроен на избранные, переходим на отображение всех заметок
    const filterButton = document.querySelector('.filter-button-liked');
    if (filterButton.classList.contains('filter-button-liked')) {
        filterButton.classList.remove('filter-button-liked');
        filterButton.classList.add('filter-button-unliked');
        data.render(); // Перерисовываем полный список заметок
    }
});

// Обработчик событий для кнопок "Like"
document.querySelector('.notes-list').addEventListener('click', function(event) { 
    if (event.target.classList.contains('like-heart-icon') || event.target.classList.contains('like-filled-heart-icon')) { 
        event.preventDefault(); 
        event.stopPropagation(); 

        const button = event.target; 
        const parentLi = button.closest('li'); 
        
        // Находим родительский элемент (li с заметкой) 
        const noteTitle = parentLi.querySelector('.notes-list-title');
        const noteId = noteTitle.dataset.noteId; 
        const foundNote = data.notes.find(n => n.id === +noteId);
        if (foundNote) { 
            foundNote.inFavorite = !foundNote.inFavorite;
        
            // Инвертируем статус избранной заметки 
            if (foundNote.inFavorite) { 
                button.classList.remove('like-heart-icon');
                button.classList.add('like-filled-heart-icon');
            } else { 
                button.classList.remove('like-filled-heart-icon'); 
                button.classList.add('like-heart-icon'); 
            } 
        } 
    } 
});

// Обработчик удаления заметки
document.querySelector('.notes-list').addEventListener('click', function(event) { 
    if (event.target.classList.contains('trash')) { 
        event.preventDefault(); 
        event.stopPropagation();
        const button = event.target;
        const parentLi = button.closest('li'); 
        
        // Находим родительский элемент (li с заметкой) 
        const noteTitle = parentLi.querySelector('.notes-list-title'); 
        const noteId = noteTitle.dataset.noteId; 
        const indexToRemove = data.notes.findIndex(n => n.id === +noteId);
        if (indexToRemove !== -1) { 
            data.notes.splice(indexToRemove, 1); 
            data.render(); // Перерисовываем список заметок
        } 
    } 
});

// Переключатель фильтра
const toggleFilter = document.querySelector('.filter-box');
toggleFilter.addEventListener('click', function(event) {
    if (event.target.classList.contains('filter-button-unliked') || event.target.classList.contains('filter-button-liked')) {
        event.preventDefault();
        event.stopPropagation();
        const filterButton = event.target;
        const currentState = filterButton.classList.contains('filter-button-liked');

        // Меняем состояние кнопки и применяем соответствующий фильтр
        if (currentState) {
            // Сейчас отображаются только избранные, переключаемся на все заметки
            filterButton.classList.remove('filter-button-liked');
            filterButton.classList.add('filter-button-unliked');
            data.render(); // Показываем все заметки
        } else {
            // Включаем режим избранных
            filterButton.classList.remove('filter-button-unliked');
            filterButton.classList.add('filter-button-liked');
            data.renderFilter(); // Показываем только избранные заметки
        }
    }
});
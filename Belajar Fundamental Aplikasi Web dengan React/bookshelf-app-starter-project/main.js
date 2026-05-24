const STORAGE_KEY = 'BOOKSHELF_DATA';
const RENDER_EVENT = 'render-book';

const books = [];
let editingBookId = null;
let searchKeyword = '';
let searchResultContainer = null;

document.addEventListener('DOMContentLoaded', function () {
	const submitForm = document.getElementById('bookForm');
	const searchForm = document.getElementById('searchBook');
	const searchInput = document.getElementById('searchBookTitle');
	searchResultContainer = document.createElement('div');
	searchResultContainer.id = 'searchResultList';
	searchForm.append(searchResultContainer);

	const loadedBooks = loadBooks();
	for (const loadedBook of loadedBooks) {
		books.push(loadedBook);
	}

	submitForm.addEventListener('submit', function (event) {
		event.preventDefault();
		addBook();
	});

	searchForm.addEventListener('submit', function (event) {
		event.preventDefault();
		searchKeyword = normalizeText(searchInput.value);
		document.dispatchEvent(new Event(RENDER_EVENT));
	});

	searchInput.addEventListener('input', function () {
		searchKeyword = normalizeText(searchInput.value);
		document.dispatchEvent(new Event(RENDER_EVENT));
	});

	updateSubmitButtonText();
	document.dispatchEvent(new Event(RENDER_EVENT));
});

function loadBooks() {
	const savedBooks = localStorage.getItem(STORAGE_KEY);

	if (savedBooks !== null) {
		try {
			const parsedBooks = JSON.parse(savedBooks);
			if (!Array.isArray(parsedBooks)) {
				return [];
			}

			const normalizedBooks = [];
			for (const parsedBook of parsedBooks) {
				normalizedBooks.push(normalizeBookObject(parsedBook));
			}

			localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedBooks));
			return normalizedBooks;
		} catch (error) {
			return [];
		}
	}

	return loadBooksFromHTML();
}

function loadBooksFromHTML() {
	const booksFromHTML = [];
	const bookElements = document.querySelectorAll('#incompleteBookList [data-testid="bookItem"], #completeBookList [data-testid="bookItem"]');

	for (const bookElement of bookElements) {
		const titleElement = bookElement.querySelector('[data-testid="bookItemTitle"]');
		const authorElement = bookElement.querySelector('[data-testid="bookItemAuthor"]');
		const yearElement = bookElement.querySelector('[data-testid="bookItemYear"]');

		const rawTitle = titleElement ? titleElement.innerText : '';
		const rawAuthor = authorElement ? authorElement.innerText : '';
		const rawYear = yearElement ? yearElement.innerText : '';

		const title = rawTitle.replace('Judul:', '').trim();
		const author = rawAuthor.replace('Penulis:', '').replace('Pengarang:', '').trim();
		const year = rawYear.replace('Tahun:', '').trim();
		const isComplete = bookElement.closest('#completeBookList') !== null;
		const id = Number(bookElement.getAttribute('data-bookid')) || generateId();

		booksFromHTML.push(generateBookObject(id, title, author, year, isComplete));
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify(booksFromHTML));
	return booksFromHTML;
}

function saveBooks() {
	const normalizedBooks = books.map(normalizeBookObject);
	localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedBooks));
}

function addBook() {
	const title = document.getElementById('bookFormTitle').value.trim();
	const author = document.getElementById('bookFormAuthor').value.trim();
	const year = document.getElementById('bookFormYear').value.trim();
	const isComplete = document.getElementById('bookFormIsComplete').checked;

	if (title === '' || author === '' || year === '') {
		alert('Harap isi semua data buku terlebih dahulu.');
		return;
	}

	if (editingBookId !== null) {
		const bookTarget = findBook(editingBookId);

		if (bookTarget !== null) {
			bookTarget.title = title;
			bookTarget.author = author;
			bookTarget.year = Number(year);
			bookTarget.isComplete = Boolean(isComplete);
		}
	} else {
		const bookObject = generateBookObject(generateId(), title, author, year, isComplete);
		books.push(bookObject);
	}

	saveBooks();
	document.dispatchEvent(new Event(RENDER_EVENT));

	document.getElementById('bookForm').reset();
	editingBookId = null;
	updateSubmitButtonText();
}

function generateId() {
	return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
	return {
		id: Number(id),
		title,
		author,
		year: Number(year),
		isComplete: Boolean(isComplete),
	};
}

function normalizeBookObject(bookObject) {
	const id = Number(bookObject.id) || generateId();
	const title = String(bookObject.title || '').trim();
	const author = String(bookObject.author || '').trim();
	const year = Number(bookObject.year) || 0;

	let isComplete = false;
	if (typeof bookObject.isComplete === 'boolean') {
		isComplete = bookObject.isComplete;
	} else if (typeof bookObject.isComplite === 'boolean') {
		isComplete = bookObject.isComplite;
	} else if (String(bookObject.isComplete).toLowerCase() === 'true') {
		isComplete = true;
	}

	return generateBookObject(id, title, author, year, isComplete);
}

function makeBook(bookObject) {
	const actionContainer = document.createElement('div');

	const textTitle = document.createElement('h3');
	textTitle.innerText = 'Judul: ' + bookObject.title;
	textTitle.setAttribute('data-testid', 'bookItemTitle');

	const textAuthor = document.createElement('p');
	textAuthor.innerText = 'Pengarang: ' + bookObject.author;
	textAuthor.setAttribute('data-testid', 'bookItemAuthor');

	const textYear = document.createElement('p');
	textYear.innerText = 'Tahun: ' + bookObject.year;
	textYear.setAttribute('data-testid', 'bookItemYear');

	const textStatus = document.createElement('p');
	textStatus.innerText = 'Status: ' + (bookObject.isComplete ? 'Sudah di baca' : 'Belum di baca');

	const textContainer = document.createElement('div');
	textContainer.append(textTitle, textAuthor, textYear, textStatus);

	const completeButton = document.createElement('button');
	completeButton.innerText = bookObject.isComplete ? 'Belum dibaca' : 'Selesai dibaca';
	completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
	completeButton.addEventListener('click', function () {
		toggleBookStatus(bookObject.id);
	});

	const deleteButton = document.createElement('button');
	deleteButton.innerText = 'Hapus Buku';
	deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
	deleteButton.addEventListener('click', function () {
		deleteBook(bookObject.id);
	});

	const editButton = document.createElement('button');
	editButton.innerText = 'Edit Buku';
	editButton.setAttribute('data-testid', 'bookItemEditButton');
	editButton.addEventListener('click', function () {
		editBook(bookObject.id);
	});

	actionContainer.append(completeButton, deleteButton, editButton);

	const container = document.createElement('div');
	container.setAttribute('data-bookid', bookObject.id);
	container.setAttribute('data-testid', 'bookItem');
	container.append(textContainer, actionContainer);

	return container;
}

document.addEventListener(RENDER_EVENT, function () {
	const incompleteBookList = document.getElementById('incompleteBookList');
	const completeBookList = document.getElementById('completeBookList');

	incompleteBookList.innerHTML = '';
	completeBookList.innerHTML = '';

	const filteredBooks = findBooksByTitle(searchKeyword);

	for (const bookItem of filteredBooks) {
		const bookElement = makeBook(bookItem);

		if (bookItem.isComplete) {
			completeBookList.append(bookElement);
		} else {
			incompleteBookList.append(bookElement);
		}
	}

	renderSearchResults(filteredBooks);
});

function normalizeText(text) {
	return text.toLowerCase().trim().replace(/\s+/g, ' ');
}

function findBooksByTitle(keyword) {
	if (keyword === '') {
		return books;
	}

	const results = [];

	for (const bookItem of books) {
		const bookTitle = normalizeText(bookItem.title);

		if (bookTitle.includes(keyword)) {
			results.push(bookItem);
		}
	}

	return results;
}

function renderSearchResults(results) {
	if (searchResultContainer === null) {
		return;
	}

	searchResultContainer.innerHTML = '';

	if (searchKeyword === '') {
		return;
	}

	const matchedBooks = results || findBooksByTitle(searchKeyword);

	if (matchedBooks.length === 0) {
		const emptyInfo = document.createElement('p');
		emptyInfo.className = 'search-result-empty';
		emptyInfo.innerText = 'Tidak ada judul yang cocok.';
		searchResultContainer.append(emptyInfo);
		return;
	}

	for (const bookItem of matchedBooks) {
		const item = document.createElement('button');
		item.className = 'search-result-item';
		item.type = 'button';
		item.addEventListener('click', function () {
			scrollToBookCard(bookItem.id);
		});

		const title = document.createElement('p');
		title.className = 'search-result-title';
		title.innerText = 'Judul: ' + bookItem.title;

		const info = document.createElement('p');
		info.className = 'search-result-info';
		info.innerText = 'Pengarang: ' + bookItem.author + ' | Tahun: ' + bookItem.year;

		item.append(title, info);
		searchResultContainer.append(item);
	}
}

function scrollToBookCard(bookId) {
	const targetCard = document.querySelector('[data-testid="bookItem"][data-bookid="' + Number(bookId) + '"]');

	if (targetCard === null) {
		return;
	}

	targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
	targetCard.classList.remove('book-card-highlight');

	setTimeout(function () {
		targetCard.classList.add('book-card-highlight');
	}, 60);

	setTimeout(function () {
		targetCard.classList.remove('book-card-highlight');
	}, 1700);
}

function toggleBookStatus(bookId) {
	const bookTarget = findBook(bookId);

	if (bookTarget === null) {
		return;
	}

	bookTarget.isComplete = !bookTarget.isComplete;
	saveBooks();
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function deleteBook(bookId) {
	const bookIndex = findBookIndex(bookId);

	if (bookIndex === -1) {
		return;
	}

	books.splice(bookIndex, 1);

	if (editingBookId !== null && Number(editingBookId) === Number(bookId)) {
		document.getElementById('bookForm').reset();
		editingBookId = null;
		updateSubmitButtonText();
	}

	saveBooks();
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function editBook(bookId) {
	const bookTarget = findBook(bookId);

	if (bookTarget === null) {
		return;
	}

	editingBookId = Number(bookId);
	document.getElementById('bookFormTitle').value = bookTarget.title;
	document.getElementById('bookFormAuthor').value = bookTarget.author;
	document.getElementById('bookFormYear').value = bookTarget.year;
	document.getElementById('bookFormIsComplete').checked = bookTarget.isComplete;
	document.getElementById('bookFormTitle').focus();
	updateSubmitButtonText();
}

function findBook(bookId) {
	return books.find(function (bookItem) {
		return Number(bookItem.id) === Number(bookId);
	}) || null;
}

function findBookIndex(bookId) {
	return books.findIndex(function (bookItem) {
		return Number(bookItem.id) === Number(bookId);
	});
}

function updateSubmitButtonText() {
	const submitButton = document.getElementById('bookFormSubmit');
	const checked = document.getElementById('bookFormIsComplete').checked;
	const statusText = checked ? 'Selesai dibaca' : 'Belum selesai dibaca';

	if (editingBookId !== null) {
		submitButton.innerHTML = 'Simpan Perubahan <span>' + statusText + '</span>';
		return;
	}

	submitButton.innerHTML = 'Masukkan Buku ke rak <span>' + statusText + '</span>';
}

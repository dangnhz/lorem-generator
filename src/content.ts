import { generateHTMLDocument, generateSentence, generateParagraphs } from './lipsum';
import { debounce, getRandomNumber } from './utils';

const generateUniqueId = () => `editor_${Math.random().toString(36).substr(2, 9)}`;

const createContextBox = (editorElement: HTMLElement) => {
	const contextBox = document.createElement('div');
	contextBox.className = 'lorem-ipsum-context-box';
	contextBox.innerHTML = `
		<input type="number" class="lorem-ipsum-word-count" min="1" value="20" />
		<button type="button" class="lorem-ipsum-generate">Generate</button>
	`;
	editorElement.appendChild(contextBox);

	const generateButton = contextBox.querySelector('.lorem-ipsum-generate');
	generateButton?.addEventListener('click', (e) => {
		e.preventDefault();
		const input = contextBox.querySelector('.lorem-ipsum-word-count') as HTMLInputElement;
		const wordCount = parseInt(input?.value, 10);
		if (wordCount) {
			const htmlText = generateHTMLDocument();
			chrome.runtime.sendMessage({
				action: 'find-and-insert-to-ckeditor-instance',
				editorId: editorElement.id,
				htmlContent: htmlText,
			});
			contextBox.style.display = 'none';
		}
	});

	return contextBox;
};

const createLoremIpsumContextBox = (editorElement: HTMLElement) => {
	const contextBox = createContextBox(editorElement);
	contextBox.classList.add('lorem-ipsum-context-box');

	const randomNumber = getRandomNumber();

	contextBox.innerHTML = `
		<button type="button" class="lorem-ipsum-floating-button">L</button>
		<div class="lorem-ipsum-form">
			<button type="button" class="lorem-ipsum-close-button">&#x2715;</button>
			<div class="lorem-ipsum-form-group lorem-ipsum-output-type-group">
				<label for="output-type-${randomNumber}">Output type:</label>
				<select id="output-type-${randomNumber}">
					<option value="sentence">Sentence</option>
					<option value="paragraph" selected>Paragraph</option>
					<option value="document">HTML document</option>
				</select>
			</div>

			<div class="lorem-ipsum-form-group lorem-ipsum-word-count-group">
				<label for="range-slider-${randomNumber}"><span class="label-text">Number of paragraphs:</span> <span class="range-value">5</span></label>
				<input type="range" id="range-slider-${randomNumber}" min="1" max="100" value="5">
			</div>

			<button type="button" class="lorem-ipsum-generate-button">Generate</button>
		</div>
	`;
	editorElement.appendChild(contextBox);

	// Get references to DOM elements
	const floatingButton = contextBox.querySelector('.lorem-ipsum-floating-button') as HTMLButtonElement;
	const loremIpsumForm = contextBox.querySelector('.lorem-ipsum-form') as HTMLFormElement;
	const closeButton = contextBox.querySelector('.lorem-ipsum-close-button') as HTMLButtonElement;
	const outputTypeSelect = contextBox.querySelector('.lorem-ipsum-output-type-group select') as HTMLSelectElement;
	const rangeSlider = contextBox.querySelector('.lorem-ipsum-word-count-group input') as HTMLInputElement;
	const itemsLabel = contextBox.querySelector('.lorem-ipsum-word-count-group label .label-text') as HTMLElement;
	const rangeValue = contextBox.querySelector('.lorem-ipsum-word-count-group .range-value') as HTMLElement;
	const rangeSliderContainer = contextBox.querySelector('.lorem-ipsum-word-count-group') as HTMLElement;
	const generateBtn = contextBox.querySelector('.lorem-ipsum-generate-button') as HTMLButtonElement;


	floatingButton.addEventListener('click', (e) => {
		e.preventDefault();
		loremIpsumForm.style.display = 'block';
	});

	closeButton.addEventListener('click', () => {
		loremIpsumForm.style.display = 'none';
	});

	// Update the number of items label and visibility based on output type
	outputTypeSelect?.addEventListener('change', function () {
		const selectedType = outputTypeSelect?.value;

		if (selectedType === 'sentence') {
			itemsLabel.textContent = 'Number of words:';
			rangeSliderContainer.style.display = 'block';
		} else if (selectedType === 'paragraph') {
			itemsLabel.textContent = 'Number of paragraphs:';
			rangeSliderContainer.style.display = 'block';
		} else if (selectedType === 'document') {
			rangeSliderContainer.style.display = 'none';
		}
	});

	// Update the range value display when slider is moved
	rangeSlider.addEventListener('input', function () {
		rangeValue.textContent = rangeSlider.value;
	});

	// Generate Lorem Ipsum when the button is clicked
	generateBtn.addEventListener('click', function () {
		const selectedType = outputTypeSelect?.value;
		const rangeValue = parseInt(rangeSlider.value);

		let loremText = '';

		if (selectedType === 'sentence') {
			loremText = generateSentence(rangeValue);
		} else if (selectedType === 'paragraph') {
			loremText = generateParagraphs(rangeValue);
		} else if (selectedType === 'document') {
			loremText = generateHTMLDocument();
		}

		chrome.runtime.sendMessage({
			action: 'find-and-insert-to-ckeditor-instance',
			editorId: editorElement.id,
			htmlContent: loremText,
		});

		loremIpsumForm.style.display = 'none';

	});

	document.addEventListener('click', (e) => {
		if (!contextBox.contains(e.target as Node)) {
			loremIpsumForm.style.display = 'none';
		}
	});

	return contextBox;
};

const insertLoremIpsumContextBox = (editorElement: HTMLElement) => {
	if (editorElement.dataset.loremIpsumButton) return;


	const contextBox = createLoremIpsumContextBox(editorElement);



	editorElement.appendChild(contextBox);
	editorElement.dataset.loremIpsumButton = 'true';


};

const handleEditorFocus = (editorElement: HTMLElement) => {
	if (!editorElement.dataset.loremIpsumButton) {
		insertLoremIpsumContextBox(editorElement);
	}
};

const attachFocusListeners = () => {
	const editors = document.querySelectorAll('div.ck-editor__main:not([data-lorem-ipsum-listener])') as NodeListOf<HTMLElement>;
	editors.forEach((editor) => {
		const editorId = generateUniqueId();
		editor.id = editorId;
		const editableElement = editor.querySelector('.ck-editor__editable');

		if (editableElement) {
			editableElement.addEventListener('focus', () => handleEditorFocus(editor as HTMLElement));
			editor.dataset.loremIpsumListener = 'true';
		}
	});
};

// Run when the page loads
attachFocusListeners();

// Use a debounced version of attachFocusListeners for the MutationObserver
const debouncedAttachListeners = debounce(attachFocusListeners, 250);

// Run when new content is added to the page
const observer = new MutationObserver(debouncedAttachListeners);
observer.observe(document.body, { childList: true, subtree: true });

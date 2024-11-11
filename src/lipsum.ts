import { getRandomNumberBetween, parseString } from './utils';

const sourceString =
	'lorem ipsum dolor sit amet consectetur adipiscing elit integer nec odio praesent libero sed cursus ante dapibus diam nisi nulla quis sem at nibh elementum imperdiet duis sagittis mauris fusce tellus augue semper porta massa vestibulum lacinia arcu eget class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos curabitur sodales ligula in dignissim nunc tortor pellentesque aenean quam scelerisque maecenas mattis convallis tristique proin ut vel egestas porttitor morbi lectus risus iaculis suscipit luctus non ac turpis aliquet metus ullamcorper tincidunt euismod quisque volutpat condimentum velit nam urna neque a facilisi fringilla suspendisse potenti feugiat mi consequat sapien etiam ultrices justo eu magna lacus vitae pharetra auctor interdum primis faucibus orci et posuere cubilia curae molestie dui blandit congue pede facilisis laoreet donec viverra malesuada enim est pulvinar sollicitudin cras id nisl felis venenatis commodo ultricies accumsan pretium fermentum nullam purus aliquam mollis vivamus consectetuer si leo eros maximus gravida erat letius ex hendrerit lobortis tempus rutrum efficitur phasellus natoque penatibus magnis dis parturient montes nascetur ridiculus mus vehicula bibendum vulputate dictum finibus eleifend rhoncus placerat tempor ornare hac habitasse platea dictumst habitant senectus netus fames';

const wordList = parseString(sourceString);

// Helper function to generate a single Lorem Ipsum sentence
export function generateSentence(wordCount: number) {
	let sentence = [];
	for (let i = 0; i < wordCount; i++) {
		const randomIndex = Math.floor(Math.random() * wordList.length);
		sentence.push(wordList[randomIndex]);
	}

	let sentenceStr = sentence.join(' ');
	sentenceStr = randomizePunctuation(sentenceStr);

	let finalSentence = sentenceStr + '.';
	return finalSentence.charAt(0).toUpperCase() + finalSentence.slice(1);
}

// Function to randomize punctuation (only commas and periods)
function randomizePunctuation(sentence: string) {
	const words = sentence.split(' ');
	let punctuationAdded = false;

	for (let i = 1; i < words.length - 1; i++) {
		if (!punctuationAdded && Math.random() > 0.9) {
			words[i] += ',';
			punctuationAdded = true;
			break;
		}
	}

	return words.join(' ');
}

export function generateParagraphs(paragraphCount: number) {
	let paragraphs = [];
	for (let i = 0; i < paragraphCount; i++) {
		let sentenceCount = getRandomNumberBetween(3, 10);
		let numberOfWordPerSentence = getRandomNumberBetween(6, 15);
		let sentences = [];
		for (let j = 0; j < sentenceCount; j++) {
			let sentence;

			if (i == 0 && j == 0) {
				sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
			} else {
				sentence = generateSentence(numberOfWordPerSentence);
			}

			sentences.push(sentence);
		}
		paragraphs.push(`<p>${sentences.join(' ')}</p>`);
	}
	return paragraphs.join('\n');
}

// Function to generate headings, paragraphs, links, and lists in a full document
export function generateHTMLDocument() {
	let documentContent = [];

	const random = getRandomNumberBetween(1, 4);

	// Generate headings
	for (let i = 1; i <= 6; i++) {
		documentContent.push(`<h${i}>Heading ${i}</h${i}>`);
		documentContent.push(generateParagraphs(getRandomNumberBetween(5, 15)));

		if (random == i) {
			// Generate links (internal and external)
			let linkText = generateSentence(getRandomNumberBetween(1, 5)).toLowerCase().replace('.', '');
			documentContent.push(`<p>Lorem ipsum <a href="https://www.example.com">${linkText}</a> dolor sit amet.</p>`);

			linkText = generateSentence(getRandomNumberBetween(1, 8)).toLowerCase().replace('.', '');
			documentContent.push(`<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, quisquam alias. Illum dicta eligendi <a href="/">${linkText}</a> magni quisquam. Vero, quam. Adipisci odit sint quia praesentium deserunt</p>`);

			// Generate unordered list
			documentContent.push('<ul>');
			for (let i = 0; i < getRandomNumberBetween(2, 5); i++) {
				documentContent.push(`<li>${generateSentence(getRandomNumberBetween(4, 20))}</li>`);
			}
			documentContent.push('</ul>');

			documentContent.push(generateParagraphs(getRandomNumberBetween(3, 7)));

			// Generate ordered list
			documentContent.push('<ol>');
			for (let i = 0; i < getRandomNumberBetween(2, 5); i++) {
				documentContent.push(`<li>${generateSentence(getRandomNumberBetween(4, 15))}</li>`);
			}
			documentContent.push('</ol>');

			documentContent.push(generateParagraphs(getRandomNumberBetween(1, 3)));
		}
	}

	return documentContent.join('\n');
}

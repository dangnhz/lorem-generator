# Lorem Ipsum Generator Chrome Extension

This Chrome extension provides a convenient way to generate and insert Lorem Ipsum text into CKEditor instances on web pages. It offers customizable options for generating sentences, paragraphs, or full HTML documents with Lorem Ipsum content.

## Features

- Generate Lorem Ipsum text in three formats:
  - Sentences
  - Paragraphs
  - Full HTML documents
- Customizable word/paragraph count
- Seamless integration with CKEditor
- Dark mode support

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Navigate to a webpage with a CKEditor instance.
2. Focus on the CKEditor field.
3. A floating "L" button will appear in the bottom-left corner of the editor.
4. Click the "L" button to open the Lorem Ipsum generator interface.
5. Choose the output type (sentence, paragraph, or document).
6. Adjust the word/paragraph count using the slider (if applicable).
7. Click "Generate" to insert the Lorem Ipsum text into the editor.

## Development

This project uses Vite for building and TypeScript for type-checking. The main files are:

- `src/content.ts`: Content script that injects the Lorem Ipsum generator interface
- `src/background.ts`: Background script for handling messages and inserting content
- `src/lipsum.ts`: Lorem Ipsum text generation logic
- `src/utils.ts`: Utility functions
- `src/style.scss`: Styles for the generator interface

To set up the development environment:

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build the extension:
   ```
   npm run build
   ```

## Configuration

The extension's manifest is located in `public/manifest.json`. You can modify permissions, content scripts, and other extension settings here.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).


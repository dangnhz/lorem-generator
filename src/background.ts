interface ElementWithCKEditor extends Element {
	ckeditorInstance?: any;
  }

  type Request = {
	action: string;
	editorId: string;
	htmlContent: string;
  }

function setEditorContent(editorId: string, htmlContent: string) {
	const domElement = document.querySelector(`.ck-editor__main#${editorId} > .ck-editor__editable`);

	const editor = (domElement as ElementWithCKEditor)?.ckeditorInstance;

	console.log(editor);

	if (editor) {

		
const viewFragment = editor.data.processor.toView( htmlContent );
const modelFragment = editor.data.toModel( viewFragment );

editor.model.insertContent( modelFragment );


	} else {
		console.log("Couldn't find the editor instance");
	}
}

function handleMessage(request:Request) {

	if (request.action === 'find-and-insert-to-ckeditor-instance') {
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			const tabId = tabs[0].id as number;

			chrome.scripting.executeScript({
				target: { tabId: tabId },
				world: 'MAIN', //undefined for Firefox?
				func: setEditorContent,
				args: [request.editorId, request.htmlContent]
			});
		});
	}
}

chrome.runtime.onMessage.addListener(handleMessage);

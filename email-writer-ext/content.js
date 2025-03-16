console.log("Email Writer Extension - Content Script Loaded");

// The function below shows the copy of the gmail send button.
function createAIButton(){
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI reply');
    return button;
    

}

function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        'gmail_quote',
        '[role="presentation"]'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content){
            return  content.innerText.trim();
        }
        return '';
            
        }
    }

function findComposeToolbar(){
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        // The one below shows alternative toolbar class that Gmail might use.
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar){
            return  toolbar;
        }
        return null;
            
        }
    }

function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton)existingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found");
        return;
    }

    console.log("Toolbar found, creating AI button");
    const button = createAIButton();
    //When adding classList, don't need . in front of ai
    //If adding . here it causes two AI reply button created.
    button.classList.add('ai-reply-button');
    
    button.addEventListener('click', async () => {
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            // fetch API from backend URL.
            const response = await fetch('http://localhost:8080/api/email/generate', {
                // indicates method as POST.
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional"
                })
            })

            if (!response.ok){
                throw new Error('API Request Failed');
            }

            const generatedReply = await response.text();
            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if (composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error ('Compose box was not found');
            }
            
        } catch (error) {
            console.error (error);
            alert ('Failed to generate reply');
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

// MutationsObserver observes what changes to the Document Object Model (DOM) in the website.
//DOM is the structure of the HTML code of a web page.
// mutations have the list of changes that have occurred in the browser.
//(mutations) => {...} is a call back functions
const observer = new MutationObserver((mutations) => {
    // mutations is an array and  (pre-defined) stands for a change in the DOM.
    for (const mutation of mutations) {
    // inside the from parenthesis, use addedNodes method of mutation which is 
    // variable of MutationRecord and this is the NordList object and covert 
    // it into array with Array.from methods, finally it stores in addedNodes variable 
    // NordList is a collection of DOM nodes and it is type of Object(need to 
    // be converted to JavaScript Array)
        const addedNodes = Array.from(mutation.addedNodes);
        //some is JavaScript method to check if at least one node in the array meets
        //a specific condition (node.nodeType === Node.ELEMENT_NODE).
        const hasComposeElements = addedNodes.some(node =>
        //Check if node is an element node (HTML node) or not (not text or comment)
            node.nodeType === Node.ELEMENT_NODE &&
        // querySelector helps us check if any of the children matches these selector
        // It first checks the node directly for efficiency.
        // Then, it explores the node's descendants to capture cases where the target element is contained within.
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if (hasComposeElements){
            console.log("Compose Window Detected"); 
            //to show small delay to ensure the Gmail compose elemente are fully loaded
            //before trying to add the AI button (500 millisecond).
            setTimeout(injectButton, 500);
        }
    }
});

// .observe(target, options)
observer.observe(document.body, {
    // We need to check children and their descendants too.
    childList: true,
    subtree: true
})
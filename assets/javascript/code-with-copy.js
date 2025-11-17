window.copyCode = async function (button) {
  const codeEl = button.parentElement.querySelector("pre code");
  if (!codeEl) return;

  const text = codeEl.textContent.trim();

  copyTextToClipboard(text, button)
};

async function copyTextToClipboard(text, button) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, button);
    return;
  }
  
  await navigator.clipboard.writeText(text).then(function() {
    showIconChange(button)

  }, function(err) {
    console.error('Async: Could not copy text: ', err);

  });
}

function fallbackCopyTextToClipboard(text, button) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    if (successful) {
      showIconChange(button)
    } else {
      console.log('Fallback: Copying text command was unsuccessful');
    }

  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);

  }

  document.body.removeChild(textArea);
}

function showIconChange(button) {
  button.classList.add("copied");
  button.title = "Copied!";
  setTimeout(() => {
    button.classList.remove("copied");
    button.title = "Copy";
  }, 1200);
}
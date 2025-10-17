window.copyCode = async function (button) {
  const codeEl = button.parentElement.querySelector("pre code");
  if (!codeEl) return;

  const text = codeEl.textContent.trim();
  try {
    await navigator.clipboard.writeText(text);
    button.classList.add("copied");
    button.title = "Copied!";
    setTimeout(() => {
      button.classList.remove("copied");
      button.title = "Copy";
    }, 1200);
  } catch {
    console.error("Copy failed");
  }
};
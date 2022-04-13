const TARGET_IMAGE_SRC =
  "/assets/illustrations/merge_requests-1738c3fb756b2ac9ba09ef3b74a57da591130e07c26923fc72072d25ff1b7a6c.svg";

// The body of this function will be executed as a content script inside the current page
const findAndSetMeme = (targetImgSrc, memeSrc) => {
  const images = Array.from(document.getElementsByTagName("img"));
  const targetImage = images.find((image) => image.src.includes(targetImgSrc));
  if (targetImage?.src) targetImage.src = memeSrc;
};

const applyIfPageIsGitlab = async ({ url, id }) => {
  if (url.startsWith("https://gitlab") || url.startsWith("http://gitlab")) {
    const imgURL = chrome.runtime.getURL("memes/meme-1.jpg");

    chrome.scripting.executeScript({
      target: { tabId: id },
      function: findAndSetMeme,
      args: [TARGET_IMAGE_SRC, imgURL],
    });
  }
};

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") applyIfPageIsGitlab(tab);
});

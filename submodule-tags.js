// https://stackoverflow.com/a/61511955/894166
function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function getProjectIdFromUrl(url) {
    return url.replace(/\/-\/tree\/.*$/, '').replace(/^.*gitlab.com\//, '');
}

function getTagForCommit(projectId, commitShortId) {
  return new Promise(resolve => {
    fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/tags?per_page=100`)
      .then(response => response.json()).then(tags => {
        try {
          const submoduleHeadTag = tags.filter(tag =>
            // TODO maybe use long ID from URL?
            tag.commit.short_id == commitShortId
          )[0];
          console.log(projectId, commitShortId, submoduleHeadTag.name, submoduleHeadTag);
          resolve(submoduleHeadTag.name);
        } catch (e) {
          console.log(projectId, commitShortId, tags, e);
        }
      });
  });
}


// in the main project page file browser
waitForElement('.tree-item').then(elm => {
  for (link of document.getElementsByClassName('commit-sha')) {
    const projectId = getProjectIdFromUrl(link.href)
    const commitShortId = link.text;
    const thisLink = link;
    getTagForCommit(projectId, commitShortId).then(tag => {
      thisLink.text = tag;
    });
  }
});

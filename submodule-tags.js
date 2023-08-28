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

function getTagForCommit(projectId, commitId) {
  return new Promise(resolve => {
    fetch(`https://gitlab.com/api/v4/projects/${encodeURIComponent(projectId)}/repository/tags?per_page=100`)
      .then(response => response.json()).then(tags => {
        try {
          const submoduleHeadTag = tags.filter(tag => {
            if (commitId.length == 8) {
              return tag.commit.short_id == commitId;
            } else {
              return tag.commit.id == commitId;
            }
          })[0];
          console.log(projectId, commitId, submoduleHeadTag.name, submoduleHeadTag);
          resolve(submoduleHeadTag.name);
        } catch (e) {
          console.log(projectId, commitId, tags, e);
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

// in MR diff viewer
waitForElement('.diff-files-holder').then(elm => {
  for (file of document.getElementsByClassName('diff-file')) {
    // changed file header
    const title = file.getElementsByClassName('file-header-content')[0];
    const link = title.getElementsByTagName('a')[0];
    const projectId = getProjectIdFromUrl(link.href);
    const fileName = link.getElementsByClassName('file-title-name')[0];
    const commitShortId = fileName.innerText.trim().match(/[0-9a-f]{8}$/)[0]
    // text replace at end of function

    // diff content subproject commit
    const old = file.getElementsByClassName('diff-td line_content old')[0];
    const oldDiff = old.getElementsByClassName('idiff deletion')[0]
    const oldCommit = oldDiff.innerText
    if (oldCommit !== undefined) {
      getTagForCommit(projectId, oldCommit).then(tag => {
        old.firstChild.data = old.firstChild.data.replace('commit', 'tag');
        oldDiff.innerText = `${tag} (commit ${oldCommit})`;
      })
    }

    const new_ = file.getElementsByClassName('diff-td line_content new')[0];
    const newDiff = new_.getElementsByClassName('idiff addition')[0]
    const newCommit = newDiff.innerText

    if (commitShortId !== null) {
      getTagForCommit(projectId, commitShortId).then(tag => {
        // changed file header
        fileName.innerText = fileName.innerText.replace(commitShortId, tag);

        // diff content subproject commit
        new_.firstChild.data = old.firstChild.data.replace('commit', 'tag');
        newDiff.innerText = `${tag} (commit ${newCommit})`;
      });
    }
  }
});


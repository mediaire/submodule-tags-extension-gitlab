.DEFAULT_TARGET: extensions
.PHONY: extensions
extensions: gitlab-submodule-tags_firefox.zip gitlab-submodule-tags_chrome.zip

gitlab-submodule-tags_firefox.zip: manifest_firefox.json submodule-tags.js img/icon.svg img/icon-32.png img/icon-64.png img/icon-128.png
	cp manifest_firefox.json manifest.json
	zip -r -FS ./gitlab-submodule-tags_firefox.zip manifest.json submodule-tags.js img/icon.svg img/icon-*.png
	rm manifest.json

gitlab-submodule-tags_chrome.zip: manifest_chrome.json submodule-tags.js img/icon-32.png img/icon-64.png img/icon-128.png
	cp manifest_chrome.json manifest.json
	zip -r -FS ./gitlab-submodule-tags_chrome.zip manifest.json submodule-tags.js img/icon-*.png
	rm manifest.json

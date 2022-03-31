.DEFAULT_TARGET: extension
.PHONY: extension
extension: gitlab-submodule-tags.zip

gitlab-submodule-tags.zip: manifest.json submodule-tags.js
	zip -r -FS ./gitlab-submodule-tags-extension.zip manifest.json submodule-tags.js

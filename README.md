# Gitlab Submodule Tags Browser Extension
Show target tag names instead of commit hashes for submodules in Gitlab.

[![Get the Firefox Addon](https://extensionworkshop.com/assets/img/documentation/publish/get-the-addon-178x60px.dad84b42.png)](https://addons.mozilla.org/en-US/firefox/addon/gitlab-submodule-tags/)

![screenshot](img/screenshot.png)


## Development
Load the extension via `about:debugging` as described
[here][mozilla_first_extension].

### Installation
_Unfortunately this [does not work][mozilla_addon_signing] in the branded
Release versions of Firefox._

1. Turn off signature verification for extensino installs (and be aware of the
   associated risks): in `about:config` set `xpinstall.signatures.requred` to
   `false`.
2. Create a packaged extension `gitlab-submodules-tags-extension.zip` using
   `make extension`.
3. Drag the ZIP file into `about:addons`

## TODO
- Gitlab API pagingation (currently only works if the checked out commit is in
  the latest 100 commits)
- If possible, find the associated branch name as well
- Icon
- Publish chrome version


[mozilla_first_extension]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#trying_it_out
[mozilla_addon_signing]: https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users

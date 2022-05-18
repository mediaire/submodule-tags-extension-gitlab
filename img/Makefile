file_icons.svg:
	wget https://gitlab.com/gitlab-org/gitlab/-/raw/master/app/assets/images/file_icons.svg

label.svg:
	wget https://gitlab.com/gitlab-org/gitlab-svgs/-/raw/main/sprite_icons/label.svg

folder-git.svg: file_icons.svg
	# TODO copied xml manually

icon.svg: folder-git.svg label.svg
	# TODO currently manual using inkscape
	# convert \
	# 	-background none \
	# 	-page +0+0 folder-git.svg \
	# 	-page -5+6 label.svg \
	# 	-layers merge \
	# 	+repage \
	# 	icon.png

icon:
	inkscape -w $(SIZE) -h $(SIZE) icon.svg -d 300 -e icon-$(SIZE).png

icons: icon-128.png
	$(MAKE) icon SIZE=128
	$(MAKE) icon SIZE=64
	$(MAKE) icon SIZE=32

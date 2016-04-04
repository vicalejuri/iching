PROJECT_PATH=/Users/frangossauro/workspace/projects/react-iching/

ADDRESS=14Cfnhat4wniiSAtk7vx6qKreo3qteBvEb
ZERO_PATH=/Users/frangossauro/workspace/Codes/ZeroNet

MOBILE_PROJECT_PATH=/Users/frangossauro/workspace/mobile_apps/xyz.frangossauro.iching/iching/www/

build:
	gulp build

build_dist:
	gulp build:dist;
	cp src/public/img/tarot/* dist/assets/img/tarot/;
	sed -i -e 's/\/public\///g' dist/assets/main.css

gh-publish: build_dist
	echo "Done. Cloning into /tmp/react-iching"
	cp -R dist/ /tmp/dist/ ;
	git clone . /tmp/react-iching ; \
	git remote add gh git@github.com:barrabinfc/react-iching.git ; \
	echo "Branch gh-pages"; \
	cd /tmp/react-iching ; git checkout gh-pages ; \
	echo "Copying dist files"; \
	cp -R /tmp/dist/* /tmp/react-iching/ ; \
	git add * ; git commit -m 'Publishing' ; \
	echo "Publishing"; \
	git push origin gh-pages ; \
	git push gh gh-pages ; \
	echo "Done"


copy_files:
	rsync -avz --exclude-from '.ignore' --progress $(PROJECT_PATH)/dist/ $(ZERO_PATH)/data/$(ADDRESS)

watch:
	watchmedo shell-command --command="make copy_files" --patterns="*.html;*.js;*.coffee;*.css" --recursive $(PROJECT_PATH)

serve:
	make watch & \
	zeronet --debug;

zero-sign:
	zeronet siteSign $(ADDRESS);

zero-publish:
	zeronet sitePublish $(ADDRESS);

zero-release: copy_files zero-sign zero-publish
	@echo "all done"

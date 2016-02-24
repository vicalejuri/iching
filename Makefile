build:
	gulp build

build_dist:
	gulp build:dist;
	cp src/public/img/tarot/* dist/assets/img/tarot/;
	sed -i -e 's/\/public\///g' dist/assets/main.css

publish: build_dist
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

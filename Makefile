build:
	gulp build

publish:
	echo "Building project"
	gulp build:dist
	echo "Done. Copying tarot cards"
	cp src/public/img/tarot/* dist/assets/img/tarot/
	echo "Done. Cloning into /tmp/react-iching"
	cp dist/ /tmp/dist/
	git clone . /tmp/react-iching ; \
	echo "Branch gh-pages"; \
	cd /tmp/react-iching ; git checkout gh-pages ; \
	echo "Copying dist files"; \
	cp -R /tmp/dist/* /tmp/react-iching/ ; \
	git add * ; git commit -m 'Publishing' ; \
	echo "Committing"; \
	git push origin gh-pages ; \
	echo "Publishing"; \
	echo "Done"

move-item -path docs/prototype/ -destination temp/
ng build --prod --output-path docs --base-href /interfaces/
copy-item -path docs/index.html -destination docs/404.html
move-item -path temp/ -destination docs/prototype/
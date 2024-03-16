
git add .
echo "message to commit: "
read message
git commit -am "$message"
git push

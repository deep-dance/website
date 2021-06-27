#!/bin/bash

hugo
rsync -rv public/ _live/
cd _live/
git add .
git commit -m "Update."
git push
cd ..
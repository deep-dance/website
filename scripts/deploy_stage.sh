#!/bin/bash

hugo
rsync -rv public/ _stage/
cd _stage/
git add .
git commit -m "Update."
git push
cd ..
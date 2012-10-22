#!/bin/sh
#
#  OKShadow by OKFocus
#  http://okfoc.us // @okfocus
#  Copyright 2012 OKFocus
#  Licensed under the MIT License
#
# We minify using the Closure Compiler.
# http://code.google.com/closure/compiler/

java -jar ~/bin/closure/compiler.jar --js=okshadow.js --js_output_file=okshadow.closure.js
cat PREAMBLE okshadow.closure.js > okshadow.min.js
rm okshadow.closure.js



#!/bin/bash
(
    head -n 6 okshadow.js
    curl --data-urlencode 'js_code@okshadow.js' \
        --data 'output_info=compiled_code' \
          http://closure-compiler.appspot.com/compile 
) > okshadow.min.js



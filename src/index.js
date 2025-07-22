import { dynamicModules } from './dynamic_modules'

import('./render').then(exports => {
    exports.render()
})

function loadLame() {
    return dynamicModules.lame()
}

loadLame()

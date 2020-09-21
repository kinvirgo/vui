import Hover from "./hover";
import Overlay from "./overlay";
import Picker from "./picker";
import Message from "./message";

import "./index.scss";

const install = (Vue, options) => {
    Vue.prototype.$VUI = {
        zIndex: (options || {}).zIndex || 2000,
    };

    let components = [Hover, Overlay, Picker, Message];
    components.forEach((component) => {
        if (component.install) {
            Vue.use(component);
        }
    });
};

if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export { Hover, Overlay, Picker, Message };

export default {
    install,
};

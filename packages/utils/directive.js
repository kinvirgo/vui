import { isFunction, defReadonly } from "./";

export const toDirective = (Directive) => {
    return {
        bind: Directive,
        update: Directive,
    };
};

export const createNamespace = (name) => {
    return (Directive) => {
        // if (isFunction(Directive)) {
        //     Directive = toDirective(Directive);
        // }
        // Directive.name = name;
        defReadonly(Directive, 'name', name);
        return Directive;
    };
};

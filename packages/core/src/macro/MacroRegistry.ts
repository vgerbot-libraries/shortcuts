import { KeyboardEventMatcher } from '../matcher/KeyboardEventMatcher';

export interface MacroRegistry {
    register(pattern: string, matcher: KeyboardEventMatcher): void;
    exists(pattern: string): boolean;
    get(pattern: string): KeyboardEventMatcher | undefined;
    getAllPatterns(): string[];
}

class EmptyMacroRegistry implements MacroRegistry {
    register(): void {
        //
    }
    exists(): boolean {
        return false;
    }
    get(): KeyboardEventMatcher | undefined {
        return;
    }
    getAllPatterns(): string[] {
        return [];
    }
}

export class MacroRegistryImpl implements MacroRegistry {
    private patternsMap: Map<string, KeyboardEventMatcher> = new Map();
    constructor(
        private readonly parent: MacroRegistry = new EmptyMacroRegistry()
    ) {}
    register(pattern: string, matcher: KeyboardEventMatcher): void {
        this.patternsMap.set(pattern, matcher);
    }
    exists(pattern: string): boolean {
        return this.patternsMap.has(pattern) || this.parent.exists(pattern);
    }
    get(pattern: string): KeyboardEventMatcher | undefined {
        if (this.patternsMap.has(pattern)) {
            return this.patternsMap.get(pattern);
        }
        return this.parent.get(pattern);
    }
    getAllPatterns(): string[] {
        const allParentPatterns = this.parent.getAllPatterns();
        const allPatterns = allParentPatterns.concat(
            Array.from(this.patternsMap.keys())
        );
        return Array.from(new Set(allPatterns));
    }
}

export const DEFAULT_MACRO_REGISTRY = new MacroRegistryImpl();

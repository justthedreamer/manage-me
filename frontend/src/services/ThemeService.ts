import type {Theme} from "../model/enums/Themes.ts";

export interface ThemeService {
    restoreTheme(): void;

    setTheme(theme: Theme): void;

    getTheme(): Theme;
}

function restoreTheme(): void {
    const theme = getTheme()
    setTheme(theme);
}

function setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    document.body.setAttribute("data-bs-theme", theme)
}

function getTheme(): Theme {
    const theme = localStorage.getItem('theme') as Theme;
    return theme.replace(/"/g, "") as Theme
}

const themeService: ThemeService = {
    restoreTheme,
    setTheme,
    getTheme,
}

export default themeService;
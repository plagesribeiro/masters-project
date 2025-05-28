// place files you want to import through the `$lib` alias in this directory.
export { default as Footer } from './Footer.svelte';
export { default as ThemeToggle } from './ThemeToggle.svelte';
export { default as Toast } from './Toast.svelte';
export { default as Navbar } from './Navbar.svelte';
export { default as LanguageToggle } from './LanguageToggle.svelte';

// Chat components
export { default as ChatHeader } from './chat/ChatHeader.svelte';
export { default as ChatMessage } from './chat/ChatMessage.svelte';
export { default as ChatInput } from './chat/ChatInput.svelte';

// Workflow
export * from './workflow';

// i18n
export { t, currentLanguage, initializeLanguage, setLanguage } from './i18n';

import { useState, useCallback } from 'react';
import { useTranslation } from './useTranslation';

interface PageContent {
  title: string;
  mainText: string;
}

const defaultContent: PageContent = {
  title: 'Frontend Development: Crafting Seamless Digital Experiences',
  mainText: `React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
Declarative views make your code more predictable and easier to debug.
Build encapsulated components that manage their own state, then compose them to make complex UIs.
Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.
We don't make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.
React can also render on the server using Node and power mobile apps using React Native.`,
};

export const usePageTranslation = () => {
  const [pageContent, setPageContent] = useState<PageContent>(defaultContent);
  const { translateText, isLoading: isTranslating } = useTranslation();

  const translatePageContent = useCallback(
    async (targetLang: string) => {
      if (targetLang === 'en') {
        setPageContent(defaultContent);
        return;
      }

      const [title, mainText] = await Promise.all([
        translateText(defaultContent.title, targetLang, 'en'),
        translateText(defaultContent.mainText, targetLang, 'en'),
      ]);

      setPageContent({
        title: title?.text ?? defaultContent.title,
        mainText: mainText?.text ?? defaultContent.mainText,
      });
    },
    [translateText]
  );

  return {
    pageContent,
    translatePageContent,
    isTranslating,
  };
};

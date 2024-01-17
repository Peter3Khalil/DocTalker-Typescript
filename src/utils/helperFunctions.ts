import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

type ClassValue = string | number | boolean | null | undefined;

type ClassArray = ClassValue[];

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

type ClassNamesInput = ClassValue | ClassArray | ClassDictionary;

const flattenClassNames = (classes: ClassNamesInput): string[] => {
  if (typeof classes === 'string') {
    return [classes];
  }

  if (Array.isArray(classes)) {
    return classes.flatMap(flattenClassNames);
  }

  if (typeof classes === 'object' && classes !== null) {
    return Object.keys(classes).filter((key) => classes[key]);
  }

  return [];
};

export const cn = (...args: ClassNamesInput[]): string => {
  const flattenedClasses = args.flatMap(flattenClassNames);
  const mergedClasses = twMerge(clsx(...flattenedClasses));
  return mergedClasses;
};

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(
    function () {
      console.log('Copying to clipboard was successful!');
    },
    function (err) {
      console.error('Could not copy text: ', err);
    },
  );
}

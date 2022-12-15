import { Terminal as XtermTerminal } from "xterm";
import { useEffect, useRef, useState } from "react";

import DefaultCode from "../data/DefaultCode";

const parseWord = (word: string) => {
  if (["const", "let", "new", "undefined", "null"].includes(word)) return `\x1B[36m${word}\x1B[0m`;
  if (["return", "import", "from", "async", "as"].includes(word)) return `\x1B[35m${word}\x1B[0m`;

  const replaceBrackets = (word: string) => word.replaceAll(/[{}[\]()<>]+(?![\d]+[m])/g, (match) => `\x1B[36m${match}\x1B[0m`);
  const replaceNumbers = (word: string) => word.replaceAll(/[0-9]+[^A-Za-z ,;"]/g, (match) => `\x1B[33m${match}\x1B[0m`);
  const replaceHooks = (word: string) => word.replaceAll(/use[A-Z][a-z]+/g, (match) => `\x1B[34m${match}\x1B[0m`);

  return replaceHooks(replaceBrackets(replaceNumbers(word)));
};

const Terminal = ({ code, className }: { code?: string; className?: string }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<XtermTerminal | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const splittedCode = code?.split("\n") || DefaultCode.split("\n");
  const [colNumber, setColNumber] = useState(0);

  useEffect(() => {
    if (!terminalRef.current || !containerRef.current) return;

    const newTerminal = new XtermTerminal({ cols: colNumber });
    newTerminal.open(terminalRef.current);
    setTerminal(newTerminal);

    return () => {
      newTerminal.dispose();
    };
  }, [colNumber]);

  useEffect(() => {
    if (!containerRef.current) return;

    setColNumber(Math.floor(containerRef.current.clientWidth / 8.6) - 4);
  }, [containerRef.current?.clientWidth]);

  const [index, setIndex] = useState(0);
  const [line, setLine] = useState(0);
  useEffect(() => {
    if (!terminal) return;

    const interval = setInterval(() => {
      const currentLine = splittedCode[line];
      if (currentLine === undefined) return console.log("no line");

      const currentWord = currentLine?.split(" ")?.[index];
      if (currentWord === undefined) {
        setLine((line) => line + 1);
        setIndex(0);
        terminal.writeln("");
        return;
      }

      terminal.write(parseWord(currentWord) + " ");
      setIndex((index) => index + 1);
    }, Math.random() * 200);

    return () => {
      clearInterval(interval);
    };
  }, [code, index, line, splittedCode, terminal]);

  return (
    <div ref={containerRef} className={"relative z-10 overflow-hidden rounded-lg border border-main-border bg-main-medium " + className}>
      <div className="bg-main-border p-2"></div>
      <div ref={terminalRef} className="max-h-96 bg-main-medium px-4 pb-8" />;
    </div>
  );
};

export default Terminal;

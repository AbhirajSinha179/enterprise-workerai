"use client";

import React from "react";

import { createContext, useState } from 'react';
import { Mail, mails } from '@/components/inbox/data';

type Config = {
  selected: Mail['id'] | null;
};

const initialConfig: Config = {
  selected: mails[0]?.id ?? null,
};

export const MailContext = createContext<{
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
}>({
  config: initialConfig,
  setConfig: () => {},
});

export const MailProvider = ({ children }: React.PropsWithChildren) => {
  const [config, setConfig] = useState<Config>(initialConfig)

  return <MailContext.Provider value={{ config, setConfig }}>{children}</MailContext.Provider>
}

export const useMail = () => {
  const context = React.useContext(MailContext);
  if (context === undefined) {
    throw new Error("useMail must be used within a MailProvider");
  }
  return context;
}
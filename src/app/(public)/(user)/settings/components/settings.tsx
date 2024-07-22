"use client";
import React, { useState } from "react";
import Security from "./security";

function Settings() {
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  const links = [{ id: 0, label: "Security", page: <Security /> }];

  return (
    <div className="w-full min-h-[calc(100vh_-_theme(spacing.16))] py-8">
      <div className="grid w-full gap-2">
        <h3>Settings</h3>
      </div>
      <br />
      <div className="grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="flex flex-col items-start gap-4 text-neutral-500">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => setActiveLinkIndex(link.id)}
              className={
                activeLinkIndex === link.id ? "font-semibold text-primary" : ""
              }
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="grid gap-6">{links[activeLinkIndex].page}</div>
      </div>
    </div>
  );
}

export default Settings;
